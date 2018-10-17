<template>
  <div>
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
                    @click="clickListItem(item.book_id)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.publisher }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.anthor }}</v-list-tile-sub-title>
                <!--<v-list-tile-sub-title>-->
                  <!--<v-chip label outline color="red" small v-show="item.isLending">貸出中</v-chip>-->
                  <!--<v-chip label outline color="red" small v-show="item.isNew">NEW</v-chip>-->
                  <!--<v-chip label outline color="red" small v-show="item.isExpired">期限切れ</v-chip>-->
                <!--</v-list-tile-sub-title>-->
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                        :loading="loadingBookId === item.book_id"
                        @click.stop="clickBtn(item.book_id, item.isLending)"
                        :disabled="loadingBookId === item.book_id"
                        color="success"
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
                        color="error"
                        class="white--text"
                        ripple
                        x-large
                        v-show="item.isLending"
                >
                  返却
                  <v-icon
                          right
                          dark
                  >
                    undo
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
      マイリスト
    </div>
    <div
            v-show="bottomNav === 'expired'"
    >
      期限切れ
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        isLending: false,
        loadingBookId: null,
        bottomNav: 'books'
      }
    },
    mounted() {
      this.$store.dispatch('getBooks').catch((err) => {
        this.$router.push('/')
      });
    },
    computed: {
      books() {
        let vm = this
        let search = vm.search,
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

        return filtered;
      }
    },
    methods: {
      clickListItem (bookId) {
        console.log('clickListItem');
      },
      clickBtn(bookId, isLending) {
        // TODO isLendingによってAPI振り分ける
        const vm = this,
          targetBookId = vm.books.findIndex(item => item.book_id === bookId)

        vm.loadingBookId = bookId

        setTimeout(() => {
          vm.loadingBookId = null
          vm.books[targetBookId]['isLending'] = !isLending
        }, 3000)
      }
    },
    watch: {
      // loader () {
      //   const l = this.loader
      //   this[l] = !this[l]
      //
      //   setTimeout(() => (this[l] = false), 3000)
      //
      //   this.loader = null
      // }
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
</style>
