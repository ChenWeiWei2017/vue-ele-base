// 存入主页api数据
const Mock = require('mockjs')

module.exports = [
  {
    url: '/home/getData',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          videoData: [
            {
              name: 'SpringBoot',
              value: Mock.Random.float(1000, 10000, 0, 2)
            },
            {
              name: 'Vue',
              value: Mock.Random.float(1000, 10000, 0, 2)
            },
            {
              name: 'Nodejs',
              value: Mock.Random.float(1000, 10000, 0, 2)
            },
            {
              name: '小程序',
              value: Mock.Random.float(1000, 10000, 0, 2)
            },
            {
              name: 'Java',
              value: Mock.Random.float(1000, 10000, 0, 2)
            },
            {
              name: 'Python',
              value: Mock.Random.float(1000, 10000, 0, 2)
            }
          ]
        }
      }
    }
  }
]

