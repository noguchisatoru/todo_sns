<template>
  <div class="block">
    <b-radio
      v-model="radiostate"
      name="name1"
      native-value="ALL"
    >
      ALL
    </b-radio>
    <b-radio
      v-model="radiostate"
      name="name1"
      native-value="Work"
    >
      Work
    </b-radio>
    <b-radio
      v-model="radiostate"
      name="name1"
      native-value="Buy"
    >
      Buy
    </b-radio>
    <b-radio
      v-model="radiostate"
      name="name1"
      native-value="Enjoy"
    >
      Enjoy
    </b-radio>
    <b-radio
      v-model="radiostate"
      name="name1"
      native-value="Free"
    >
      Free
    </b-radio>
    <b-radio
      v-model="radiostate"
      name="name1"
      native-value="Archive"
    >
      Archive
    </b-radio>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  computed: {
    radiostate: {
      get () {
        // 値を返すときはgettersを指定
        return this.$store.getters['todo/getRadioState']
      },
      set (value) {
        // 値の代入はdispatch()でactionsを呼び出す、もしくはcommit()で直接mutationsを呼び出す
        this.$store.dispatch('todo/commitMessege', value)
      }
    }
  },

  methods: {
  }
}
</script>
