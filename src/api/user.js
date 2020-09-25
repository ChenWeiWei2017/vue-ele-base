import http from '@/api/config'

export function getUserList(pagenum, pagesize) {
  return http({
    url: '/api/user/list',
    method: 'get',
    params: { pagenum, pagesize }
  })
}
