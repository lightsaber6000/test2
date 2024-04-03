<template lang="pug">
LoaderComponent(v-if='!is_ready')
.product-list(v-else)
    .container.product-list__container
        .product-list__heading
            h1.title-2.product-list__title Мои товары
            SvgIconComponent.product-list__tip(name='question-semibold', title='Текст подсказки')
            p.text.text--gray.product-list__count
                | Выбрано {{ list.length }} из {{ pagination.count }}
        .product-list__desc
            p.text.product-list__text
                | Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
            p.text.product-list__text
                | Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
        .product-list-add
            FormComponent.product-list-add__form(ref='formComponent')
                template(#content)
                    FieldInputComponent(:field_options='fields_options.add', :disabled='true')
                template(#buttons)
                    button.button(type='button', :disabled='true') Добавить
            p.caption.product-list-add__description
                | Например ваши товары:
                a.product-list-add__link(href='#', rel='noopener noreferrer', target='_blank') 119203059,
                a.product-list-add__link(href='#', rel='noopener noreferrer', target='_blank') 124366343,
                a.product-list-add__link(href='#', rel='noopener noreferrer', target='_blank') 59801844,
        ProductTableComponent(:list='list', :in_process='in_process')
        PaginationComponent.product-list__pagination(
            :in_process='in_process',
            :current_page='pagination.page',
            :total_pages='pagination.total_pages',
            @changePage='changePage($event)'
        )
</template>

<script>
    import productGetList from '@/api/product/product-get-list.api.js'

    import LoaderComponent from '@/components/LoaderComponent.vue'
    import FormComponent from '@/components/common/FormComponent.vue'
    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'
    import ProductTableComponent from '@/components/ProductTableComponent.vue'
    import FieldInputComponent from '@/components/common/field-input/FieldInputComponent.vue'
    import PaginationComponent from '@/components/common/pagination/PaginationComponent.vue'

    export default {
        name: 'MainView',
        components: {
            FormComponent,
            SvgIconComponent,
            FieldInputComponent,
            PaginationComponent,
            ProductTableComponent,
            LoaderComponent,
        },
        data() {
            return {
                is_ready: false,
                in_process: false,
                list: [],
                fields_options: {
                    add: {
                        name: 'add',
                        title: 'Добавление товаров',
                        placeholder: 'Введите артикул продавца, артикул WB или ссылку на товар',
                    },
                },
                pagination: {
                    page: 1,
                    limit: 10,
                    offset: 0,
                    count: 0,
                    total_pages: 0,
                },
            }
        },
        async mounted() {
            await this.getList(this.pagination.page)
            this.is_ready = true
        },
        methods: {
            async getList(page) {
                this.in_process = true
                const { data } = await productGetList({
                    limit: this.pagination.limit,
                    offset: this.pagination.limit * (page - 1),
                })
                const { results, count } = data
                this.in_process = false
                this.list = results
                this.pagination.page = page
                this.pagination.count = count
                this.pagination.total_pages = Math.ceil(count / this.pagination.limit)
                return data
            },
            async changePage(page) {
                const { results } = await this.getList(page)
                this.list = results
            },
        },
    }
</script>

<style lang="sass">
    .product-list
        padding-top: 30px
        padding-bottom: 60px
        &__container
            max-width: 1600px
        &__heading
            display: flex
            align-items: center
            margin-bottom: 27px
        &__tip
            width: 25px
            height: 25px
            margin-left: 10px
            transition: color var(--transition)
            @media (hover: hover)
                &:hover
                    cursor: pointer
                    color: var(--green)
        &__desc
            margin-bottom: 30px
        &__pagination
            margin-top: 30px
        &__count
            margin-left: 20px
            margin-top: 6px
        &__text
            &:not(:last-child)
                margin-bottom: 20px
    .product-list-add
        margin-bottom: 30px
        &__form.form
            display: flex
            align-items: flex-end
            max-width: 897px
            .form
                &__fieldset
                    margin-bottom: 0
                    margin-right: 20px
                    flex-grow: 1
        &__description
            margin-top: 4px
        &__link
            display: inline-block
            color: var(--gray)
            text-decoration: none
            border-bottom: 1px dashed var(--gray)
            transition: border-color var(--transition), color var(--transition)
            &:not(:last-child)
                margin-right: 4px
            @media (hover: hover)
                &:hover
                    color: var(--green)
</style>
