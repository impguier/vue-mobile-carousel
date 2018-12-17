<template>
  <img :src="`${initSrc}/${width}x${height}.png?text=Loading`" v-on:load.once="setTrueSrc" alt="">
</template>
<style lang="">
  img{
    display:block;
    width: 100%;
    height: 100%;
    border:none
  }
</style>
<script>
export default {
  name: 'fakeimg',
  props: {
    src: {
      type: String,
      default: '',
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0,
      required: true
    },
    height: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    setTrueSrc () {
      this.$el.src = this.src
    }
  },
  data () {
    return {
      initSrc: 'https://via.placeholder.com'
    }
  }
}
</script>
