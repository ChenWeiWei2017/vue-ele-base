const Mock = require('mockjs')

const home = require('./home')
const user = require('./user')

const mocks = [
  ...home,
  ...user
]

Mock.setup({
  // 模拟一个延时
  timeout: '200-2000'
})

mocks.forEach(item => Mock.mock(new RegExp(item.url), item.type || 'get', item.response))
