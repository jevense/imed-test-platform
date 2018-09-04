<template>
    <div>
        <Card>
            <Row>
                <Input v-model="searchConName" placeholder="请输入手机号搜索..." style="width: 200px"/>
                <span @click="handleSearch" style="margin: 0 10px;">
                    <Button type="primary" icon="search">搜索</Button></span>
            </Row>
        </Card>
        <!--<i-table :columns="columns" :data="data" stripe border></i-table>-->
        <can-edit-table
                v-model="data"
                :loading="loading"
                :columns-list="columns"
                :editIncell="true"
                :hover-show="true"
                @on-cell-change="handleCellChange"
        >
        </can-edit-table>
        <div style="margin: 10px;overflow: hidden">
            <Page :total="totalCount" :page-size="pageSize" :current.sync="pageIndex" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {Human, Op, Promise} from '../../model/cadb'
    import {Account, Amount, BonusAmount} from '../../model/bookstore'
    import CanEditTable from '../../components/CanEditTable.vue'
    import UUID from 'uuid'

    export default {
        name: 'user-list',
        components: {
            CanEditTable
        },
        created() {
            this.$Message.config({top: 200});
            this.fetchTableData()
        },
        data() {
            return {
                loading: true,
                self: this,
                searchConName: '',
                pageIndex: 1,
                pageSize: 10,
                totalCount: 0,
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '手机号',
                        key: 'cellphone',
                    },
                    {
                        title: '用户ID',
                        key: 'id'
                    },
                    {
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: 'IOS阅点',
                        key: 'point',
                        editable: true,
                    },
                    {
                        title: '通用阅点',
                        key: 'commonPoint',
                        editable: true,
                    },
                    {
                        title: '赠送阅读点数',
                        key: 'present',
                        editable: true,
                    }
                ],
                data: []
            }
        },
        methods: {
            fetchTableData() {
                this.loading = true
                Human.findAndCountAll({
                    where: {
                        deleted: '0',
                        cellphone: {
                            [Op.like]: `%${this.searchConName}%`
                        }
                    },
                    offset: (this.pageIndex - 1) * this.pageSize,
                    limit: this.pageSize,
                    attributes: ['cellphone', 'caId',],
                    order: [['modifiedDate', 'DESC']],
                }).then(({count, rows}) => {
                    this.totalCount = count
                    this.data.splice(0, this.data.length)

                    let caIds = rows.map(model => model.dataValues.caId)
                    Account.findAll({
                        where: {
                            is_del: '0',
                            ca_id: {
                                [Op.in]: caIds,
                            }
                        },
                        attributes: ['id', 'ca_id', 'name',],
                    }).then(accounts => {
                        let accountMap = new Map()
                        let accountIdList = []
                        accounts.forEach(account => {
                            accountMap.set(account.dataValues.ca_id, account.dataValues)
                            accountIdList.push(account.dataValues.id)
                        })

                        let amountPromise = Amount.findAll({
                            where: {
                                is_del: '0',
                                account_id: {
                                    [Op.in]: accountIdList,
                                }
                            },
                            attributes: ['id', 'account_id', 'point', 'common_point'],
                        });

                        let boundAmountPromise = BonusAmount.findAll({
                            where: {
                                is_del: '0',
                                status: '0',
                                account_id: {
                                    [Op.in]: accountIdList,
                                }
                            },
                            attributes: ['id', 'account_id', 'point',],
                        })

                        Promise.all([amountPromise, boundAmountPromise]).then(([amounts, boundAmounts]) => {

                            let amountMap = new Map()
                            amounts.forEach(({dataValues}) => {
                                amountMap.set(dataValues.account_id, dataValues)
                            })

                            let amountBoundMap = new Map()
                            boundAmounts.forEach(({dataValues}) => {
                                amountBoundMap.set(dataValues.account_id, dataValues)
                            })

                            rows.forEach(({dataValues}) => {
                                let {caId, cellphone} = {...dataValues}//{caId:'sadfsdfas',cellphone:'1511333',dddd:'sddd'}
                                let {id, name} = {...accountMap.get(caId)}
                                let {id: amountId, point = 0, common_point: commonPoint = 0} = {...amountMap.get(id)}
                                let {id: amountBoundId, point: present = 0} = {...amountBoundMap.get(id)}
                                this.data.push({
                                    cellphone,
                                    id,
                                    name,
                                    point,
                                    commonPoint,
                                    present,
                                    amountId,
                                    amountBoundId,
                                    caId,
                                });
                            })

                            this.loading = false
                        });
                    })
                });
            },
            changePage() {
                this.fetchTableData()
            },
            handleSearch() {
                this.pageIndex = 1
                this.fetchTableData()
            },
            handleCellChange(val, index, key) {
                this.loading = true
                let {
                    id = UUID.v1().replace(/-/g, ''),
                    caId,
                    commonPoint,
                    point,
                    present,
                    amountId = UUID.v1().replace(/-/g, ''),
                    amountBoundId = UUID.v1().replace(/-/g, ''),
                } = this.data[index]

                Account.findOrCreate({
                    where: {
                        id,
                    },
                    defaults: {
                        id,
                        ca_id: caId,
                        is_del: '0',
                    }
                }).then(([instance, created]) => {
                    let {id, ca_id} = instance.dataValues
                    if (created) {
                        Vue.set(this.data[index], 'id', id);
                    }

                    console.log(this.data[index].id)

                    if (key === 'present') {
                        BonusAmount.upsert({
                            id: amountBoundId,
                            point: present,
                            is_del: '0',
                            account_id: id,
                            platform: '0',
                            type: '11',
                            status: '0',
                        }).then(created => {
                            this.$Message.success('阅点修改成功')
                            return created
                        })
                    } else {
                        Amount.upsert({
                            id: amountId,
                            common_point: commonPoint,
                            point: point,
                            is_del: '0',
                            account_id: id,
                        }).then(created => {
                            this.$Message.success('阅点修改成功')
                            return created
                        })
                    }
                    return [instance, created]
                }).finally(() => {
                    this.loading = false
                })
            },
        }
    }
</script>
