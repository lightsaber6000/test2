<template lang="pug">
svg.svg-icon(aria-hidden='true')
    title(v-if='title') {{ title }}
    use(v-if='name', :xlink:href='`/__spritemap#sprite-${name}`')
</template>

<script>
    export default {
        name: 'SvgIconComponent',
        props: {
            name: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: null,
            },
        },
    }
</script>

<style lang="sass">
    .svg-icon
      width: 100%
      height: 100%
</style>
