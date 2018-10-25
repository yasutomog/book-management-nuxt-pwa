<template>
  <div v-show="bottomNav === 'books'">
    <section class="filter">
      <v-layout row wrap>
        <v-flex xs9 sm9>
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
        <v-flex xs2 sm2>
          <v-btn icon class="create" @click="clickNewBtn">
            <v-icon color="grey darken-1" right large>add_box</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </section>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">詳細条件</div>
        <v-card class="dtl-filter-body">
          <v-checkbox label="レンタル中" v-model="isLending"
          ></v-checkbox>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <section class="book-list">
      <v-list two-line>
        <template v-for="(item, index) in books">
          <v-list-tile
                  :key="item.book_id"
                  avatar
                  ripple
                  @click="clickItem(item.book_id)"
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
                      fab
                      v-show="!item.isLending"
              >
                <v-icon ark>redo</v-icon>
              </v-btn>
              <v-btn
                      :loading="loadingBookId === item.book_id"
                      @click.stop="clickBtn(item.book_id, item.isLending)"
                      :disabled="loadingBookId === item.book_id"
                      color="#FF8A65"
                      class="white--text"
                      ripple
                      fab
                      v-show="item.isLending && item.isMine"
              >
                <v-icon dark>undo</v-icon>
              </v-btn>
              <v-btn
                      color="#90A4AE"
                      @click.stop=""
                      class="white--text"
                      ripple
                      fab
                      v-show="item.isLending && !item.isMine"
              >
                <v-icon dark>not_interested</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < books.length" :key="'d' + index"></v-divider>
        </template>
      </v-list>
    </section>
  </div>
</template>

<script>
  export default {
    name: "BookList",
    props: {
      bottomNav: String
    },
    data () {
      return {
        search: '',
        isLending: false,
        loadingBookId: null
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
      }
    },
    methods: {
      clickNewBtn() {
        this.$emit('click-new-btn')
      },
      clickItem(bookId) {
        this.$emit('click-item', bookId)
      },
      clickBtn(bookId, isLending) {
        this.$emit('click-btn', bookId, isLending)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter {
    padding: 72px 16px 16px;
  }
  .dtl-filter-body {
    padding: 0 24px;
  }
  .book-list {
    padding-bottom: 56px;
  }
  .create.v-btn.v-btn--icon.theme--light {
    margin-top: 12px;
  }
</style>
