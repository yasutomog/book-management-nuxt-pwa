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
              <v-list-tile-sub-title class="text--primary expired">{{ item.user_name }}</v-list-tile-sub-title>
            </v-list-tile-content>
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
    props: {
      bottomNav: String
    },
    computed: {
      expiredBooks() {
        let filtered = this.$store.state.books.filter((book) => {

          return book.isExpired

        })

        return filtered
      }
    }
  }
</script>

<style lang="scss" scoped>
  .book-list {
    padding: 56px 0 56px;
  }
  .theme--light.application .text--primary.expired {
    color: #ff5252 !important;
  }
</style>
