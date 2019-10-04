<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        myprofile
      </b-navbar-item>
      <b-navbar-item>
        <b-radio
          v-model="radio"
          name="name"
          native-value="Flint"
        >
          ユーザ名
        </b-radio>
        <b-radio
          v-model="radio"
          name="name"
          native-value="Silver"
        >
          ToDo
        </b-radio>
      </b-navbar-item>
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="name or todo">
          </p>
          <p class="control">
            <button class="button">
              Search
            </button>
          </p>
        </div>
      </div>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light">
            Log out
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      radio: 'Jack'
    }
  }
}
</script>
