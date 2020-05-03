import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async mountUsers({}, mountUsers) {
      try {
        let users = []
        await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${mountUsers}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            users = data.users
          })

        return users
      } catch (e) {
        console.log(e)
      }
    },

    async getUsers({}, {page, userCount}) {
      try {
        let nextUsers = []

        await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${userCount}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            nextUsers = data
          })
          
          return nextUsers
      } catch (e) {
        console.log(e)
      }
    },

    async mountPositions() {
      try {
        let positions = []

        await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            positions = data.positions
          })

        return positions
      } catch (e) {
        console.log(e);
      }
    },

    async registerHandler({}, user) {
      try {
        let token = ''
        let result = []

        await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            token = data.token
          })

        await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            body: user,
            headers: {
              'Token': token
            },
          })
          .then(function(response) {
            result = response.json();
          })
          
        return result
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
