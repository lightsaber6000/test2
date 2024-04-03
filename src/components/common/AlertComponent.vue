<template lang="pug">
.alert
    SvgIconComponent.alert__icon(aria-hidden='true', name='error')
    .text.alert__text
        slot
</template>

<script>
    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'

    export default {
        name: 'AlertComponent',
        components: {
            SvgIconComponent,
        },
    }
</script>

<style lang="sass">
    .alert
        position: relative
        padding: 20px 20px 20px 60px
        background-color: rgba(var(--red-rgb), 0.08)
        border-radius: 6px
        &__icon
            position: absolute
            left: 20px
            top: 17px
            width: 25px
            height: 25px
            color: var(--red)
</style>
