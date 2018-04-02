// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import Redis from '@/model/redis'

// 这里是一些 Jasmine 2.0 的测试，你也可以使用你喜欢的任何断言库或测试工具。

describe('MyComponent', () => {
    // 检查原始组件选项
    it('has a created hook', () => {
        expect(typeof Redis.created).toBe('function')
    })

    // 评估原始组件选项中的函数的结果
    it('sets the correct default data', () => {
        expect(typeof Redis.data).toBe('function')
        const defaultData = Redis.data()
        expect(defaultData.message).toBe('hello!')
    })

    // 检查 mount 中的组件实例
    it('correctly sets the message when created', () => {
        const vm = new Vue(Redis).$mount()
        expect(vm.message).toBe('bye!')
    })

    // 创建一个实例并检查渲染输出
    it('renders the correct message', () => {
        const Constructor = Vue.extend(Redis)
        const vm = new Constructor().$mount()
        expect(vm.$el.textContent).toBe('bye!')
    })
})
