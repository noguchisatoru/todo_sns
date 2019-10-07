<template>
  <section>
    <article v-for="todo in mytodos(user.uId)" :key="todo.uId" class="media">
      <div class="media-content">
        <div class="content" @click="isImageModalActive = true">
          <p>
            {{ todo.text }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <p>{{ todo.tag }}</p>
          </div>
          <div class="level-right">
            <b-dropdown aria-role="list">
              <button slot="trigger" class="button is-small">
                <span>Click me!</span>
                <b-icon icon="menu-down" />
              </button>

              <b-dropdown-item aria-role="listitem">
                Action
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                Another action
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                Something else
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </nav>
      </div>
    </article>
    <b-modal :active.sync="isImageModalActive">
      <p class="is-4by3">
        mytodo
      </p>
    </b-modal>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isImageModalActive: false
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      todos: state => state.todo.todos
    }),
    ...mapGetters({ mytodos: 'todo/mytodos',
      todotest: 'todo/todos' })
  },

  mounted () {
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
  }
}
</script>
