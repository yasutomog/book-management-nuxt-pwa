<template>
  <section class="container">
    <div>
      <img src="~/assets/tribeat_logo.png" width="300" height="133" />
      <v-btn block round outline color="grey darken-1" dark @click="clickBooks">
        書籍一覧へ
        <v-icon right dark>library_books</v-icon>
      </v-btn>
      <v-btn block round outline color="grey darken-1" dark @click="openAuthWin" target="_blank">
        Google認証へ
        <v-icon right dark>lock_open</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script>
  export default {
    asyncData (context) {
      return context.env
    },
    data () {
      return {
        authUrl: '../'
      }
    },
    created() {
      if (this.API_URL === '') {
        this.authUrl = '../'
      } else {
        this.authUrl = this.API_URL
      }
    },
    mounted() {
    },
    methods: {
      /**
       * 認証ボタンクリックイベント処理
       */
      openAuthWin() {
        const popup = window.open (this.authUrl, "authwindow", "width=400,height=300")
        window.addEventListener('message', (event) => {
          this.moveUserPage()
          popup.close();
        }, false);
      },
      /**
       * 書籍一覧ボタンのクリックイベント処理
       */
      clickBooks() {
        this.moveUserPage()
      },
      /**
       * 書籍一覧へ移動
       */
      moveUserPage() {
        this.$router.push('/user')
      }
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
    margin-top: 24px;
  }
</style>

