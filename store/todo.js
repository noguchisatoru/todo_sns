import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const todosRef = db.collection('Todos')

export const state = () => ({
  todo: null,
  todos: []
})

export const mutations = {
  setTodo (state, todo) {
    state.todo = todo
  }
}

export const getters = {
  todo: state => state.todo,
  todos: state => state.todos
}

export const actions = {
  initTodos: firestoreAction((context) => {
    return context.bindFirestoreRef('Todos', todosRef)
  }),
  addTodo: firestoreAction(async (context, tododata) => {
    try {
      await todosRef.add({

        userId: tododata.userId,
        text: tododata.text,
        createdAt: '2019年10月01日',
        state: '予定',
        tag: tododata.tag,
        release: tododata.release

      })
    } catch (e) {
      alert(e)
    }
  })
}
