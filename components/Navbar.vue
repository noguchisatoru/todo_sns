<template>
  <b-navbar>
    <template slot="start">
      <b-navbar-item>
        <nuxt-link to="/home">
          Home
        </nuxt-link>
      </b-navbar-item>
      <b-navbar-item>
        <nuxt-link to="/myprofile">
          Myprofile
        </nuxt-link>
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
      <b-navbar-item>
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
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light" @click="logout">
            Log out
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data () {
    return {
      radio: 'Jack'
    }
  },

  methods: {
    async logout () {
      this.$router.push('/')
      await auth().signOut()
      this.$store.dispatch('user/logoutUser')
    }
  }
}
</script>
