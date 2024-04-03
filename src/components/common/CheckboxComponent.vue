<template lang="pug">
label.checkbox(:for='`checkbox-${uid}`')
    input(
        v-model='checked',
        :id='`checkbox-${uid}`',
        :disabled='disabled',
        type='checkbox',
        class='checkbox__input'
        :class='{ "checkbox__input--checked": checked, "checkbox__input--mixed": mixed_internal }'
    )
    span.checkbox__icon
        SvgIconComponent.checkbox__pic(:name='icon', v-if='icon')
</template>

<script>
    import { useUniqueId } from '@/assets/js/uid'
    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'

    export default {
        name: 'CheckboxComponent',
        components: { SvgIconComponent },
        props: {
            model_value: {
                type: Boolean,
                default: false,
            },
            mixed: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['update:model_value'],
        data() {
            return {
                uid: useUniqueId(),
            }
        },
        computed: {
            icon() {
                if (!this.model_value) return null
                if (this.mixed) return 'minus'
                return 'check'
            },
            mixed_internal() {
                return this.model_value && this.mixed
            },
            checked: {
                get() {
                    return this.model_value
                },
                set(newVal) {
                    return this.$emit('update:model_value', newVal)
                },
            },
        },
    }
</script>

<style lang="sass">
    .checkbox
        position: relative
        display: inline-block
        overflow: hidden
        line-height: 0
        font-size: 0
        &__input
            left: 0
            top: 0
            width: 100%
            height: 100%
            z-index: 1
            position: absolute
            cursor: pointer
            opacity: 0
            margin: 0
            padding: 0
            @media (hover: hover)
                &:hover:not(:disabled) ~ .checkbox__icon
                    background-color: var(--concrete)
                    border-color: var(--gray-4)
            &:active:not(:disabled) ~ .checkbox__icon
                border-color: var(--gray-5)
                background-color: var(--gray-3)
            &--checked,
            &--mixed
                & ~ .checkbox__icon
                    border-color: var(--green)
                    background-color: var(--green)
                    color: var(--white)
                @media (hover: hover)
                    &:hover:not(:disabled) ~ .checkbox__icon
                        background-color: var(--green-hover)
                        border-color: var(--green-hover)
                        color: var(--concrete)
                &:active:not(:disabled) ~ .checkbox__icon
                    border-color: var(--green-active)
                    background-color: var(--green-active)
                    color: var(--gray-3)
        &__icon
            width: 19px
            height: 19px
            display: inline-flex
            border-radius: 6px
            align-items: center
            justify-content: center
            border: 1px solid var(--gray)
            background-color: var(--white)
            overflow: hidden
            transition: background-color var(--transition), border-color var(--transition)
        &__pic
            width: 10px
            height: 10px
</style>
