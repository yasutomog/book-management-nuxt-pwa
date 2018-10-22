<template>
  <div>
    <v-layout v-scroll="onScroll" column align-center justify-center>
    </v-layout>
    <v-layout
            v-touch="{
        left: () => swipe('Left'),
        right: () => swipe('Right'),
        up: () => swipe('Up'),
        down: () => swipe('Down')
      }"
            column
            align-center
            justify-center
    >
    </v-layout>
    <div
            v-show="bottomNav === 'books'"
    >
      <section class="filter">
        <v-layout row wrap>
          <v-flex xs8 sm8>
            <v-text-field
                    label="書籍名"
                    append-icon="search"
                    clearable
                    v-model="search"
            ></v-text-field>
          </v-flex>
          <v-flex xs1 sm1>
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex xs3 sm3>
            <v-checkbox
                    label="貸出中"
                    v-model="isLending"
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </section>
      <section class="book-list">
        <v-list two-line>
          <template v-for="(item, index) in books">
            <v-list-tile
                    :key="item.book_id"
                    avatar
                    @dblclick="dblclickItem(item.book_id)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.publisher }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.anthor }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                        :loading="loadingBookId === item.book_id"
                        @click.stop="clickBtn(item.book_id, item.isLending)"
                        :disabled="loadingBookId === item.book_id"
                        color="#26A69A"
                        class="white--text"
                        ripple
                        x-large
                        v-show="!item.isLending"
                >
                  借りる
                  <v-icon
                          right
                          dark
                  >
                    redo
                  </v-icon>
                </v-btn>
                <v-btn
                        :loading="loadingBookId === item.book_id"
                        @click.stop="clickBtn(item.book_id, item.isLending)"
                        :disabled="loadingBookId === item.book_id"
                        color="#FF8A65"
                        class="white--text"
                        ripple
                        x-large
                        v-show="item.isLending && item.isMine"
                >
                  返却
                  <v-icon
                          right
                          dark
                  >
                    undo
                  </v-icon>
                </v-btn>
                <v-btn
                        color="#90A4AE"
                        class="white--text"
                        ripple
                        x-large
                        v-show="item.isLending && !item.isMine"
                >
                  貸出中
                  <v-icon
                          right
                          dark
                  >
                    not_interested
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
                    v-if="index + 1 < books.length"
                    :key="'d' + index"
            ></v-divider>
          </template>
        </v-list>
      </section>
    </div>
    <div
            v-show="bottomNav === 'mylist'"
    >
      <section class="book-list mybooks">
        <v-list two-line>
          <template v-for="(item, index) in myBooks">
            <v-list-tile
                    :key="item.book_id"
                    avatar
                    @dblclick="dblclickItem(item.book_id)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.publisher }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.anthor }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                        :loading="loadingBookId === item.book_id"
                        @click.stop="clickBtn(item.book_id, item.isLending)"
                        :disabled="loadingBookId === item.book_id"
                        color="#26A69A"
                        class="white--text"
                        ripple
                        x-large
                        v-show="!item.isLending"
                >
                  借りる
                  <v-icon
                          right
                          dark
                  >
                    redo
                  </v-icon>
                </v-btn>
                <v-btn
                        :loading="loadingBookId === item.book_id"
                        @click.stop="clickBtn(item.book_id, item.isLending)"
                        :disabled="loadingBookId === item.book_id"
                        color="#FF8A65"
                        class="white--text"
                        ripple
                        x-large
                        v-show="item.isLending && item.isMine"
                >
                  返却
                  <v-icon
                          right
                          dark
                  >
                    undo
                  </v-icon>
                </v-btn>
                <v-btn
                        color="#90A4AE"
                        class="white--text"
                        ripple
                        x-large
                        v-show="item.isLending && !item.isMine"
                >
                  貸出中
                  <v-icon
                          right
                          dark
                  >
                    not_interested
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
                    v-if="index + 1 < books.length"
                    :key="'d' + index"
            ></v-divider>
          </template>
        </v-list>
      </section>
    </div>
    <div
            v-show="bottomNav === 'expired'"
    >
      <section class="book-list mybooks">
        <v-list two-line>
          <template v-for="(item, index) in expiredBooks">
            <v-list-tile
                    :key="item.book_id"
                    avatar
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.publisher }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary expired">{{ item.user_name }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider
                    v-if="index + 1 < books.length"
                    :key="'d' + index"
            ></v-divider>
          </template>
        </v-list>
      </section>
    </div>
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
        <v-card-title class="headline">エラー</v-card-title>
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
          <v-toolbar-title>書籍の編集</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="showEditor = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="editorBook.valid">
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
            <v-btn block color="#26A69A" :dark="editorBook.valid" :disabled="!editorBook.valid">保存</v-btn>
          </v-form>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showEditor: false,
        editorBook: {
          valid: false,
          bookId: null,
          title: '',
          titleRules: [
            v => !!v || 'タイトルを入力してください',
            v => v.length <= 100 || 'タイトルは100文字以内で入力してください'
          ],
          anthor: '',
          anthorRules: [
            v => !!v || '著者を入力してください',
            v => v.length <= 40 || '著者は40文字以内で入力してください'
          ],
          publiction: '',
          publictionRules: [
            v => !!v || '出版日を入力してください',
            v => v.length <= 10 || '出版日は40文字以内で入力してください'
          ],
          publictionMenu: false,
          publisher: '',
          publisherRules: [
            v => !!v || '出版社を入力してください',
            v => v.length <= 150 || '出版社は150文字以内で入力してください'
          ],
          isbn: '',
          isbnRules: [
            v => !!v || 'ISBNを入力してください',
            v => v.toString(10).length <= 30 || '出版社は30文字以内で入力してください',
            v => !!v.toString(10).match(/^[0-9\-]+$/) || '半角数値とハイフンで入力してください'
          ],
        },
        swipeDirection: 'None',
        offsetTop: 0,
        search: '',
        isLending: false,
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
    computed: {
      books() {
        const vm = this,
          search = vm.search,
          isLending = vm .isLending

        let filtered = this.$store.state.books.filter((book) => {

          if (((book.title.indexOf(search) !== -1) || (book.publisher.indexOf(search) !== -1) || (book.anthor.indexOf(search) !== -1))) {

            if (isLending) {

              return book.isLending

            } else {

              return true

            }

          } else {

            return false

          }

        })

        return filtered
      },
      myBooks() {
        let filtered = this.$store.state.books.filter((book) => {

          return book.isMine && book.isLending

        })

        return filtered
      },
      expiredBooks() {
        let filtered = this.$store.state.books.filter((book) => {

          return book.isExpired

        })

        return filtered
      }
    },
    methods: {
      dblclickItem(bookId) {
        const vm = this,
          targetBookId = vm.books.findIndex(item => item.book_id === bookId),
          targetBook = vm.books[targetBookId]

        // vm.editorBook.valid = false
        vm.editorBook.bookId = targetBook.book_id
        vm.editorBook.title = targetBook.title
        vm.editorBook.anthor = targetBook.anthor
        vm.editorBook.publiction = targetBook.publiction
        vm.editorBook.publictionMenu = false
        vm.editorBook.publisher = targetBook.publisher
        vm.editorBook.isbn = targetBook.isbn

        vm.showEditor = true
      },
      clickBtn(bookId, isLending) {
        const vm = this,
          targetBookId = vm.books.findIndex(item => item.book_id === bookId),
          targetBook = vm.books[targetBookId],
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
        this.$store.dispatch('getBooks', loginId).catch((err) => {
          this.$router.push('/')
        })
      },
      borrowBook(loginId, targetBook) {

        const vm = this,
          bookId = targetBook['book_id']

        fetch('http://localhost:9090/api/borrow.php', {
          method: 'POST',
          body: JSON.stringify({
            bookId: bookId,
            loginId: loginId
          }),
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

        fetch('http://localhost:9090/api/return.php', {
          method: 'POST',
          body: JSON.stringify({
            lbId: lbId,
            loginId: loginId
          }),
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
      onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        console.log(this.offsetTop);
      },
      swipe (direction) {
        this.swipeDirection = direction
        console.log(this.swipeDirection);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .filter {
    padding: 72px 16px 16px;
  }
  .v-btn .v-icon--right {
    margin-left: 6px;
  }
  .book-list {
    padding-bottom: 56px;
    &.mybooks {
      padding: 72px 16px 16px;
    }
    &.expiredbooks {
      padding: 72px 16px 16px;
    }
  }
  .v-list {
    padding: 0;
    button {
      height: 56px;
    }
  }
  .v-chip {
    margin: 6px 4px;
  }
  .theme--light.application .text--primary.expired {
    color: #ff5252 !important;
  }
  .v-form button {
    margin-top: 24px;
  }
</style>
