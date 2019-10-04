<template>
  <div class="content box">
    <b-field label="ToDo">
      <b-input maxlength="100" type="textarea" />
    </b-field>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="block">
          <b-radio
            v-model="radio"
            name="name"
            native-value="Work"
          >
            Work
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Buy"
          >
            Buy
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Enjoy"
          >
            Enjoy
          </b-radio>
          <b-radio
            v-model="radio"
            name="name"
            native-value="Free"
          >
            Free
          </b-radio>
        </div>
      </div>
      <div class="level-right">
        <b-switch
          v-model="isSwitchedCustom"
          true-value="公開"
          false-value="非公開"
        >
          {{ isSwitchedCustom }}
        </b-switch>
        <b-button>投稿</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSwitchedCustom: '公開',
      radio: 'Free'
    }
  }
}
</script>
