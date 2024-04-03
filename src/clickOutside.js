import vClickOutside from 'v-click-outside'

const { bind, unbind } = vClickOutside.directive

export default {
    install(app) {
        app.directive('click-outside', {
            mounted(el, bindling) {
                bind(el, { value: bindling.value })
            },
            beforeUnmount(el) {
                unbind(el)
            },
        })
    },
}
