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
      fetch('http://localhost:9090/api/books.php').then(function(response) {
        return response.json();
      }).then(function(json) {
        commit('getBooks', json)
      });
    }
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    getBooks(state, json) {
      json.forEach((book) => {
        let lendData = Date.parse(book.max_lend_date),
          borrowDate = Date.parse(book.max_borrow_date)
        book.isLending = (lendData > borrowDate)
      })
      state.books = json
    }
  }
})

export default store
