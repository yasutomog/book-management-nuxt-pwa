<template>
  <div>
    <div
            v-show="bottomNav === 'books'"
    >
      <section class="container">
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
                    :key="'book' + item.book_id"
                    avatar
                    @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.publisher }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  <v-chip
                          label
                          outline
                          color="red"
                          small>貸出中</v-chip>
                  <v-chip label outline color="red" small>NEW</v-chip>
                  <v-chip label outline color="red" small>人気</v-chip>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                        :loading="loading3"
                        @click.native="loader = 'loading3'"
                        :disabled="loading3"
                        color="success"
                        class="white--text"
                        ripple
                        x-large
                        v-show="item.isLending"
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
                        :loading="loading3"
                        @click.native="loader = 'loading3'"
                        :disabled="loading3"
                        color="error"
                        class="white--text"
                        ripple
                        x-large
                        v-show="!item.isLending"
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
        isLending: null,
        loader: null,
        loading3: false,
        bottomNav: 'books'
      }
    },
    mounted() {
      this.$store.dispatch('getBooks')
    },
    computed: {
      books() {
        let vm = this
        let search = vm.search
        let filtered = this.$store.state.books.filter((book) => {
          return (book.title.indexOf(search) !== -1)
        })
        // ボタンのローディング
        // ボタンのローダー
        // タグ情報（NEW、期限切れ）
        return filtered;
      }
    },
    methods: {
      toggle (index) {
        // const i = this.selected.indexOf(index)
        //
        // if (i > -1) {
        //   this.selected.splice(i, 1)
        // } else {
        //   this.selected.push(index)
        // }
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
  }
</script>
<style lang="scss" scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .v-btn .v-icon--right {
    margin-left: 6px;
  }
  .book-list {
    padding-bottom: 56px;
  }
  .v-list {
    padding: 0;
    > div {
      padding: 8px 0;
      button {
        height: 54px;
      }
    }
  }
</style>
