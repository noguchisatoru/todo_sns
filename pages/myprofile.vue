<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <Profilecard />
          <div class="tile is-child box">
            <Myintroduction />
          </div>
        </div>
      </div>
      <div class="tile is-vertical is-parent">
        <div class="tile is-child">
          <Todoinput />
          <Todotab />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Profilecard from '~/components/Profilecard.vue'
import Todoinput from '~/components/Todoinput.vue'
import Myintroduction from '~/components/Myintroduction.vue'
import Todotab from '~/components/Todotab.vue'

export default {
  middleware: 'authenticated',

  layout: 'homelayout',

  components: {
    Profilecard,
    Todoinput,
    Myintroduction,
    Todotab
  },

  data () {
    return {
      checkboxGroup: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      radioState: state => state.todo.radiostate
    })
  },

  mounted () {
    this.$store.dispatch('todo/initTodos')
  }

}
</script>
