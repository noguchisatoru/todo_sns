<template>
  <section>
    <b-tabs v-model="activeTab" type="is-boxed">
      <b-tab-item label="ToDoリスト">
        <Radiobuttons />
        <AllMytodo />
      </b-tab-item>

      <b-tab-item label="おきにいり">
        <Favtodo />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import AllMytodo from '~/components/AllMytodo.vue'
import Favtodo from '~/components/Favtodo.vue'
import Radiobuttons from '~/components/Radiobuttons.vue'

export default {
  components: {
    AllMytodo,
    Favtodo,
    Radiobuttons
  },

  data () {
    return {
      activeTab: 0,
      showBooks: false
    }
  }
}
</script>
