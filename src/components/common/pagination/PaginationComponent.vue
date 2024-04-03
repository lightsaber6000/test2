<template lang="pug">
.pagination(v-if='total_pages > 1')
    nav.pagination__nav(aria-label='Пагинация')
        ul.pagination__list
            li.pagination__item.pagination__item_control.pagination__item_prev(v-if='current_page > 1')
                button.button.button--gray.pagination__link.pagination__link_prev(
                    :disabled='in_process',
                    :class='{ "button--in-process": in_process }',
                    @click='toPrevPage()'
                )
                    SvgIconComponent.pagination__icon.pagination__icon--prev(name='arrow')
                    span.visually-hidden Предыдущая страница
            template(v-for='(page, index) in pages', :key='`${uid}-${index}-pagination-item`')
                li.pagination__item(v-if='page === "dummy"', aria-hidden='true')
                    span.button.button--gray.pagination__dummy &hellip;
                li.pagination__item(:class='{ pagination__item_last: index === pages.length - 1 }', v-else)
                    span.button.button--gray.pagination__link.pagination__link_active(
                        v-if='page === current_page',
                        :aria-current='page === current_page ? "page" : null'
                    )
                        span.visually-hidden Страница
                        | {{ page }}
                    button.button.button--gray.pagination__link(
                        v-else,
                        :disabled='in_process',
                        :aria-current='page === current_page ? "page" : null',
                        :class='{ "button--in-process": in_process, pagination__link_active: page === current_page }',
                        @click='toPage(page)'
                    )
                        span.visually-hidden Страница
                        | {{ page }}
            li.pagination__item.pagination__item_control.pagination__item_next(
                v-if='current_page < total_pages'
            )
                button.button.button--gray.pagination__link.pagination__link_next(
                    :disabled='in_process',
                    :class='{ "button--in-process": in_process }',
                    @click='toNextPage()'
                )
                    SvgIconComponent.pagination__icon.pagination__icon--next(name='arrow')
                    span.visually-hidden Следующая страница
</template>

<script>
    import { useUniqueId } from '@/assets/js/uid'
    import GetPageNumbers from '@/components/common/pagination/utils/getPageNumbers'
    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'

    export default {
        name: 'PaginationComponent',
        components: { SvgIconComponent },
        props: {
            in_process: {
                type: Boolean,
                default: false,
            },
            total_pages: {
                type: Number,
                default: 0,
            },
            current_page: {
                type: Number,
                default: 1,
            },
            page_numbers_to_show: {
                type: Number,
                default: 5,
            },
        },
        emits: ['changePage', 'loadMore'],
        data() {
            return {
                uid: useUniqueId(),
            }
        },
        computed: {
            pages() {
                return GetPageNumbers({
                    total_pages: this.total_pages,
                    current_page: this.current_page,
                    page_numbers_to_show: this.page_numbers_to_show,
                })
            },
        },
        methods: {
            toPage(page) {
                if (this.current_page === page) return
                this.$emit('changePage', page)
            },
            toPrevPage() {
                if (this.current_page === 1) return
                this.$emit('changePage', this.current_page - 1)
            },
            toNextPage() {
                if (this.current_page === this.total_pages) return
                this.$emit('changePage', this.current_page + 1)
            },
        },
    }
</script>

<style lang="sass">
    .pagination
        &__nav
            position: relative
        &__list
            display: flex
            justify-content: center
            padding-right: 44px
            padding-left: 44px
        &__link,
        &__dummy
            &.button
                padding: 10px 15px
                min-width: 40px
                min-height: 40px
                text-decoration: none
                display: flex
                align-items: center
                justify-content: center
                font-weight: 400
        &__item
            line-height: 0
            font-size: 0
            &:not(.pagination__item_last, .pagination__item_control)
                margin-right: 4px
            &_control
                position: absolute
            &_prev
                left: 0
            &_next
                right: 0
        &__icon
            width: 25px
            height: 25px
            &--prev
                transform: rotate(90deg)
            &--next
                transform: rotate(-90deg)
        &__link
            &_prev,
            &_next
                &.button
                    padding: 6px
            &_active
                &.button
                    background-color: var(--button-gray-active)
                    &:hover,
                    &:active
                        background-color: var(--button-gray-active)
                        border-color: var(--button-gray-active)
                        color: var(--dark-blue)
</style>
