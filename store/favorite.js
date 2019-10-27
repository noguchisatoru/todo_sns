import firebase from 'firebase'
import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const favoritesRef = db.collection('Favorites')

export const state = () => ({
  favorites: []
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
  favtodos: state => state.favorites.favoriteIds
}

export const actions = {
  initFavorites: firestoreAction((context, uid) => {
    return context.bindFirestoreRef('favorites', favoritesRef.doc(uid))
  }),
  setFavorite: firestoreAction(async (context, uid) => {
    try {
      await favoritesRef.doc(uid).set({

        favoriteIds: []

      })
    } catch (e) {
      alert(e)
    }
  }),
  addFavorite: async ({ commit }, userdata) => {
    try {
      await favoritesRef.doc(String(userdata.userId)).update({
        favoriteIds: firebase.firestore.FieldValue.arrayUnion(userdata.favTodo)
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
