<template>
    <section>
  <article class="media" @click="isImageModalActive = true">
    <div class="media-content">
      <div class="content">
        <p>
          Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <p>tag</p>
        </div>
        <div class="level-right">
          <b-dropdown aria-role="list">
            <button slot="trigger" class="button is-small">
              <span>Click me!</span>
              <b-icon icon="menu-down" />
            </button>

            <b-dropdown-item aria-role="listitem">
              Action
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              Another action
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              Something else
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </nav>
    </div>
  </article>
   <b-modal :active.sync="isImageModalActive">
      <p class="is-4by3">
        mytodo
      </p>
    </b-modal>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isImageModalActive: false
    }
  }
}
</script>
