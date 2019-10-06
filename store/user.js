import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const usersRef = db.collection('Users')
const followerRef = db.collection('Followers')

export const state = () => ({
  user: null,
  users: [],
  followers: []
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  logoutUser (state) {
    state.user = null
  }
}

export const getters = {
  user: state => state.user,
  users: state => state.users,
  followers: state => state.followers
}

export const actions = {
  initUser: firestoreAction((context) => {
    return context.bindFirestoreRef('users', usersRef)
  }),
  addUser: firestoreAction(async (context, userdata) => {
    try {
      await usersRef.doc(userdata.uId).set({

        user_name: userdata.user_name,
        user_introduction: 'test',
        created_at: '2019年10月01日',
        image_color: 'blue'

      })

      await followerRef.doc(userdata.uId).set({

        following_user_id: []

      })
    } catch (e) {
      alert(e)
    }
  }),
  setUserdata: async ({ commit }, uid) => {
    try {
      const userdata = await usersRef.doc(uid).get()
      commit('setUser', {
        uId: uid,
        user_name: userdata.data().user_name,
        user_introduction: userdata.data().user_introduction,
        created_at: userdata.data().created_at,
        image_color: userdata.data().image_color
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
