<template lang="pug">
.app
    HeaderComponent
    main.app__main
        router-view.app__view(v-slot='{ Component }')
            transition(name='fade', mode='out-in')
                component(:is='Component')
</template>

<script>
    import HeaderComponent from '@/components/HeaderComponent.vue'

    export default {
        name: 'AppPage',
        components: { HeaderComponent },
    }
</script>

<style lang="sass">
    .fade-enter
      opacity: 0
    .fade-enter-active
      transition: opacity 0.5s
      opacity: 1

    .fade-leave
      opacity: 1
    .fade-leave-active
      transition: opacity 0.5s
      opacity: 0
</style>
