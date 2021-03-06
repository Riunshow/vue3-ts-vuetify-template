import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import store from '@/store/index'

import { emitter } from '@/hooks/useEmitter'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 99999
})

let activeAxios = 0
let timer: number | undefined

const showLoading = () => {
  activeAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (activeAxios > 0) {
      emitter.emit('showLoading')
    }
  }, 400)
}

const closeLoading = () => {
  activeAxios--
  if (activeAxios <= 0) {
    clearTimeout(timer)
    emitter.emit('closeLoading')
  }
}

service.interceptors.request.use((config: AxiosRequestConfig) => {
  showLoading()

  const token = store.getters['user/token']
  const user = store.getters['user/userInfo']

  config.data = JSON.stringify(config.data)

  config.headers = {
    'Content-Type': 'application/json',
    'x-token': token,
    'x-user-id': user.ID
  }

  return config
}, (err: AxiosError) => {
  closeLoading()
  return err
})

service.interceptors.response.use((response: AxiosResponse) => {
  closeLoading()

  if (response.headers['new-token']) {
    store.commit('user/setToken', response.headers['new-token'])
  }
  if (response.data.code === 0 || response.headers.success === 'true') {
    return response.data
  } else {
    if (response.data.data && response.data.data.reload) {
      store.commit('user/LoginOut')
    }

    return response.data.msg ? response.data : response
  }
},
(err: AxiosError) => {
  closeLoading()

  return err
})

export default service
