export default {
    UPDATE_USER_AUTH(state, { access, refresh }) {
        state.auth.token = access
        state.auth.refresh = refresh
    },
    UPDATE_USER_DATA(state, data) {
        state.userData = data
    },
}
