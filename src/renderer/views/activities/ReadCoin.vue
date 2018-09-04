<template>
    <div>
        <i-table :columns="columns" :data="data" :loading="loading" stripe border></i-table>
        <div style="margin: 10px;overflow: hidden">
            <Page :total="totalCount" :page-size="pageSize" :current.sync="pageIndex" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
    import sequelize1 from '../../model/bookstore'
    import sequelize2 from '../../model/cadb'

    export default {
        name: 'read-coin',
        created() {
            this.$Message.config({top: 200});

            sequelize1.query(`SELECT
                          COUNT(rc.account_id)   AS cnt
                        FROM bs_read_coin rc`
                ,
                {
                    type: sequelize1.QueryTypes.SELECT
                }
            ).then(results => {
                this.totalCount = results[0].cnt
            })

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
                        title: '单位',
                        key: 'insname'
                    },
                    {
                        title: '已邀请',
                        key: 'cnt'
                    }, {
                        title: '已获得',
                        key: 'amount'
                    },
                ],
                data: []
            }
        },
        methods: {
            fetchTableData() {
                this.loading = true;
                sequelize1.query(`SELECT
                          ac.ca_id             AS caId,
                          COUNT(rr.account_id) AS cnt,
                          rc.amount            AS amount
                        FROM bs_read_coin rc
                          LEFT JOIN bs_account ac ON rc.account_id = convert(ac.id USING utf8)
                          LEFT JOIN bs_recommend_record rr ON rc.recommend_code = rr.recommend_code
                        GROUP BY rc.recommend_code
                        LIMIT ${(this.pageIndex - 1) * this.pageSize},${this.pageSize}`
                    ,
                    {
                        type: sequelize1.QueryTypes.SELECT
                    }
                ).then(results => {
                    this.data.splice(0, this.data.length)
                    let amountMap = new Map()
                    let caids = []
                    for (let item of results) {
                        amountMap.set(item.caId, item)
                        caids.push(item.caId)
                    }

                    sequelize2.query(`SELECT
                              hu.cellphone AS cellphone,
                              hu.name      AS name,
                              hu.caid      AS caId,
                              ins.name     AS insname
                            FROM ca_t_human hu LEFT JOIN ca_t_institute ins
                                ON hu.institutenumber = ins.institutenumber
                            WHERE hu.deleted = '0' AND hu.caid IN (:caids)`
                        ,
                        {
                            replacements: {caids,},
                            type: sequelize2.QueryTypes.SELECT
                        }
                    ).then(result => {
                            result.forEach(human => {
                                let caId = human.caId
                                this.data.push({...human, ...amountMap.get(caId)})
                            })
                            return result
                        }
                    )
                    return results
                }).finally(() => {
                    this.loading = false;
                })
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
