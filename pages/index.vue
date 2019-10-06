<template>
  <div class="container">
    <div class="has-text-centered">
      <Logo />
    </div>
    <Login />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Login from '~/components/Login.vue'

export default {

  components: {
    Logo,
    Login
  }

}
</script>
