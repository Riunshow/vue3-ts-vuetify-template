import { ResponseConfig, UserInfo } from '@/types'
import request from '@/utils/request'

const prefix = '/user'

// 用户注册
export function register (data: UserInfo): Promise<ResponseConfig<null>> {
  return request.post(prefix + '/register', data)
}
