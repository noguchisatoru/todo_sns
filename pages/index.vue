<template>
  <section class="container">
    <div>
      <Logo />
      <h1 v-if="isActive" class="title">
        ログイン画面
      </h1>
      <h1 v-else class="title">
        新規登録
      </h1>
      <table>
        <tr v-show="!isActive">
          <th>ユーザ名</th>
          <td><input v-model.trim="username" type="text"></td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td><input v-model.trim="email" type="email"></td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td><input v-model.trim="password" type="password"></td>
        </tr>
      </table>
      <div v-if="isActive">
        <button @click="doLogin">
          ログイン
        </button>
        <button @click="changeDisplay">
          新規登録はこちら
        </button>
        <img src="@/assets/google_signin.png" @click="googleLogin">
      </div>
      <div v-else>
        <button @click="addUser">
          新規登録
        </button>
        <button @click="changeDisplay">
          ログインはこちら
        </button>
      </div>
      <Footer />
    </div>
  </section>
</template>

<script>
import { INIT_USER, SET_USERDATA, ADD_USER } from '../store/action-types'
import { auth } from '~/plugins/firebase'
import Logo from '~/components/Logo.vue'
import Footer from '~/components/Footer.vue'

export default {

  components: {
    Logo,
    Footer
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',

      isActive: true
    }
  },

  created () {
    this.$store.dispatch(INIT_USER)
  },

  methods: {
    async doLogin () {
      try {
        const user = await auth().signInWithEmailAndPassword(this.email, this.password)
        if (user) {
          await this.$store.dispatch(SET_USERDATA, auth().currentUser.uid)
          this.$router.push('/home')
        }
      } catch (e) {
        alert(e)
      }
    },

    async addUser () {
      try {
        const user = await auth().createUserWithEmailAndPassword(this.email, this.password)
        if (user) {
          const userdata = auth().currentUser
          this.$store.dispatch(ADD_USER, { userName: this.username, uId: userdata.uid })
          await this.$store.dispatch(SET_USERDATA, userdata.uid)
          alert('登録完了' + userdata.email)
          this.$router.push('/home')
        }
      } catch (e) {
        alert(e)
      }
    },

    async googleLogin () {
      try {
        const googleAuth = await new auth.GoogleAuthProvider()
        if (googleAuth) {
          auth().signInWithPopup(googleAuth).then((result) => {
            this.$router.push('/home')
          })
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

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
