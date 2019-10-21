<template>
  <div>
    <p class="title">
      MyToDo:{{ mytodos(user.uId).length }}
    </p>
    <p>
      Follower:1
    </p>
    <p>
      Follow:1
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      todo: state => state.todo.todo,
      todos: state => state.todo.todos
    }),
    ...mapGetters({ mytodos: 'todo/mytodos',
      todotest: 'todo/todos' })
  },

  mounted () {
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
    ...mapMutations({
      setTodo: 'todo/setTodo'
    }),

    statusChange (status, id) {
      this.$store.dispatch('todo/statusChange', { state: status, documentId: id })
    }
  }
}
</script>
