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
    this.$store.dispatch('user/initUser')
  },

  methods: {
    async doLogin () {
      try {
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
        const user = await auth().createUserWithEmailAndPassword(this.email, this.password)
        if (user) {
          const userdata = auth().currentUser
          this.$store.dispatch('user/addUser', { userName: this.username, uId: userdata.uid })
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
