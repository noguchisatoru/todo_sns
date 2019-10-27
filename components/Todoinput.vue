<template>
  <div class="content box">
    <b-field label="ToDo">
      <b-input v-model="text" maxlength="100" type="textarea" />
    </b-field>
    <div class="level is-mobile columns">
      <div class="level-left column">
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
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { mapState, mapGetters } from 'vuex'
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
    }),
    ...mapGetters({
      todonumber: 'todo/todonumber'
    })
  },

  created () {
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
    async addTodo () {
      try {
        dayjs.locale('ja')
        const userdata = auth().currentUser
        await this.$store.dispatch('todo/addTodo', { documentId: this.todonumber, todoAuthor: this.user.userName, userId: userdata.uid, text: this.text, createdAt: dayjs().format('YYYY/MM/DD/HH:mm:ss'), tag: this.radio, release: this.release })
        alert('投稿しました')
        this.text = ''
      } catch (e) {
        alert(e)
      }
    }

  }
}
</script>
