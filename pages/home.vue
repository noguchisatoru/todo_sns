<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-5 is-vertical is-parent">
        <div class="tile is-child box">
          <Profilecard />
          <div class="tile is-child box">
            <p class="title">
              MyToDo
            </p>
            <Mytodo />
            <div>
              <Morebutton />
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-vertical is-parent">
        <div class="tile is-child">
          <Todoinput />
          <Todoarticle />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Profilecard from '~/components/Profilecard.vue'
import Mytodo from '~/components/Mytodo.vue'
import Todoinput from '~/components/Todoinput.vue'
import Todoarticle from '~/components/Todoarticle.vue'
import Morebutton from '~/components/Morebutton.vue'

export default {
  middleware: 'authenticated',

  layout: 'homelayout',

  components: {
    Profilecard,
    Mytodo,
    Todoinput,
    Todoarticle,
    Morebutton
  },

  data () {
    return {
      checkboxGroup: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },

  mounted () {
    this.$store.dispatch('todo/initTodos')
    this.$store.dispatch('favorite/initFavorites', this.user.uId)
  }

}
</script>
