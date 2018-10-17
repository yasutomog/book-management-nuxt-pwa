import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    hoge: '',
    books: []
  },
  actions: {
    getBooks({ commit, state }, data) {
      // TODO api request
      return fetch('http://localhost:9090/api/books.php').then((response) => {
        if (!response.ok) {
          throw new Error(response.status)
        } else {
          return response.json();
        }
      }).then((json) => {
        commit('getBooks', json)
      })
    }
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    getBooks(state, json) {
      json.forEach((book) => {

        // レンタル中の判定
        let lendDate = Date.parse(book.max_lend_date),
          borrowDate = Date.parse(book.max_borrow_date)
        book.isLending = false
        if (book.max_lend_date === null) {
          book.isLending = false
        } else if (book.max_borrow_date === null) {
          book.isLending = true
        } else {
          if (lendDate > borrowDate) {
            book.isLending = true
          }
        }

        // 新作（発売日が1ヶ月以内）の判定
        let publiction = Date.parse(book.publiction),
          currentDate = new Date(),
          oneMonthAgo = currentDate.setMonth(currentDate.getMonth() - 1)
        book.isNew = (publiction > oneMonthAgo)

        // 返却期限切れ（貸出から1ヶ月以上経過）の判定
        book.isExpired = false
        if (book.isLending) {
          let lendDate = new Date(book.max_lend_date),
            lendMonthLater = lendDate.setMonth(lendDate.getMonth() + 1),
            currentMilliSec = currentDate.getTime()

          if (currentMilliSec > lendMonthLater) {
            book.isExpired = true
          }
        }

      })
      state.books = json
    }
  }
})

export default store
