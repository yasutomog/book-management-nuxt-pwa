import Cookies from 'universal-cookie'

export default ({ app, req, route, redirect}) => {

  if (process.browser) {

    if (['/'].includes(route.path)) {
      return
    }

    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
    const loginId = cookies.get('login_id')

    if (loginId) {

      return app.$axios.$get('/api/auth', {
        params: {
          loginId: loginId
        }
      }).then((res) => {
        const loginInfo = res.loginInfo
        app.store.dispatch('setLoginUserInfo', loginInfo)
      })

    } else {

      return redirect('/')

    }

  }

}
