<template lang="pug">
.loader.js-loader-component(tabindex='-1')
    span.visually-hidden(role='alert', aria-busy='true') Подождите, мы загружаем данные
</template>

<script>
    export default {
        name: 'LoaderComponent',
        mounted() {
            this.$nextTick(() => {
                const loader = document.querySelector('.js-loader-component')
                if (loader) loader.focus()
            })
        },
    }
</script>

<style lang="sass">
    .loader
        position: relative
        height: calc(100vh - 82px)
        overflow: hidden
        outline: none
        flex: 1
        &:after
            content: ''
            position: absolute
            left: 0
            top: 0
            right: 0
            bottom: 0
            background-color: var(--concrete)
            z-index: 95
        &:before
            content: ''
            display: block
            position: absolute
            left: 50%
            top: 50%
            transform: translateY(-50%)
            background-image: url('@/assets/images/loader.svg')
            background-size: 100%
            width: 70px
            height: 70px
            z-index: 96
</style>
