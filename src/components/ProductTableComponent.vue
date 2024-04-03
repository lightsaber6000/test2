<template lang="pug">
table.product-table
    thead
        tr.product-table-heading
            th
                CheckboxComponent(
                    :model_value='check_all',
                    :mixed='mix_all',
                    @update:model_value='updateCheckAll($event)'
                )
            th
                p.text.text--gray.product-table-heading__item Фото
            th
                p.text.text--gray.product-table-heading__item Артикул продавца
            th
                p.text.text--gray.product-table-heading__item
                    | Бренд
                    button.button.button--icon
                        SvgIconComponent(name='arrow')
            th
                p.text.text--gray.product-table-heading__item Название
            th
                p.text.text--gray.product-table-heading__item
                    | Остаток, шт.
                    button.button.button--icon
                        SvgIconComponent(name='arrow')
            th
                p.text.text--gray.product-table-heading__item
                    | Текущая цена
                    button.button.button--icon
                        SvgIconComponent(name='arrow')
            th
                p.text.text--gray.product-table-heading__item
                    | Минимальная цена
                    button.button.button--icon
                        SvgIconComponent(name='arrow')
            th
                p.text.text--gray.product-table-heading__item
                    | Максимальная цена
                    button.button.button--icon
                        SvgIconComponent(name='arrow')
            th.text.text--gray Удалить
    tbody
        tr.product-table-action(v-if='checked_count')
            td(colspan='4')
                .product-table-action__counter
                    p.text.product-table-action__counter-text
                        | Выбрано {{ checked_count }} из {{ check_arr.length }}
                    button.button.button--gray.product-table-action__button(@click='removeHighlighted()')
                        SvgIconComponent.product-table-action__button-icon(name='delete-bold-small')
                        | Удалить выделенные
            td(colspan='3') Для всех выделенных
            td
                FieldInputComponent.product-table__field(
                    :field_options='fields_options.price',
                    v-model:model_value='min_price',
                    :small='true',
                    :disabled='in_process'
                )
            td(colspan='2')
                FieldInputComponent.product-table__field(
                    :field_options='fields_options.price',
                    v-model:model_value='max_price',
                    :small='true',
                    :disabled='in_process'
                )
        tr.product-table-item(v-for='(item, index) in list', :key='`row-${index}`')
            td
                CheckboxComponent(
                    :disabled='in_process',
                    :model_value='check_arr[index].val',
                    @update:model_value='updateCheck($event, index)'
                )
            td
                .product-table-item__image
                    img.product-table-item__pic(:src='item.images[0]')
            td
                p.product-table-item__item.product-table-item__item--link
                    a.button.button--icon.product-table-item__button(
                        :href='item.url',
                        target='_blank',
                        rel='noopener noreferrer'
                    )
                        SvgIconComponent(name='link')
                    span {{ item.brand_id }}
            td
                p.product-table-item__item {{ item.brand_name }}
            td
                p.product-table-item__item {{ item.title }}
            td
                p.product-table-item__item {{ toTriades(item.quantity) }}
            td
                p.product-table-item__item {{ toTriades(item.price) }}&nbsp;₽
            td.text
                FieldInputComponent.product-table__field(
                    :field_options='fields_options.price',
                    :model_value='prices_arr[index].min_price',
                    :small='true',
                    :disabled='in_process',
                    @update:model_value='update_min_price($event, index)'
                )
            td.text
                FieldInputComponent.product-table__field(
                    :field_options='fields_options.price',
                    :model_value='prices_arr[index].max_price',
                    :small='true',
                    :disabled='in_process',
                    @update:model_value='update_max_price($event, index)'
                )
            td
                button.button.button--icon
                    SvgIconComponent(name='delete')
</template>

<script>
    import toTriades from '@/assets/js/toTriades'

    import SvgIconComponent from '@/components/common/SvgIconComponent.vue'
    import CheckboxComponent from '@/components/common/CheckboxComponent.vue'
    import FieldInputComponent from '@/components/common/field-input/FieldInputComponent.vue'

    export default {
        name: 'ProductTableComponent',
        components: {
            SvgIconComponent,
            CheckboxComponent,
            FieldInputComponent,
        },
        props: {
            in_process: {
                type: Boolean,
                default: false,
            },
            list: {
                type: Array,
                default: [],
            },
        },
        data() {
            return {
                check_arr: [],
                prices_arr: [],
                mix_all: false,
                check_all: false,
                min_price: '',
                max_price: '',
                fields_options: {
                    price: {
                        name: 'price',
                        placeholder: '₽',
                        mask: 'currency',
                    },
                },
            }
        },
        methods: {
            toTriades(...args) {
                return toTriades(...args)
            },
            resetChecks() {
                this.check_all = false
                this.mix_all = false
            },
            updateCheckAll(val) {
                this.check_all = val
                this.mix_all = false
                if (val) {
                    this.check_arr = this.check_arr.map((el) => ({ ...el, val: true }))
                    return
                }
                this.check_arr = this.check_arr.map((el) => ({ ...el, val: false }))
            },
            updateCheck(val, index) {
                this.check_arr[index] = { ...this.check_arr[index], val }
                if (!val) {
                    this.mix_all = true
                    if (this.check_arr.every(({ val }) => !val)) {
                        this.mix_all = false
                        this.check_all = false
                    }
                    return
                }
                this.check_all = true
                this.mix_all = !this.check_arr.every(({ val }) => val)
            },
            update_min_price(val, index) {
                this.prices_arr[index].min_price = val
            },
            update_max_price(val, index) {
                this.prices_arr[index].max_price = val
            },
            getCheckedIndexes(getNum = false) {
                return this.check_arr.reduce((result, { val, index }) => {
                    if (val) result.push(getNum ? index + 1 : index)
                    return result
                }, [])
            },
            removeHighlighted() {
                const arr = this.getCheckedIndexes(true)
                console.log(`Удалены элементы: ${arr}`)
            },
            updateCheckedPrices(valueName, value) {
                const indexes = this.getCheckedIndexes()
                indexes.forEach((index) => {
                    this.prices_arr[index][valueName] = value
                })
            },
        },
        computed: {
            checked_count() {
                return this.check_arr.reduce((result, { val }) => {
                    if (val) result += 1
                    return result
                }, 0)
            },
        },
        watch: {
            min_price(newVal) {
                this.updateCheckedPrices('min_price', newVal)
            },
            max_price(newVal) {
                this.updateCheckedPrices('max_price', newVal)
            },
            list: {
                handler(newVal) {
                    if (!newVal.length) return
                    this.check_arr = newVal.map((el, index) => ({ val: false, index }))
                    this.prices_arr = newVal.map(() => ({ min_price: null, max_price: null }))
                },
                immediate: true,
            },
        },
    }
</script>

<style lang="sass">
    .product-table
        width: 100%
        table-layout: fixed
        th
            padding-top: 17px
            padding-bottom: 18px
            padding-right: 10px
            position: relative
        td
            padding-top: 4px
            padding-bottom: 5px
            padding-right: 20px
        th,
        td
            text-align: left
            vertical-align: middle
            border-bottom: 1px solid var(--gray-2)
            &:nth-child(1)
                padding-left: 3px
                width: 2.960526316%
            &:nth-child(2)
                width: 4.605263158%
            &:nth-child(3)
                width: 10.657894737%
            &:nth-child(4)
                width: 9.539473684%
            &:nth-child(5)
                width: 25%
            &:nth-child(6)
                width: 8.947368421%
            &:nth-child(7)
                width: 9.473684211%
            &:nth-child(8)
                width: 12.631578947%
            &:nth-child(9)
                width: 12.434210526%
            &:nth-child(10)
                width: 3.75%
        &__field
            .field__input-wrapper
                max-width: 134px
    .product-table-heading
        &__item
            display: flex
            align-items: center
    .product-table-item
        &__image
            width: 50px
            height: 50px
        &__pic
            width: 100%
            height: 100%
            object-fit: cover
        &__item
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            &--link
                display: flex
                align-items: center
                .svg-icon
                    margin-top: -4px
        &__button
            margin-right: 4px
    .product-table-action
        td
            background-color: var(--gray-6)
            padding-top: 15px
            padding-bottom: 15px
            &:nth-child(1)
                padding-left: 20px
            &:nth-child(2)
                text-align: right
        &__counter
            display: flex
            align-items: center
        &__counter-text
            margin-right: 10px
        &__button
            position: relative
            &-icon
                position: absolute
                top: 7px
                left: 10px
                width: 15px
                height: 15px
            &.button
                padding: 7px 12px 8px 33px
</style>
