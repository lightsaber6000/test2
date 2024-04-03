<template lang="pug">
header.header(:class='{ "header--auth": is_authorized }')
    template(v-if='!is_authorized')
        router-link.header__logo(to='/')
            SvgIconComponent.header__logo-icon(name='logo')
            span.visually-hidden Главная страница
        .header__social
            p.text.text--gray.header__social-title Поддержка
            nav.header-social(aria-label='Наши соцсети')
                a.header-social__item(
                    :href='social.link',
                    :class='`header-social__item--${social.name}`',
                    target='_blank',
                    v-for='(social, index) in social_list',
                    :key='`${social}-${index}`',
                    rel='noopener noreferrer'
                )
                    SvgIconComponent.header-social__icon(:name='social.name')
                    span.visually-hidden {{ social.description }}
    template(v-else)
        router-link.header-notification(to='/')
            SvgIconComponent.header-notification__icon(name='notifications')
        .header__auth-wrapper
            button.header__auth(v-click-outside='closeDropdown', @click='toggleDropdown()')
                span.text.text--gray {{ user_data.email }}
                span.button.button--icon
                    SvgIconComponent(name='arrow')
            .header-dropdown(:class='{ "header-dropdown--open": is_dropdown_open }')
                button.button.button--gray.header-dropdown__item(@click='logout()') Выход
</template>

<script>
    import store from '@/store'

    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'

    export default {
        name: 'HeaderComponent',
        components: {
            SvgIconComponent,
        },
        data() {
            return {
                is_dropdown_open: false,
                social_list: [
                    {
                        name: 'telegram',
                        description: 'Мы в Telegram. Откроется в новой вкладке',
                        link: '#',
                    },
                    {
                        name: 'whatsapp',
                        description: 'Мы в Whatsapp. Откроется в новой вкладке',
                        link: '#',
                    },
                ],
            }
        },
        methods: {
            toggleDropdown() {
                this.is_dropdown_open = !this.is_dropdown_open
            },
            closeDropdown() {
                this.is_dropdown_open = false
            },
            logout() {
                this.closeDropdown();
                store.dispatch('setUserLogout')
            },
        },
        computed: {
            user_data() {
                return store.getters.get_user_data || {}
            },
            is_authorized() {
                return !!store.getters.get_user_auth?.token
            },
        },
    }
</script>

<style lang="sass">
    .header
        padding: 40px
        display: flex
        justify-content: space-between
        &__auth-wrapper
            position: relative
        &__auth
            display: flex
            align-items: center
            border: 0
            box-shadow: none
            background-color: transparent
            cursor: pointer
            @media (hover: hover)
                &:hover:not(:disabled)
                    color: var(--dark-blue)
            &:active:not(:disabled)
                color: var(--dark-blue)
        &__social
            display: flex
            align-items: center
        &__logo
            display: block
        &__logo-icon
            width: 243px
            height: 30px
        &__social-title
            margin-right: 10px
        &--auth
            padding: 27px 30px
            justify-content: flex-end
            background-color: var(--white)
            border-bottom: var(--gray-2)
    .header-social
        display: flex
        align-items: center
        &__item
            display: block
            color: var(--dark-blue)
            &:not(:last-child)
                margin-right: 10px
            &--telegram
                @media (hover: hover)
                    &:hover
                        color: var(--social-tg)
                &:active
                    color: var(--social-tg-active)
            &--whatsapp
                @media (hover: hover)
                    &:hover
                        color: var(--social-wp)
                &:active
                    color: var(--social-wp-active)
        &__icon
            width: 30px
            height: 30px
            transition: color var(--transition)
    .header-notification
        color: var(--gray)
        margin-right: 30px
        &__icon
            width: 25px
            height: 25px
            transition: color var(--transition)
    .header-dropdown
        display: none
        position: absolute
        width: 100%
        top: 100%
        left: 0
        border-radius: 6px
        overflow: hidden
        box-shadow: 0 1px 4px 0  rgba(var(--black-rgb), 0.5)
        &__item
            width: 100%
            padding: 8px 20px 7px 20px
            background-color: var(--white)
            box-shadow: none
            border: 0
            text-align: left
            font-weight: 400
            transition: background-color var(--transition)
            &.button
                font-weight: 400
        &--open
            display: block
</style>
