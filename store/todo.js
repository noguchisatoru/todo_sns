import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const todosRef = db.collection('Todos')

export const state = () => ({
  todo: null,
  todos: [],
  radiostate: 'Free'
})

export const mutations = {
  setTodo (state, todo) {
    state.todo = todo
  },
  setState (state, radiostate) {
    state.radiostate = radiostate
  }
}

export const getters = {
  todo: state => state.todo,
  todos: state => state.todos,
  todonumber: state => (state.todos).length + 1,
  getRadioState: state => state.radiostate,
  mytodos: state => (uid) => {
    return state.todos.filter(todo => todo.userId === uid)
  },
  mytodosfilter: state => (uid) => {
    if (state.radiostate === 'ALL') {
      return state.todos.filter(todo => todo.userId === uid)
    } else if (state.radiostate === 'Archive') {
      return state.todos.filter(todo => todo.userId === uid && todo.state === 'アーカイブ')
    } else {
      return state.todos.filter(todo => todo.userId === uid && todo.tag === state.radiostate && todo.state !== 'アーカイブ')
    }
  },
  tenmytodos: state => (uid) => {
    return state.todos.filter(todo => todo.userId === uid && todo.state !== 'アーカイブ').slice(0, 10)
  },
  releasetodos: state => state.todos.filter(todo => todo.release === '公開')
}

export const actions = {
  initTodos: firestoreAction((context) => {
    return context.bindFirestoreRef('todos', todosRef.orderBy('createdAt', 'desc'))
  }),
  addTodo: firestoreAction(async (context, tododata) => {
    try {
      await todosRef.doc(String(tododata.documentId)).set({

        documentId: tododata.documentId,
        todoAuthor: tododata.todoAuthor,
        userId: tododata.userId,
        text: tododata.text,
        createdAt: tododata.createdAt,
        state: '予定',
        tag: tododata.tag,
        release: tododata.release

      })
    } catch (e) {
      alert(e)
    }
  }),

  statusChange: async (context, statedata) => {
    try {
      await todosRef.doc(String(statedata.documentId)).update({
        state: statedata.state
      })
    } catch (e) {
      alert(e)
    }
  },

  todoUpdate: async (context, updatedData) => {
    try {
      await todosRef.doc(String(updatedData.documentId)).update({
        text: updatedData.text,
        release: updatedData.release,
        createdAt: updatedData.createdAt
      })
    } catch (e) {
      alert(e)
    }
  },

  commitMessege: (store, payload) => {
    return store.commit('setState', payload)
  }
}
