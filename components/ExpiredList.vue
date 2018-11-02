<template>
  <div v-show="bottomNav === 'expired'">
    <section class="book-list">
      <v-list two-line>
        <template v-for="(item, index) in expiredBooks">
          <v-list-tile
                  :key="item.book_id"
                  avatar
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ item.publisher }}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="text--primary">
                <span>{{ item.max_lend_date }} </span> に
                <span> {{ item.user_name }} </span> がレンタル開始
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                      :loading="loadingBookId === item.book_id"
                      @click.stop="clickBtn(item.book_id)"
                      :disabled="loadingBookId === item.book_id"
                      color="#F44236"
                      class="white--text"
                      fab
              >
                <v-icon ark>notification_important</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < expiredBooks.length" :key="'d' + index"></v-divider>
        </template>
      </v-list>
    </section>
  </div>
</template>

<script>
  export default {
    name: "ExpiredList",
    asyncData (context) {
      return context.env
    },
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
      expiredBooks() {
        let filtered = this.$store.state.books.filter((book) => {

          return book.isExpired

        })

        return filtered
      }
    },
    methods: {
      clickBtn(bookId) {

        this.$emit('click-notification', bookId)

      }
    }
  }
</script>

<style lang="scss" scoped>
  .book-list {
    padding: 56px 0 56px;
  }
  .theme--light.application .text--primary span {
    color: #ff5252 !important;
  }
</style>
