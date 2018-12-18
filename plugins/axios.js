import Cookies from 'universal-cookie'

export default function ({ $axios, env }) {
  $axios.onRequest((config) => {
    const cookies = document.cookie ? new Cookies(document.cookie) : new Cookies()
    const loginId = cookies.get('login_id')
    config.baseURL = env.API_URL
    return config
  })
}
