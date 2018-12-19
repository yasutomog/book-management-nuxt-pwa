import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    books: [],
    loginInfo: null
  },
  actions: {
    setLoginUserInfo({ commit, state }, loginUserInfo) {
      commit('setLoginUserInfo', loginUserInfo)
    },
    getBooks({ commit, state }, p) {
      return this.$axios.$get('/api/books', {
        params: {
          loginId: p.loginId
        }
      }).then((res) => {
        commit('getBooks', res.books)
      })
    }
  },
  mutations: {
    setLoginUserInfo(state, loginUserInfo) {
      state.loginInfo = loginUserInfo
    },
    getBooks(state, books) {
      books.forEach((book) => {
        // レンタル中の判定
        let lendDate = book.lend_date === null ? null : Date.parse(book.lend_date.replace(' ', 'T')),
          borrowDate = book.borrow_date === null ? null : Date.parse(book.borrow_date.replace(' ', 'T'))
        book.isLending = false
        if (lendDate === null) {
          book.isLending = false
        } else if (borrowDate === null) {
          book.isLending = true
        } else {
          if (lendDate > borrowDate) {
            book.isLending = true
          }
        }

        // 新作（発売日が1ヶ月以内）の判定
        let publiction = Date.parse(book.publiction.replace(' ', 'T')),
          currentDate = new Date(),
          oneMonthAgo = currentDate.setMonth(currentDate.getMonth() - 1)
        book.isNew = (publiction > oneMonthAgo)

        // 返却期限切れ（貸出から1ヶ月以上経過）の判定
        book.isExpired = false
        book.isMine = false
        if (book.isLending) {
          let lendDate = new Date(book.lend_date.replace(' ', 'T')),
            lendMonthLater = lendDate.setMonth(lendDate.getMonth() + 1),
            currentMilliSec = currentDate.getTime()

          if (currentMilliSec > lendMonthLater) {
            book.isExpired = true
          }

          book.isMine = (book.google_id === state.loginInfo.google_id)

        }
      })
      state.books = books
    }
  }
})

export default store
