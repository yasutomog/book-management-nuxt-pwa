<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        book-management-nuxt-pwa
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <router-link to="/user">Go to User</router-link>
      <a href="http://localhost:9090/" target="_blank">Go to Sign in G Suite</a>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  mounted() {

    const cookie = document.cookie.split(';'),
      loginIdRow = cookie.find(r => r.trim().indexOf('login_id') === 0)

    let loginId;
    if (loginIdRow) {
      loginId = loginIdRow.split('=')[1]
    }

    if (!loginId) {
      return
    }

    const params = new URLSearchParams()
    params.set('loginId', loginId)
    fetch('http://localhost:9090/api/auth.php?' + params.toString()).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((loginUserInfo) => {
      this.$store.dispatch('setLoginUserInfo', loginUserInfo)
      this.$router.push('/user')
    })

  },
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

