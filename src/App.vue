<template>
  <div id="app">
    <Carousel
      :initIndex = 0
      :speed = 1000
      :height = 400
      :imgArray = imgArray
      :autoplay = true
      ></Carousel>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Carousel from './Carousel'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Carousel
  },
  data () {
    return {
      imgArray: [
        'https://static.hexindai.com/attachment/uploads/homepic/2018/11/30/1543572816_homepic.png',
        'https://static.hexindai.com/attachment/uploads/homepic/2018/11/19/1542633499_homepic.png',
        'https://static.hexindai.com/attachment/uploads/homepic/2018/11/02/1541109562_homepic.png'
      ]
    }
  }
}
</script>

<style>
body{
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
