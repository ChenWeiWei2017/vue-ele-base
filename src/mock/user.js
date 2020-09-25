const Mock = require('mockjs')
const querystring = require('querystring')

module.exports = [
  {
    url: '/api/user/list',
    type: 'get',
    response: req => {
      const { pagenum, pagesize } = querystring.parse(req.url.split('?')[1])
      const total = 58
      if (pagenum < 0 || pagenum > Math.ceil(total / pagesize)) {
        return {
          code: 20000,
          message: 'success',
          data: {
            total: total,
            list: []
          }
        }
      }
      const users = []
      const usernum = Number(pagenum) === Math.ceil(total / pagesize) ? total - (pagenum - 1) * pagesize : pagesize
      for (let i = 0; i < usernum; i++) {
        users.push({
          id: Mock.Random.integer(1, 1000),
          name: Mock.Random.cname(),
          age: Mock.Random.integer(16, 60),
          sex: Mock.Random.integer(0, 1),
          birth: Mock.Random.date('yyyy-MM-dd'),
          addr: Mock.Random.city(true)
        })
      }
      return {
        code: 20000,
        message: 'success',
        data: {
          total: total,
          list: users
        }
      }
    }
  }
]
