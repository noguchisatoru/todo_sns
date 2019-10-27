<template>
  <section>
    <article v-for="mytodo in tenmytodos(user.uId)" :key="mytodo.uId" class="media">
      <div class="media-content">
        <div class="content" @click="isImageModalActive = true, setTodo(mytodo)">
          <p>
            {{ mytodo.text }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <p>{{ mytodo.tag }}</p>
          </div>
          <div class="level-right">
            <div v-show="mytodo.state === '完了'" class="media-right">
              <b-button type="is-primary" size="is-small" @click="statusChange('アーカイブ',mytodo.documentId)">
                アーカイブ
              </b-button>
            </div>
            <b-dropdown hoverable aria-role="list">
              <button slot="trigger" class="button is-small">
                <span>{{ mytodo.state }}</span>
                <b-icon icon="menu-down" />
              </button>

              <b-dropdown-item aria-role="listitem" @click="statusChange('作業中',mytodo.documentId)">
                作業中
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="statusChange('完了',mytodo.documentId)">
                完了
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="statusChange('予定',mytodo.documentId)">
                予定
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </nav>
      </div>
    </article>
    <b-modal :active.sync="isImageModalActive">
      <div class="card box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>更新前:{{ todo.text }}</p>
              <b-input v-model="text" maxlength="100" type="textarea" />
            </div>
            <nav class="level">
              <div class="level-left" />
              <div class="level-right">
                <p>
                  投稿時：{{ todo.createdAt }}
                </p>
                <b-switch
                  v-model="release"
                  true-value="公開"
                  false-value="非公開"
                >
                  {{ release }}
                </b-switch>
                <b-button @click="todoUpdate(text, release, todo.documentId)">
                  更新
                </b-button>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </b-modal>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isImageModalActive: false,
      release: '公開',
      text: ''
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      todo: state => state.todo.todo,
      todos: state => state.todo.todos
    }),
    ...mapGetters({ tenmytodos: 'todo/tenmytodos',
      todotest: 'todo/todos' })
  },

  mounted () {
    this.$store.dispatch('todo/initTodos')
  },

  methods: {
    ...mapMutations({
      setTodo: 'todo/setTodo'
    }),

    statusChange (status, id) {
      this.$store.dispatch('todo/statusChange', { state: status, documentId: id })
    },

    async todoUpdate (textUpdated, releaseUpdated, id) {
      try {
        dayjs.locale('ja')
        await this.$store.dispatch('todo/todoUpdate', { text: textUpdated, release: releaseUpdated, createdAt: dayjs().format('YYYY/MM/DD/HH:mm:ss'), documentId: id })
        this.isImageModalActive = false
        alert('更新しました')
        this.text = ''
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>
