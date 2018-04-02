<template>
    <div>
        <Card>
            <div style="margin:10px 5px;">
                <Input v-model="searchConName" placeholder="请输入图书名称搜索..." style="width: 200px"/>
                <span @click="handleSearch" style="margin: 0 10px;">
                    <Button type="primary" icon="search">搜索</Button>
                </span>
            </div>
            <i-table :columns="columns" :data="data" :loading="loading" border stripe></i-table>
            <div style="margin: 10px;overflow: hidden">
                <Page :total="totalCount" :page-size="pageSize" :current.sync="pageIndex"
                      @on-change="changePage"></Page>
            </div>
        </Card>
        <add-book :bookIds="bookIds" @on-refresh="fetchTableData"></add-book>
    </div>
</template>
<script>
    import {Account, Book, Op, PurchasedBooks} from '../../model/bookstore'
    import AddBook from "./AddBook"

    export default {
        components: {AddBook},
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
                pageSize: 5,
                totalCount: 0,
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '图书名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: 'isbn',
                        width: 200,
                        key: 'isbn',
                        align: 'center'
                    },
                    {
                        title: '资源格式',
                        width: 100,
                        key: 'textbook',
                        align: 'center',
                        render: (h, {row: {textbook}}) => {
                            let text
                            switch (textbook) {
                                case '1': {
                                    text = 'PDF'
                                    break
                                }
                                case '2': {
                                    text = '疾病课件'
                                    break
                                }
                                case '3': {
                                    text = '通关包'
                                    break
                                }
                                default: {
                                    text = '教材'
                                }
                            }
                            return h('div', text)
                        }
                    },
                    {
                        title: '教材类型',
                        width: 100,
                        key: 'textbook_type',
                        render: (h, {row: {textbook_type}}) => {
                            let text
                            switch (textbook_type) {
                                case '1': {
                                    text = '病例分析'
                                    break
                                }
                                case '2': {
                                    text = '手术'
                                    break
                                }
                                case '3': {
                                    text = '杂志'
                                    break
                                }
                                case '4': {
                                    text = '通关包'
                                    break
                                }
                                case '5': {
                                    text = '试题'
                                    break
                                }
                                default: {
                                    text = '普通教材'
                                }
                            }
                            return h('div', text)
                        }
                    },
                    {
                        title: '价格',
                        width: 100,
                        key: 'price',
                    },
                    {
                        title: '操作',
                        width: 100,
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                data: [],
                bookIds: [],
            }
        },
        computed: {
            pageCount() {
                return Math.floor(this.totalCount / this.pageSize) + 1
            }
        },
        methods: {
            fetchTableData() {
                this.loading = true
                let {userId: id, caId, cellphone,} = this.$route.params

                Account.findOrCreate({
                    where: {
                        id,
                    },
                    defaults: {
                        id,
                        cellphone,
                        name: '新增用户',
                        ca_id: caId,
                        is_del: '0',
                    }
                }).then(([instance, created]) => {
                    let {id} = instance.dataValues

                    if (created) {//如果是新建用户，则不用继续查询已获得图书
                        this.loading = false
                        return
                    }

                    PurchasedBooks.findAll({
                        where: {
                            account_id: id,
                            is_del: '0',
                        },
                        attributes: ['id', 'book_id',],
                    }).then(purchasedBooks => {
                        let bookIdMap = new Map()

                        this.bookIds.splice(0, this.bookIds.length)
                        purchasedBooks.forEach(({dataValues: {id, book_id}}) => {
                            if (!bookIdMap.has(book_id)) {
                                bookIdMap.set(book_id, [])
                            }
                            bookIdMap.get(book_id).push(id)
                            this.bookIds.push(book_id)
                        })

                        Book.findAndCountAll({
                            where: {
                                is_del: '0',
                                book_set: '1',
                                textbook: {
                                    [Op.not]: '3',
                                },
                                textbook_type: {
                                    [Op.in]: ['0', '1', '2', '3'],
                                },
                                name: {
                                    [Op.like]: `%${this.searchConName}%`
                                },
                                id: {
                                    [Op.in]: this.bookIds,
                                }
                            },
                            offset: (this.pageIndex - 1) * this.pageSize,
                            limit: this.pageSize,
                            attributes: ['id', 'book_set', 'isbn', 'name', 'textbook', 'textbook_type', 'price'],
                            order: [['create_date', 'DESC']],
                        }).then(({count, rows}) => {
                            this.totalCount = count
                            this.data.splice(0, this.data.length)

                            rows.forEach(({dataValues}) => {
                                this.data.push({...dataValues, bid: bookIdMap.get(dataValues.id)});
                            })
                            this.loading = false
                        })
                    });

                })
            },
            changePage() {
                this.fetchTableData()
            },
            handleSearch() {
                this.fetchTableData()
            },
            remove(index) {
                PurchasedBooks.update({is_del: '1'}, {
                    where: {
                        id: {
                            [Op.in]: this.data[index].bid
                        }
                    }
                }).then(() => {
                    this.$Message.success('账号已成功删除');
                    this.fetchTableData()
                })
            }
        }
    }
</script>
<style scoped lang="less">
</style>
