import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { INIT_USER, SET_USERDATA, ADD_USER } from './action-types'
import { db } from '~/plugins/firebase'

const usersRef = db.collection('users')
const balanceRef = db.collection('balanceData')

export default () =>
  new Vuex.Store({
    state: {
      user: null,
      users: [],
      balances: []
    },
    mutations: {
      ...vuexfireMutations,
      setUser (state, user) {
        state.user = user
      },
      logoutUser (state) {
        state.user = null
      }
    },
    getters: {
      user: state => state.user,
      users: state => state.users,
      balances: state => state.balances
    },
    actions: {
      [INIT_USER]: firestoreAction((context) => {
        return context.bindFirestoreRef('users', usersRef)
      }),
      [ADD_USER]: firestoreAction(async (context, userdata) => {
        try {
          await usersRef.doc(userdata.uId).set({

            userName: userdata.userName

          })
        } catch (e) {
          alert(e)
        }
      }),
      [SET_USERDATA]: async ({ commit }, uid) => {
        try {
          const userdata = await Promise.all([
            usersRef.doc(uid).get(),
            balanceRef.doc(uid).get()
          ])
          commit('setUser', {
            uId: uid,
            userName: userdata[0].data().userName,
            balance: userdata[1].data().balance
          })
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      }
    }
  })
