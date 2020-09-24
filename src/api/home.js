import http from '@/api/config'

export function getHomeData() {
  return http({
    url: '/home/getData',
    method: 'get'
  })
}
