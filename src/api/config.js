import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 请求超时时间
  timeout: 3000
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 请求成功的回调，可以对请求的信息进行修改
    // 一般会在这儿加入token的信息
    return config
  },
  error => {
    // 请求失败的回调
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 响应成功回调，返回响应信息
    // 一般在这里对后端返回的数据做一个统一的处理
    const res = response.data

    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
