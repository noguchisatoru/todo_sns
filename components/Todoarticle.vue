<template>
  <section>
    <article v-for="todo in releasetodos" :key="todo.uId" class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content" @click="isImageModalActive = true">
          <p>
            <strong>{{ todo.todoAuthor }}</strong> <small>@{{ todo.userId }}</small> <small>{{ todo.createdAt }}</small> <small>{{ todo.tag }}</small>
            <br>
            {{ todo.text }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply" /></span>
            </a>
            <a class="level-item">
              <span class="icon is-small" @click="favorite(todo.documentId)"><i class="fas fa-heart" /></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img src="/static/img/placeholder-1280x960.png">
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
    ...mapGetters({ releasetodos: 'todo/releasetodos' })
  },

  mounted () {
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
    async favorite (todoId) {
      console.log(this.user.uId)
      await this.$store.dispatch('favorite/addFavorite', { documentId: todoId, userId: this.user.uId })
    }
  }
}
</script>
