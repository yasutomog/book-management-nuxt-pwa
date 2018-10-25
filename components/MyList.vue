<template>
  <div v-show="bottomNav === 'mylist'">
    <section class="book-list">
      <v-list two-line>
        <template v-for="(item, index) in myBooks">
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
                      color="#FF8A65"
                      class="white--text"
                      ripple
                      fab
              >
                <v-icon dark>undo</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < myBooks.length" :key="'d' + index"></v-divider>
        </template>
      </v-list>
    </section>
  </div>
</template>

<script>
  export default {
    name: "MyList",
    props: {
      bottomNav: String
    },
    data () {
      return {
        isLending: false,
        loadingBookId: null
      }
    },
    computed: {
      myBooks() {
        let filtered = this.$store.state.books.filter((book) => {

          return book.isMine && book.isLending

        })

        return filtered
      }
    },
    methods: {
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
  .book-list {
    padding: 56px 0 56px;
  }
</style>
