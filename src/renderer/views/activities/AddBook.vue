<template>
    <Row class="margin-top-10">
        <i-col span="8" class="height-100">
            <Card>
                <Row slot="title" type="flex" justify="space-between" align="middle">
                    <span>
                        <Icon type="clipboard"></Icon>
                        添加图书列表（拖拽）
                    </span>
                    <Button type="primary" @click="upload">上传图书</Button>
                </Row>
                <Row style="height: 470px;">
                    <ul id="affordList" class="iview-admin-draggable-list">
                        <li v-for="(item, index) in affordList" :key="index" v-text="item.name"></li>
                    </ul>
                </Row>
            </Card>
        </i-col>
        <i-col span="16" class="padding-left-10">
            <Card>
                <div style="margin:10px;">
                    <Input v-model="searchConName" placeholder="请输入图书名称搜索..." style="width: 200px"/>
                    <span @click="handleSearch" style="margin: 0 10px;">
                        <Button type="primary" icon="search">搜索</Button>
                    </span>
                </div>

                <Table ref="draggable"
                       :columns="columns"
                       :data="data"
                       :loading="loading"
                       highlight-row
                       border
                >
                </Table>

                <div style="margin: 10px;overflow: hidden">
                    <Page :total="totalCount" :page-size="pageSize" :current.sync="pageIndex"
                          @on-change="changePage"></Page>
                </div>
            </Card>
        </i-col>
    </Row>
</template>
<script>
    import {Book, Op, PurchasedBooks} from '../../model/bookstore'
    import Sortable from 'sortablejs'
    import UUID from 'uuid'

    export default {
        name: 'add-book',
        props: ['bookIds'],
        created() {
            this.$Message.config({top: 200});
            this.fetchTableData()
        },
        mounted() {
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
            let el = this.$refs.draggable.$children[1].$el.children[1];
            Sortable.create(el, {
                sort: false,
                onEnd: (event) => {
                    let {id, name} = this.data[event.oldIndex]
                    let {ids = []} = {ids: this.affordList.map(afford => afford.id)}
                    if (!ids.includes(id)) this.affordList.push({id, name,})
                }
            });

            let affordList = document.getElementById('affordList');
            Sortable.create(affordList, {
                animation: 120,
                sort: false,
                onEnd: (event) => {
                    this.affordList.splice(event.oldIndex, 1);
                }
            });
        },
        data() {
            return {
                loading: true,
                searchConName: '',
                pageIndex: 1,
                pageSize: 8,
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
                        key: 'isbn',
                    },
                ],
                data: [],
                affordList: [],
            }
        },
        computed: {
            pageCount() {
                return Math.floor(this.totalCount / this.pageSize) + 1
            },
        },
        watch: {
            bookIds() {
                this.fetchTableData()
            },
        },//以V-model绑定数据时使用的数据变化监测
        methods: {
            fetchTableData() {
                this.loading = true
                Book.findAndCountAll({
                    where: {
                        is_del: '0',
                        // book_set: '1',
                        // textbook: {
                        //     [Op.not]: '3',
                        // },
                        // textbook_type: {
                        //     [Op.in]: ['0', '1', '2', '3'],
                        // },
                        // name: {
                        //     [Op.like]: `%${this.searchConName}%`,
                        // },
                        // id: {
                        //     [Op.notIn]: this.bookIds,
                        // }
                    },
                    offset: (this.pageIndex - 1) * this.pageSize,
                    limit: this.pageSize,
                    attributes: ['id', 'isbn', 'name',],
                    order: [['create_date', 'DESC']],
                }).then(({count, rows}) => {
                    this.totalCount = count
                    this.data.splice(0, this.data.length)
                    rows.forEach(({dataValues}) => {
                        this.data.push(dataValues)
                    })
                    this.loading = false
                })
            },
            changePage() {
                this.fetchTableData()
            },
            handleSearch() {
                this.fetchTableData()
            },
            upload() {
                let {userId: id} = this.$route.params

                let bookList = this.affordList.map(afford => {
                    return {
                        id: UUID.v1().replace(/-/g, ''),
                        create_date: Date.now(),
                        is_del: 0,
                        type: 1,
                        account_id: id,
                        book_id: afford.id
                    }
                })


                PurchasedBooks.bulkCreate(bookList).then(models => {
                    if (bookList.length === models.length) {
                        this.$Message.success('图书添加成功')
                        this.affordList.splice(0, this.affordList.length)
                    } else {//图书没有完全添加成功
                        this.$Message.success('图书部分添加成功')
                        let addedBookIds = models.map(dataValues => dataValues['book_id'])
                        for (let afford of this.affordList.entries()) {
                            if (addedBookIds.includes(afford[1])['id']) {
                                this.affordList.splice(afford[0], 1)
                            }
                        }
                    }
                    this.$emit('on-refresh');
                })
            },
        }
    }
</script>
<style scoped lang="less">
    @import '../../components/common.less';
    @import '../../components/draggable-list.less';

</style>
