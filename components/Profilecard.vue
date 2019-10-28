<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            {{ user.userName }}
          </p>
          <p class="subtitle is-6">
            @{{ user.uId }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }

}
</script>
