<template>
  <form action="">
    <div>
      <section class="columns">
        <div class="column" />
        <div class="column">
          <p v-if="isActive" class="title">
            Login画面
          </p>
          <p v-else class="title">
            新規登録
          </p>
          <b-field v-show="!isActive" label="Name">
            <b-input
              v-model.trim="username"
              placeholder="Your name"
              value=""
            />
          </b-field>

          <b-field label="Email">
            <b-input
              v-model.trim="email"
              type="email"
              placeholder="Your email"
              required
            />
          </b-field>

          <b-field label="Password">
            <b-input
              v-model.trim="password"
              type="password"
              password-reveal
              placeholder="Your password"
              required
            />
          </b-field>

          <b-checkbox>Remember me</b-checkbox>
          <div v-if="isActive">
            <button class="button" type="button" @click="doLogin">
              Login
            </button>
            <button class="button is-primary" @click="changeDisplay">
              新規登録はこちら
            </button>
            <img src="@/assets/google_signin.png" @click="googleLogin">
          </div>
          <div v-else>
            <button class="button" type="button" @click="addUser">
              新規登録
            </button>
            <button class="button is-primary" @click="changeDisplay">
              Loginはこちら
            </button>
            <img src="@/assets/google_signin.png" @click="googleLogin">
          </div>
        </div>
        <div class="column" />
      </section>
    </div>
  </form>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { mapMutations } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {

  data () {
    return {
      username: '',
      email: '',
      password: '',

      isActive: true
    }
  },

  created () {
    this.$store.dispatch('user/initUser')
  },

  methods: {
    ...mapMutations({
      setTodo: 'todo/setTodo'
    }),
    async doLogin () {
      try {
        this.setTodo(0)
        const user = await auth().signInWithEmailAndPassword(this.email, this.password)
        if (user) {
          await this.$store.dispatch('user/setUserdata', auth().currentUser.uid)
          this.$router.push('/home')
        }
      } catch (e) {
        alert(e)
      }
    },

    async addUser () {
      try {
        dayjs.locale('ja')
        const user = await auth().createUserWithEmailAndPassword(this.email, this.password)
        if (user) {
          const userdata = auth().currentUser
          this.$store.dispatch('user/addUser', { userName: this.username, uId: userdata.uid, createdAt: dayjs().format('YYYY/MM/DD/HH:mm:ss') })
          await this.$store.dispatch('favorite/setFavorite', userdata.uid)
          await this.$store.dispatch('user/setUserdata', userdata.uid)
          alert('登録完了' + userdata.email)
          this.$router.push('/home')
        }
      } catch (e) {
        alert(e)
      }
    },

    async googleLogin () {
      try {
        this.setTodo(0)
        const googleAuth = new auth.GoogleAuthProvider()
        const googleUser = await auth().signInWithPopup(googleAuth)
        if (googleUser) {
          const googleData = auth().currentUser
          await this.$store.dispatch('user/addUser', { userName: googleData.displayName, uId: googleData.uid })
          this.$router.push('/home')
        }
      } catch (e) {
        alert(e)
      }
    },

    changeDisplay () {
      this.isActive = !this.isActive
    }
  }
}
</script>
