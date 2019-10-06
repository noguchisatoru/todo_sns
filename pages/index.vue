<template>
  <div class="container">
    <div class="has-text-centered">
      <Logo />
    </div>
    <Login />
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
import Logo from '~/components/Logo.vue'
import Login from '~/components/Login.vue'

export default {

  components: {
    Logo,
    Login
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
