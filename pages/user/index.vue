<template>
  <div>
    <book-list :bottomNav="bottomNav" @click-new-btn="clickNewBtn" @click-item="clickItem" @click-btn="clickBtn"></book-list>
    <my-list :bottomNav="bottomNav" @click-item="clickItem" @click-btn="clickBtn"></my-list>
    <expired-list :bottomNav="bottomNav" @click-notification="clickNotification"></expired-list>
    <v-bottom-nav
            :active.sync="bottomNav"
            :value="true"
            fixed
            color="white"
    >
      <v-btn
              color="teal"
              flat
              value="books"
      >
        <span>書籍一覧</span>
        <v-icon>library_books</v-icon>
      </v-btn>
      <v-btn
              color="teal"
              flat
              value="mylist"
      >
        <span>マイリスト</span>
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn
              color="teal"
              flat
              value="expired"
      >
        <span>期限切れ</span>
        <v-icon>access_alarm</v-icon>
      </v-btn>
    </v-bottom-nav>
    <v-dialog
            v-model="dialog"
            max-width="290"
    >
      <v-card>
        <v-card-title class="headline">情報</v-card-title>
        <v-card-text>
          {{dialogMsg}}
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
            v-model="showEditor"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="grey darken-1">
          <v-toolbar-title>書籍の{{editorBook.headerTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="showEditor = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="editorBook.valid" lazy-validation>
            <v-text-field
                    v-model="editorBook.title"
                    :rules="editorBook.titleRules"
                    :counter="100"
                    label="タイトル"
                    prepend-icon="book"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="editorBook.anthor"
                    :rules="editorBook.anthorRules"
                    :counter="40"
                    label="著者"
                    prepend-icon="create"
                    required
            ></v-text-field>
            <v-menu
                    ref="publictionMenu"
                    :close-on-content-click="false"
                    v-model="editorBook.publictionMenu"
                    :nudge-right="40"
                    :return-value.sync="editorBook.publiction"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
              <v-text-field
                      slot="activator"
                      v-model="editorBook.publiction"
                      label="出版日"
                      prepend-icon="history"
                      readonly
              ></v-text-field>
              <v-date-picker v-model="editorBook.publiction" @input="$refs.publictionMenu.save(editorBook.publiction)"></v-date-picker>
            </v-menu>
            <v-text-field
                    v-model="editorBook.publisher"
                    :rules="editorBook.publisherRules"
                    :counter="150"
                    label="出版社"
                    prepend-icon="domain"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="editorBook.isbn"
                    :rules="editorBook.isbnRules"
                    :counter="30"
                    label="ISBN"
                    prepend-icon="exposure_zero"
                    required
            ></v-text-field>
            <v-btn block color="#26A69A" :dark="editorBook.valid" :disabled="!editorBook.valid" @click="clickSave">
              保存
              <v-icon right dark>save</v-icon>
            </v-btn>
            <v-btn block color="#FF8A65" dark v-show="editorBook.showDeleteBtn" @click="clickDelete">
              削除
              <v-icon right dark>delete</v-icon>
            </v-btn>
            <v-btn block color="#F44236" dark v-show="editorBook.showNotificationBtn" @click="clickNotification(editorBook.bookId)">
              返却通知
              <v-icon right dark>notification_important</v-icon>
            </v-btn>
          </v-form>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

  import BookList from '~/components/BookList.vue'
  import MyList from '~/components/MyList.vue'
  import ExpiredList from '~/components/ExpiredList.vue'

  export default {
    asyncData (context) {
      return context.env
    },
    data () {
      return {
        showEditor: false,
        editorBook: {
          valid: false,
          bookId: '',
          title: '',
          titleRules: [
            v => !!v || 'タイトルを入力してください',
            v => (v && v.length <= 100) || 'タイトルは100文字以内で入力してください'
          ],
          anthor: '',
          anthorRules: [
            v => !!v || '著者を入力してください',
            v => (v && v.length <= 40) || '著者は40文字以内で入力してください'
          ],
          publiction: '',
          publictionRules: [
            v => !!v || '出版日を入力してください',
            v => (v && v.length <= 10) || '出版日は40文字以内で入力してください'
          ],
          publictionMenu: false,
          publisher: '',
          publisherRules: [
            v => !!v || '出版社を入力してください',
            v => (v && v.length <= 150) || '出版社は150文字以内で入力してください'
          ],
          isbn: '',
          isbnRules: [
            v => !!v || 'ISBNを入力してください',
            v => (v && v.toString(10).length <= 30) || '出版社は30文字以内で入力してください',
            v => (v && !!v.toString(10).match(/^[0-9\-]+$/)) || '半角数値とハイフンで入力してください'
          ],
          showDeleteBtn: true,
          headerTitle: '編集',
          showNotificationBtn: false
        },
        loadingBookId: null,
        bottomNav: 'books',
        dialog: false,
        dialogMsg: ''
      }
    },
    mounted() {

      if (this.$store.state.loginInfo === null) {

        this.$router.push('/')

      } else {

        this.getBooks()

      }

    },
    methods: {
      clickItem(bookId) {
        const vm = this,
          targetBookId = this.$store.state.books.findIndex(item => item.book_id === bookId),
          targetBook = this.$store.state.books[targetBookId]

        vm.editorBook.bookId = targetBook.book_id
        vm.editorBook.title = targetBook.title
        vm.editorBook.anthor = targetBook.anthor
        vm.editorBook.publiction = targetBook.publiction
        vm.editorBook.publictionMenu = false
        vm.editorBook.publisher = targetBook.publisher
        vm.editorBook.isbn = targetBook.isbn

        vm.editorBook.showDeleteBtn = true
        vm.editorBook.headerTitle = '編集'

        vm.editorBook.showNotificationBtn = targetBook.isLending

        vm.showEditor = true
      },
      clickBtn(bookId, isLending) {
        const vm = this,
          targetBookId = this.$store.state.books.findIndex(item => item.book_id === bookId),
          targetBook = this.$store.state.books[targetBookId],
          loginId = this.$store.state.loginInfo.login_id

        // タップされたボタンのローディング開始
        vm.loadingBookId = bookId

        if (isLending) {

          vm.returnBook(loginId, targetBook)

        } else {

          vm.borrowBook(loginId, targetBook)

        }
      },
      getBooks() {
        const loginId = this.$store.state.loginInfo.login_id
        this.$store.dispatch('getBooks', {
          loginId: loginId,
          apiBaseUrl: this.API_URL
        }).catch((err) => {
          this.$router.push('/')
        })
      },
      borrowBook(loginId, targetBook) {

        const vm = this,
          bookId = targetBook['book_id']

        fetch(this.API_URL + '/api/borrow.php', {
          method: 'POST',
          body: JSON.stringify({
            bookId: bookId,
            loginId: loginId
          })
        }).then((res) => {
          if (res.ok) {
            this.getBooks()
          } else {
            throw new Error()
          }
        }).catch(() => {
          vm.dialog = true
          vm.dialogMsg = '書籍の貸出に失敗しました'
        }).finally(() => {
          vm.loadingBookId = null
        })

      },
      returnBook(loginId, targetBook) {

        const vm = this,
          lbId = targetBook['max_id']

        fetch(this.API_URL + '/api/return.php', {
          method: 'POST',
          body: JSON.stringify({
            lbId: lbId,
            loginId: loginId
          })
        }).then((res) => {
          vm.loadingBookId = null
          if (res.ok) {
            this.getBooks()
          } else {
            throw new Error()
          }
        }).catch(() => {
          vm.dialog = true
          vm.dialogMsg = '書籍の返却に失敗しました'
        }).finally(() => {
          vm.loadingBookId = null
        })

      },
      clickSave() {
        const vm = this,
          editorBook = vm.editorBook,
          loginId = this.$store.state.loginInfo.login_id

        fetch(this.API_URL + '/api/edit.php', {
          method: 'POST',
          body: JSON.stringify({
            loginId: loginId,
            bookId: editorBook.bookId,
            title: editorBook.title,
            anthor: editorBook.anthor,
            publiction: editorBook.publiction,
            publisher: editorBook.publisher,
            isbn: editorBook.isbn
          })
        }).then((res) => {
          if (res.ok) {
            vm.getBooks()
            vm.showEditor = false
          } else {
            throw new Error()
          }
        }).catch(() => {
          vm.dialog = true
          vm.dialogMsg = '書籍の編集に失敗しました'
        }).finally(() => {
        })

      },
      clickDelete() {
        const vm = this,
          editorBook = vm.editorBook,
          loginId = this.$store.state.loginInfo.login_id

        fetch(this.API_URL + '/api/delete.php', {
          method: 'POST',
          body: JSON.stringify({
            loginId: loginId,
            bookId: editorBook.bookId
          })
        }).then((res) => {
          if (res.ok) {
            vm.getBooks()
            vm.showEditor = false
          } else {
            throw new Error()
          }
        }).catch(() => {
          vm.dialog = true
          vm.dialogMsg = '書籍の削除に失敗しました'
        }).finally(() => {
        })
      },
      clickNewBtn() {
        const vm = this

        vm.editorBook.showDeleteBtn = false
        vm.editorBook.headerTitle = '登録'

        vm.editorBook.showNotificationBtn = false;

        this.$refs.form.reset()

        vm.showEditor = true
      },
      clickNotification(bookId) {

        const vm = this,
          targetBookId = this.$store.state.books.findIndex(item => item.book_id === bookId),
          targetBook = this.$store.state.books[targetBookId],
          loginId = this.$store.state.loginInfo.login_id,
          googleId = targetBook.google_id

        // タップされたボタンのローディング開始
        vm.loadingBookId = bookId

        fetch(this.API_URL + '/api/push.php', {
          method: 'POST',
          body: JSON.stringify({
            googleId: googleId,
            loginId: loginId
          })
        }).then((res) => {
          if (res.ok) {
            vm.dialog = true
            vm.dialogMsg = '返却の通知をしました'
          } else {
            throw new Error()
          }
        }).catch(() => {
          vm.dialog = true
          vm.dialogMsg = '書籍の貸出に失敗しました'
        }).finally(() => {
          vm.loadingBookId = null
        })
      }
    },
    components: {
      BookList,
      MyList,
      ExpiredList
    }
  }
</script>
<style lang="scss" scoped>
  .v-form button {
    margin-top: 24px;
  }
</style>
