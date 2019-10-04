<template>
  <div class="content">
    <b-field label="ToDo">
      <b-input maxlength="100" type="textarea" />
    </b-field>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="block">
          <b-checkbox
            v-model="checkboxGroup"
            native-value="Work"
          >
            Work
          </b-checkbox>
          <b-checkbox
            v-model="checkboxGroup"
            native-value="Enjoy"
          >
            Enjoy
          </b-checkbox>
          <b-checkbox
            v-model="checkboxGroup"
            native-value="Buy"
          >
            Buy
          </b-checkbox>
        </div>
      </div>
      <div class="level-right">
        <b-switch
          v-model="isSwitchedCustom"
          true-value="非公開"
          false-value="公開"
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
      isSwitchedCustom: '公開'
    }
  }
}
</script>
