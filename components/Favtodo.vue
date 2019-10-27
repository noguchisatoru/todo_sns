<template>
  <section>
    <article v-for="favtodo in favtodos" :key="favtodo.uId" class="media">
      <div class="media-content">
        <div class="content" @click="isImageModalActive = true">
          <strong>{{ favtodo.todoAuthor }}</strong> <small>@{{ favtodo.userId }}</small>
          <p>
            {{ favtodo.text }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <p>{{ favtodo.tag }}</p>
          </div>
          <div class="level-right">
            <small>{{ favtodo.createdAt }}</small>
          </div>
        </nav>
      </div>
    </article>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isImageModalActive: false
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      favorites: state => state.favorite.favorites
    }),
    ...mapGetters({ favtodos: 'favorite/favtodos' })
  },

  mounted () {
    this.$store.dispatch('favorite/initFavorites', this.user.uId)
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
    ...mapMutations({
      setTodo: 'todo/setTodo'
    })
  }
}
</script>
