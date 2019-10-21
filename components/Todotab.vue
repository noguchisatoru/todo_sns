<template>
  <section>
    <b-tabs type="is-boxed" v-model="activeTab">
      <b-tab-item label="ToDoリスト">
        <Mytodo />
      </b-tab-item>

      <b-tab-item label="おきにいり">
        <Favtodo />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Mytodo from '~/components/Mytodo.vue'
import Favtodo from '~/components/Favtodo.vue'

export default {
  components: {
    Mytodo,
    Favtodo
  },

  data () {
    return {
      activeTab: 0,
      showBooks: false
    }
  }
}
</script>
