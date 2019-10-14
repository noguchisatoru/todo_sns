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
  todos: state => state.todos,
  todonumber: state => (state.todos).length + 1,
  fivemytodos: state => (uid) => {
    return state.todos.filter(todo => todo.userId === uid && todo.state !== 'アーカイブ').slice(0, 5)
  }
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
  }
}
