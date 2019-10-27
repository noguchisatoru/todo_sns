<template>
  <section>
    <b-tabs v-model="activeTab" type="is-boxed">
      <b-tab-item label="ToDoリスト">
        <Radiobuttons />
        <Allmytodo />
      </b-tab-item>

      <b-tab-item label="おきにいり">
        <Favtodo />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Allmytodo from '~/components/Allmytodo.vue'
import Favtodo from '~/components/Favtodo.vue'
import Radiobuttons from '~/components/Radiobuttons.vue'

export default {
  components: {
    Allmytodo,
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
