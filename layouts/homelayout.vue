<template>
  <div class="sf-site-all">
    <Navbar />
    <nuxt class="sf-site-content" />
    <Bottom />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Bottom from '~/components/Bottom.vue'

export default {

  components: {
    Navbar,
    Bottom
  }
}
</script>

<style>
  .sf-site-all {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .sf-site-content {
    flex: 1;
  }
</style>
