<template lang="pug">
.field
    label.field__label(
        :for='`input-${uid}`',
        v-if='field_options_internal.title',
        v-html='field_options_internal.title'
    )
    .field__inner
        .field__input-wrapper(:class='{ "js-field-wrapper-error": show_error }')
            input.input(
                :class='{ "js-input-error": show_error, "input--small": small, "input--icon": field_options_internal.toggle_visibility_button }',
                v-imask='mask',
                :id='`input-${uid}`',
                :disabled='disabled',
                :value='model_value',
                :placeholder='field_options_internal.placeholder',
                :type='is_visible_internal ? field_options_internal.input_type : "password"',
                :input_mode='field_options_internal.input_mode',
                :max_length='field_options_internal.max_length || false',
                :name='field_options_internal.name',
                :autocomplete='field_options_internal.autocomplete',
                :aria-describedby='`input-error-${uid}`',
                @accept='onAccept',
                @input='onInput',
                @blur='onBlur'
            )
            button.field__password-button.button.button--icon(
                @click='onToggleVisibility()',
                v-if='field_options_internal.toggle_visibility_button'
            )
                SvgIconComponent(:name='is_visible_internal ? "eye" : "eye-closed"')
        slot(name='additional')
        p.field__error(v-if='show_error', :id='`input-error-${uid}`', v-html='error_list[0]')
</template>

<script>
    import { useUniqueId } from '@/assets/js/uid'
    import { IMaskDirective, IMask } from 'vue-imask'
    import validate from '@/components/common/field-input/utils/validate'

    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'

    const field_options_default = {
        name: null,
        title: null,
        preset: null,
        autocomplete: null,
        toggle_visibility_button: false,
        input_type: 'text',
        max_length: 255,
        postfix: null,
        placeholder: null,
        mask: null,
        rules: null,
    }

    export default {
        name: 'FieldInputComponent',
        components: { SvgIconComponent },
        props: {
            model_value: {
                type: [String, Number],
                default: null,
            },
            form_dirty: {
                type: Boolean,
                default: false,
            },
            field_options: {
                type: Object,
                required: true,
                validator(val) {
                    return val.mask == null || val.mask === 'currency'
                },
            },
            small: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        inject: {
            $_form: { default: null },
        },
        emits: ['update:model_value'],
        data() {
            return {
                uid: useUniqueId(),
                is_valid: false,
                is_dirty: false,
                is_visible: false,
                error_list: [],
            }
        },
        mounted() {
            this.validate(this.model_value)
        },
        methods: {
            getFieldName() {
                return `field-${this.field_options_internal.name}-${this.uid}`
            },
            validate(val) {
                if (this.$_form == null) return
                if (this.field_options_internal.rules == null) {
                    this.is_valid = true
                    return
                }
                this.error_list = validate(this.field_options_internal.rules, val)
                this.is_valid = !this.error_list.length
                this.$_form.validation_obj[this.getFieldName()] = {
                    is_valid: this.is_valid,
                    is_empty: !val,
                }
            },
            inputHandler(val) {
                this.validate(val)
                this.$emit('update:model_value', val)
            },
            onInput(e) {
                if (this.field_options.mask) return
                this.inputHandler(e.target.value)
            },
            onAccept(e) {
                if (!this.field_options.mask) return
                const { value } = e.detail
                this.inputHandler(value)
            },
            onBlur() {
                if (!this.is_dirty) this.is_dirty = true
            },
            onToggleVisibility() {
                this.is_visible = !this.is_visible
            },
        },
        computed: {
            field_options_internal() {
                return { ...field_options_default, ...this.field_options }
            },
            is_visible_internal() {
                if (!this.field_options_internal.toggle_visibility_button) return true
                return this.is_visible
            },
            show_error() {
                const is_dirty = this.form_dirty || this.is_dirty;
                return !this.is_valid && is_dirty
            },
            mask() {
                if (!this.field_options.mask) return null
                return {
                    mask: 'num ₽',
                    lazy: false,
                    blocks: {
                        num: {
                            mask: Number,
                            thousandsSeparator: ' ',
                            scale: 0,
                            min: 0,
                            max: 999999999,
                        },
                    },
                }
            },
        },
        beforeUnmount() {
            if (this.$_form == null) return
            delete this.$_form.validation_obj[this.getFieldName()]
        },
        directives: {
            imask: IMaskDirective,
        },
    }
</script>

<style lang="sass">
    .field
        &:not(:last-child)
            margin-bottom: 20px
        &__label
            font-size: 12px
            line-height: 16px
            color: var(--gray)
            display: block
            margin-bottom: 8px
        &__error
            font-size: 15px
            line-height: 25px
            margin-top: 4px
            color: var(--red)
        &__password-button
            position: absolute
            right: 20px
            top: 50%
            transform: translateY(-50%)
        &__input-wrapper
            position: relative
</style>
