<template>
  <div class="content box">
    <b-field label="ToDo">
      <b-input v-model="text" maxlength="100" type="textarea" />
    </b-field>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="block">
          <b-radio
            v-model="radio"
            name="name"
            native-value="Work"
          >
            Work
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Buy"
          >
            Buy
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Enjoy"
          >
            Enjoy
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Free"
          >
            Free
          </b-radio>
        </div>
      </div>
      <div class="level-right">
        <b-switch
          v-model="release"
          true-value="公開"
          false-value="非公開"
        >
          {{ release }}
        </b-switch>
        <b-button @click="addTodo">
          投稿
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  data () {
    return {
      text: '',
      release: '公開',
      radio: 'Free'
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },

  created () {
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
    async addTodo () {
      try {
        const userdata = auth().currentUser
        await this.$store.dispatch('todo/addTodo', { todoAuthor: this.user.userName, userId: userdata.uid, text: this.text, createdAt: 'a', tag: this.radio, release: this.release })
        alert('投稿しました')
        this.text = ''
      } catch (e) {
        alert(e)
      }
    }

  }
}
</script>
