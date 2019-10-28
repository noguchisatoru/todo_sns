export default function ({ store, redirect }) {
  const loginUser = store.getters['user/user']
  if (!loginUser) {
    return redirect('/')
  }
}
