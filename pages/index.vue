<template>
  <section class="container">
    <div>
      <img src="~/assets/tribeat_logo.png" width="300" height="133" />
      <v-btn block color="#26A69A" dark @click="clickBooks">
        書籍一覧へ
        <v-icon right dark>library_books</v-icon>
      </v-btn>
      <v-btn block color="#FF8A65" dark :href="authUrl" target="_blank">
        Google認証へ
        <v-icon right dark>lock_open</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  asyncData (context) {
    return context.env
  },
  data () {
    return {
      authUrl: '../'
    }
  },
  mounted() {

    if (this.API_URL === '') {

      this.authUrl = '../'

    } else {

      this.authUrl = this.API_URL

    }

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
    fetch(this.API_URL + '/api/auth.php?' + params.toString()).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((loginUserInfo) => {
      this.$store.dispatch('setLoginUserInfo', loginUserInfo)
      this.$router.push('/user')
    })

  },
  methods: {
    clickBooks() {
      this.$router.push('/user')
    }
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
  .v-btn {
    margin-top: 16px;
  }
</style>

