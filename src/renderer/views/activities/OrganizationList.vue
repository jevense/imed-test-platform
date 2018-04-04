<template>
    <div>
        <Card>
            <Row>
                <Input v-model="searchConName" placeholder="请输入组织名称搜索..." style="width: 200px"/>
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
    import {Institute, Op} from '../../model/cadb'

    export default {
        name: 'organization-list',
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
                        title: '组织名称',
                        key: 'name',
                        // align: 'center'
                    },
                    {
                        title: '省',
                        key: 'province',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '市',
                        key: 'city',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '区',
                        key: 'district',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '机构类型',
                        key: 'instituteType',
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: '详情',
                        align: 'center',
                        width: 150,
                        render: (h, {row: {instituteNumber}}) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'activities-times',
                                            params: {instituteNumber,}
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
                Institute.findAndCountAll({
                    where: {
                        deleted: {
                            [Op.or]: {
                                [Op.is]: null,
                                [Op.eq]: '0',
                            }
                        },
                        provinceCode: {
                            [Op.not]: null,
                        },
                        name: {
                            [Op.like]: `%${this.searchConName}%`
                        }
                    },
                    offset: (this.pageIndex - 1) * this.pageSize,
                    limit: this.pageSize,
                    attributes: [['caId', 'id'], 'name', 'instituteNumber',],
                    include: ['province', 'city', 'district', 'instituteType'],
                    order: ['provinceCode'],
                }).then(({count, rows}) => {
                    this.totalCount = count
                    this.data.splice(0, this.data.length)

                    rows.forEach(({dataValues}) => {
                        let {
                            instituteNumber,
                            name,
                            province: {dataValues: {name: province = ''}},
                            city: {dataValues: {name: city = ''}},
                            district: {dataValues: {name: district = ''}},
                            instituteType: {dataValues: {name: instituteType = ''}},
                        } = {...dataValues}

                        this.data.push({
                            instituteNumber,
                            name,
                            province,
                            city,
                            district,
                            instituteType,
                        });
                    })
                    this.loading = false
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
