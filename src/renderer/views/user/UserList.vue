<template>
    <div>
        <Card>
            <Row>
                <Input v-model="searchConName" placeholder="请输入手机号搜索..." style="width: 200px"/>
                <span @click="handleSearch" style="margin: 0 10px;">
                    <Button type="primary" icon="search">搜索</Button></span>
            </Row>
        </Card>
        <i-table :columns="columns" :data="data" :loading="loading" stripe border></i-table>
        <div style="margin: 10px;overflow: hidden">
            <Page :total="totalCount" :page-size="pageSize" :current.sync="pageIndex" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
    import {Human, Op} from '../../model/cadb'

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
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: 'CAID',
                        key: 'caId'
                    },
                    {
                        title: '机构编码',
                        key: 'instituteNumber'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.resetPwd(params.index)
                                        }
                                    }
                                }, '重置密码'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            fetchTableData() {
                this.loading = true;
                Human.findAndCountAll({
                    where: {
                        deleted: '0',
                        cellphone: {
                            [Op.like]: `%${this.searchConName}%`
                        }
                    },
                    offset: (this.pageIndex - 1) * this.pageSize,
                    limit: this.pageSize,
                    attributes: ['cellphone', 'name', 'caId', 'instituteNumber'],
                    order: [['modifiedDate', 'DESC']],
                }).then(result => {
                    this.totalCount = result.count
                    this.data.splice(0, this.data.length)
                    result.rows.forEach(human => {
                        this.data.push(human.dataValues)
                    })
                    this.loading = false;
                });
            },
            changePage() {
                this.fetchTableData()
            },
            resetPwd(index) {
                //密码重置为000000
                Human.update({pwd: '670b14728ad9902aecba32e22fa4f6bd'}, {where: {caId: this.data[index].caId}}).then(() => {
                    this.$Message.success('密码重置为000000')
                })
            },
            remove(index) {
                Human.update({deleted: '1'}, {where: {caId: this.data[index].caId}}).then(() => {
                    this.$Message.success('账号已成功删除');
                    this.fetchTableData()
                })
            },
            handleSearch() {
                this.pageIndex = 1
                this.fetchTableData()
            },
        }
    }
</script>
