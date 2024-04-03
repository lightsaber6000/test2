<template lang="pug">
form.form(@submit.prevent)
    fieldset.form__fieldset(:disabled='in_process')
        .form__list
            slot(name='content', :is_dirty='is_dirty')
        slot(name='additional', :is_dirty='is_dirty')
    .form__button
        slot(name='buttons', :is_filled='is_filled')
</template>

<script>
    export default {
        name: 'FormComponent',
        props: {
            in_process: {
                type: Boolean,
                default: false,
            },
        },
        provide() {
            return {
                $_form: {
                    validation_obj: this.validation_obj,
                },
            }
        },
        data() {
            return {
                is_dirty: false,
                validation_obj: {},
            }
        },
        computed: {
            is_filled() {
                return Object.values(this.validation_obj).every(({ is_empty }) => !is_empty)
            },
        },
        methods: {
            validate() {
                this.is_dirty = true
                return Object.values(this.validation_obj).every(({ is_valid }) => is_valid)
            },
        },
    }
</script>

<style lang="sass">
    .form
        &__fieldset
            margin-bottom: 40px
</style>
