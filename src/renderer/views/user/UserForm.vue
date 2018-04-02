<template>
    <div style='width: 50%'>
        <Form ref='formValidate' :model='formValidate' :rules='ruleValidate' :label-width='200'>
            <FormItem label='手机号' prop='cellphone'>
                <Input v-model='formValidate.cellphone' placeholder='请输入手机号'></Input>
            </FormItem>
            <FormItem label='密码' prop='password'>
                <Input v-model='formValidate.password' placeholder='请输入密码'></Input>
            </FormItem>
            <FormItem label='邮箱' prop='mail'>
                <Input v-model='formValidate.mail' placeholder='请输入邮箱'></Input>
            </FormItem>
            <FormItem label='用户姓名' prop='name'>
                <Input v-model='formValidate.name' placeholder='请输入用户姓名'></Input>
            </FormItem>
            <FormItem label='角色编码' prop='roles'>
                <Input v-model='formValidate.roles' placeholder='请输入角色编码'></Input>
            </FormItem>
            <FormItem label='机构编码' prop='instituteNumber'>
                <Input v-model='formValidate.instituteNumber' placeholder='请输入机构编码'></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import {Human} from '../../model/cadb'
    import UUID from 'uuid'
    import MD5 from 'crypto-js/md5'

    export default {
        name: 'user-form',
        data() {
            return {
                formValidate: {
                    cellphone: '',
                    password: '',
                    mail: '',
                    name: '',
                    roles: '',
                    instituteNumber: '',
                },
                ruleValidate: {
                    cellphone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {type: 'string', pattern: /\d{11}/, message: '手机号格式不正确', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        let fields = Object.entries(this.formValidate)
                            .filter(([key]) => key !== 'password')
                            .filter(([key, value]) => value)
                            .map(([key]) => key)

                        fields.push('pwd')
                        fields.push('caId')
                        fields.push('deleted')
                        fields.push('frozen')
                        fields.push('deletedByInstitute')

                        Human.create({
                            ...this.formValidate,
                            pwd: MD5(this.formValidate.password).toString(),
                            caId: UUID.v1().replace(/-/g, ''),
                            deleted: 0,
                            frozen: 0,
                            deletedByInstitute: 0,
                        }, {fields}).then(human => {
                            this.$Message.success('添加成功');
                        }).catch(error => {
                            this.$Message.error('手机号或者邮箱已存在!');
                        })

                    } else {
                        this.$Message.error('表单不符合要求!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
