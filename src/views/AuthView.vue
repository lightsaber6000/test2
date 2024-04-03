<template lang="pug">
.auth
    .auth__container.container
        h1.title-1.auth__title Вход
        FormComponent(ref='formComponent', :in_process='in_process')
            template(#content='{ is_dirty }')
                FieldInputComponent(
                    :form_dirty='is_dirty',
                    :field_options='fields_options.email',
                    v-model:model_value='fields_data.email'
                )
                FieldInputComponent(
                    :form_dirty='is_dirty',
                    :field_options='fields_options.pass',
                    v-model:model_value='fields_data.password'
                )
            template(#additional='{ is_dirty }')
                AlertComponent.auth__alert(
                    tabindex='-1',
                    v-if='is_wrong_credentials && is_dirty',
                    ref='alertComponent'
                ) Неверные учетные данные
            template(#buttons='{ is_filled }')
                button.button(
                    type='button',
                    :class='{ "button--in-process": in_process }',
                    :disabled='in_process || !is_filled',
                    @click='submit()'
                ) Войти
</template>

<script>
    import store from '@/store'
    import router from '@/router'

    import FormComponent from '@/components/common/FormComponent.vue'
    import AlertComponent from '@/components/common/AlertComponent.vue'
    import FieldInputComponent from '@/components/common/field-input/FieldInputComponent.vue'

    export default {
        name: 'AuthView',
        components: {
            FormComponent,
            FieldInputComponent,
            AlertComponent,
        },
        data() {
            return {
                is_wrong_credentials: false,
                in_process: false,
                fields_data: {
                    email: '',
                    password: '',
                },
                fields_options: {
                    email: {
                        name: 'email',
                        title: 'Email',
                        placeholder: 'yourmail@mail.ru',
                        rules: {
                            required: {
                                message: 'Необходимо указать почту',
                            },
                            email: {
                                message: 'Необходимо указать корректный email',
                            },
                        },
                    },
                    pass: {
                        name: 'password',
                        title: 'Пароль',
                        autocomplete: 'off',
                        toggle_visibility_button: true,
                        placeholder: 'Ваш пароль',
                        rules: {
                            required: {
                                message: 'Необходимо указать пароль',
                            },
                        },
                    },
                },
            }
        },
        methods: {
            async submit() {
                const is_valid = this.$refs.formComponent.validate()
                if (!is_valid) {
                    this.$nextTick(() => {
                        const field_wrapper = document.querySelector('.js-field-wrapper-error')
                        const input = document.querySelector('.js-input-error')
                        if (!field_wrapper || !input) return
                        input.focus()
                    })
                    return
                }
                this.in_process = true
                const result = await store.dispatch('setUserAuth', this.fields_data)
                this.in_process = false
                this.is_wrong_credentials = result.status === 401
                if (this.is_wrong_credentials) {
                    this.$nextTick(() => {
                        const alert = this.$refs.alertComponent?.$el
                        if (!alert) return
                        alert.focus()
                    })
                    return
                }
                router.replace({ path: `/` })
            },
        },
    }
</script>

<style lang="sass">
    .auth
        padding-top: 130px
        &__container
            width: 100%
            max-width: 430px
        &__title
            margin-bottom: 20px
        &__alert
            margin-top: 20px
</style>
