import router from '@/router'
import {getToken} from '@/utils/auth'

const whiteList = ['/', '/login'] // 登陆白名单

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

// @ts-ignore
window._AMapSecurityConfig = {
  securityJsCode: '7ca1ac11ce7f112793a8fcca5747ebdc'
}
