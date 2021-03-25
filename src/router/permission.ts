import router from './'
import store from '@/store/index'
import getPageTitle from '@/utils/page'

router.beforeEach(async (to, from, next) => {
  const token = store.getters['user/token']
  // 在白名单中的判断情况
  document.title = getPageTitle(to.meta.title as string)
  next()
})
