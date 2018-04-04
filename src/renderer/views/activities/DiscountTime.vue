<template>
    <div>
        <i-table :columns="columns" :data="data" stripe></i-table>
        <Form ref="formDynamic" :model="formDynamic" :label-width="100">
            <Card
                    v-for="(item,index) in formDynamic.items"
                    v-if="item.status"
                    :key="item.id"
            >
                <Row>
                    <i-col span="4">
                        <div v-text="`优惠${index+1}`" style="margin: 10px;"></div>
                    </i-col>
                    <i-col span="16">
                        <FormItem label="生效时间段："
                                  :prop="`items.${index}.timePeriod`"
                                  :rules="customRule"
                        >
                            <DatePicker type="daterange"
                                        v-model="item.timePeriod"
                                        split-panels
                                        placeholder="请选择时间段"
                                        style="width: 200px"
                            >
                            </DatePicker>
                        </FormItem>
                        <FormItem label="通关包类型："
                                  :prop="`items.${index}.isbn`"
                                  :rules="{required: true, type: 'array', min: 1, message: '通关包不能为空', trigger: 'change'}"
                        >
                            <Select
                                    :label="initLabel"
                                    multiple
                                    v-model="item.isbn"
                                    remote
                                    placeholder="请选择通关包"
                                    :remote-method="remoteMethod"
                                    :loading="loading"
                                    style="width: 200px"
                            >
                                <OptionGroup label="全选">
                                    <Option value="@all-exam" label="所有通关包"></Option>
                                </OptionGroup>
                                <OptionGroup label="学科" v-if="options.length > 0">
                                    <Option v-for="option in options"
                                            :value="option.value"
                                            :label="option.label"
                                            :key="option.value"
                                    >
                                    </Option>
                                </OptionGroup>
                            </Select>
                        </FormItem>
                        <FormItem label="折扣：">
                            <InputNumber v-model="item.discount" :max="10" :min="1" :step="0.5"></InputNumber>
                        </FormItem>
                    </i-col>
                    <i-col span="4">
                        <Button type="ghost" @click="handleRemove(index)" style="margin: 10px;">Delete</Button>
                    </i-col>
                </Row>
            </Card>
            <FormItem>
                <Row>
                    <i-col span="4" offset="8">
                        <Button type="dashed" long @click="handleAdd" icon="plus-round" style="margin: 10px;">
                            添加优惠
                        </Button>
                    </i-col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formDynamic')">添加</Button>
                <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import {Book, DiscountBookMap, DiscountTime, Op} from '../../model/bookstore'
    import UUID from 'uuid'
    import Vue from 'vue'
    // import moment from 'moment'

    export default {
        name: 'discount-time',
        created() {
            this.$Message.config({top: 200});
            this.fetchTableData()
            this.remoteMethod('')
        },
        data() {
            const validateDatePeriod = (rule, value, callback) => {
                if (!value instanceof Array || value.length !== 2) {
                    callback(new Error('时间段格式正确'))
                } else if (!value[0] || !value[0]) {
                    callback(new Error('时间段不能为空'))
                } else {
                    callback()
                }
            };
            return {
                initLabel: [],
                formDynamic: {
                    items: [
                        {
                            timePeriod: ['', ''],
                            isbn: [],
                            discount: 10,
                            status: 1,
                            enable: true,
                            id: UUID.v1().replace(/-/g, ''),
                        }
                    ]
                },
                loading: false,
                isbnMap: {empty: true},
                options: [],
                customRule: {
                    required: true,
                    validator: validateDatePeriod,
                    message: '时间段不能为空',
                    trigger: 'blur'
                },
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '生效时间',
                        align: 'center',
                        render: (h, {row: {startDate, endDate}}) => {
                            return h('div', `${new Date(startDate).toLocaleDateString()}    -   ${new Date(endDate).toLocaleDateString()}`)
                        }
                    },
                    {
                        title: '通过包类型',
                        align: 'center',
                        render: (h, {row: {isbns}}) => {
                            return h('div', isbns.map(item => {
                                if (item === '@all-exam') return '全部通过包'
                                return this.isbnMap[item]
                            }).join('/'))
                        }
                    },
                    {
                        title: '折扣',
                        align: 'center',
                        width: 60,
                        key: 'discount',
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, {row: {id, enable}}) => {
                            let modify = h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modify(id)
                                    }
                                }
                            }, '修改')
                            return h('div', [
                                modify,
                                h('Button', {
                                    props: {
                                        type: enable ? 'error' : 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toggleState(id, !enable)
                                        }
                                    }
                                }, enable ? '禁用' : '启用')
                            ]);
                        }
                    }
                ],
                mode: 'create',
                data: [],
                instituteNumber: this.$route.params['instituteNumber']
            }
        },
        methods: {
            fetchTableData() {
                this.loading = true
                DiscountTime.findAll({
                    where: {
                        organization: `${this.instituteNumber}`,
                    },
                    attributes: ['id', 'enable', ['start_date', 'startDate'], ['end_date', 'endDate'], 'organization',],
                    include: ['discountBookMap'],
                    order: ['end_date'],
                }).then(rows => {
                    this.data.splice(0, this.data.length)
                    rows.forEach(({dataValues}) => {
                        let {
                            id,
                            enable,
                            startDate,
                            endDate,
                            discountBookMap,
                        } = dataValues

                        let isbns = discountBookMap.map(item => item.isbn)
                        let {discount = 0} = {discount: discountBookMap.map(item => item.discount)[0]}
                        this.data.push({
                            id,
                            enable,
                            startDate,
                            endDate,
                            isbns,
                            discount,
                        });
                    })
                    this.loading = false
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (!valid) {
                        this.$Message.error('Fail!');
                        return false
                    }
                    let discountBookMap = new Map()
                    let discountTimeList = this.formDynamic.items.filter(item => item.status).map(item => {
                        let {
                            id,
                            timePeriod,
                            discount,
                            enable,
                            isbn,
                            status,
                        } = item

                        let [start, end] = timePeriod

                        let isbnMap = isbn.map(item => {
                            return {
                                bs_fk_discount_time: id,
                                discount,
                                isbn: item,
                            }
                        })

                        discountBookMap.set(id, isbnMap)

                        return {
                            id,
                            discount,
                            enable,
                            organization: this.instituteNumber,
                            start_date: new Date(start),
                            end_date: new Date(end),
                            update_time: Date.now(),
                        }
                    })

                    discountTimeList.forEach(item => {
                        DiscountTime.upsert(item).then(created => {
                            DiscountTime.findById(item.id).then(discountTime => {
                                DiscountBookMap.destroy({
                                    where: {
                                        bs_fk_discount_time: discountTime.id
                                    },
                                }).then(() => {
                                    let discountBook = discountBookMap.get(discountTime.id)
                                    discountBook.forEach(ite => {
                                        return DiscountBookMap.upsert(ite).then(created => {
                                            return DiscountBookMap.findOne({
                                                where: {
                                                    bs_fk_discount_time: discountTime.bs_fk_discount_time,
                                                    isbn: discountTime.isbn,
                                                }
                                            }).then(discountBookMap => {
                                                return discountTime.addDiscountBookMap(discountBookMap)
                                            }).then(() => {
                                                this.fetchTableData()
                                                this.formDynamic.items.splice(0, this.formDynamic.items.length)
                                                this.formDynamic.items.push(this.getInitForm())
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleAdd() {
                this.formDynamic.items.push(this.getInitForm());
            },
            handleRemove(index) {
                this.formDynamic.items[index].status = 0;
            },
            remoteMethod(query) {
                this.options.splice(0, this.options.length)
                Book.findAll({
                    where: {
                        is_del: '0',
                        book_set: '0',
                        textbook: '3',
                        name: {
                            [Op.like]: `%${query}%`
                        },
                    },
                    attributes: ['id', ['isbn', 'value'], ['short_name', 'label'],],
                    order: [['create_date', 'DESC']],
                }).then(rows => {
                    this.loading = false
                    rows.forEach(({dataValues}) => {
                        let {value, label} = dataValues
                        if (this.isbnMap['empty']) {
                            Vue.set(this.isbnMap, value, label)
                        }
                        this.options.push({...dataValues});
                    })
                    this.isbnMap['empty'] = false
                })
            },
            toggleState(id, state,) {
                DiscountTime.update({enable: state}, {where: {id,}}).then(() => {
                    this.fetchTableData()
                })
            },
            modify(id) {
                this.loading = true
                let target = this.formDynamic.items
                target.splice(0, target.length)
                DiscountTime.findOne({
                    where: {id,},
                    attributes: ['id', 'enable', ['start_date', 'startDate'], ['end_date', 'endDate'], 'organization',],
                    include: ['discountBookMap'],
                }).then(({dataValues}) => {

                    let {
                        id,
                        enable,
                        startDate,
                        endDate,
                        discountBookMap,
                    } = dataValues

                    let {isbn = []} = {isbn: discountBookMap.map(item => item.isbn)}
                    let {discount = 0} = {discount: discountBookMap.map(item => parseInt(item.discount))[0]}

                    this.initLabel = isbn.map(item => {
                        if (item === '@all-exam') return '全部通过包'
                        return this.isbnMap[item]
                    })
                    target.push({
                        id,
                        enable,
                        isbn,
                        discount,
                        status: 1,
                        timePeriod: [startDate.toLocaleDateString(), endDate.toLocaleDateString()],
                    });
                    this.loading = false
                });

            },
            getInitForm() {
                return {
                    id: UUID.v1().replace(/-/g, ''),
                    enable: true,
                    isbn: [],
                    timePeriod: ['', ''],
                    discount: 10,
                    status: 1,
                }
            }
        }
    }
</script>
