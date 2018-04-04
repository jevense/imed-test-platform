<template>
    <div>
        <Card>
            <Row>
                <Input v-model="searchConName" placeholder="请输入手机号搜索..." style="width: 200px"/>
                <span @click="handleSearch" style="margin: 0 10px;">
                    <Button type="primary" icon="search">搜索</Button>
                </span>
            </Row>
        </Card>
        <i-table :columns="columns" :data="data" :loading="loading" stripe></i-table>
        <div style="margin: 10px;overflow: hidden">
            <Page :total="totalCount" :page-size="pageSize" :current.sync="pageIndex" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
    import {Human, Op} from '../../model/cadb'
    import sequelize, {Account, PurchasedBooks,} from '../../model/bookstore'
    import UUID from 'uuid'

    export default {
        name: 'user-list',
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
                        title: '拥有图书',
                        key: 'count',
                    },
                    {
                        title: '详情',
                        align: 'center',
                        render: (h, {row: {id, caId, cellphone}}) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'user-books',
                                            params: {userId: id, caId, cellphone}
                                        });
                                    }
                                }
                            }, '了解详情');
                        }
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
                        attributes: ['id', 'ca_id',],
                    }).then(accounts => {

                        let accountMap = new Map()
                        let accountIdList = []
                        accounts.forEach(account => {
                            accountMap.set(account.dataValues.ca_id, account.dataValues)
                            accountIdList.push(account.dataValues.id)
                        })

                        PurchasedBooks.findAll({
                            where: {
                                is_del: '0',
                                account_id: {
                                    [Op.in]: accountIdList,
                                }
                            },
                            group: 'account_id',
                            attributes: ['account_id', [sequelize.fn('COUNT', sequelize.col('account_id')), 'count']],
                        }).then(purchasedBooks => {

                            let purchasedBooksMap = new Map()
                            purchasedBooks.forEach(purchasedBook => {
                                purchasedBooksMap.set(purchasedBook.dataValues.account_id, purchasedBook.dataValues)
                            })

                            rows.forEach(({dataValues}) => {
                                let {caId, cellphone} = {...dataValues}
                                let {id = UUID.v1().replace(/-/g, '')} = {...accountMap.get(caId)}
                                let {count: count = 0} = {...purchasedBooksMap.get(id)}

                                this.data.push({
                                    cellphone,
                                    count,
                                    caId,
                                    id,
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
        }
    }
</script>
