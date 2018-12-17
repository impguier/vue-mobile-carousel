<template>
  <div id="app">
    <Carousel
      :initIndex = 0
      :speed = 3000
      :expect_height = 280
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
    Carousel
  },
  data () {
    return {
      imgArray: [
        {
          src: 'https://static.hexindai.com/attachment/uploads/homepic/2018/11/30/1543572816_homepic.png',
          href: '/'
        },
        {
          src: 'https://static.hexindai.com/attachment/uploads/homepic/2018/11/19/1542633499_homepic.png',
          href: '/'
        },
        {
          src: 'https://static.hexindai.com/attachment/uploads/homepic/2018/11/02/1541109562_homepic.png',
          href: '/'
        },
        {
          src: 'https://static.hexindai.com/attachment/uploads/homepic/2018/11/30/1543572582_homepic.png',
          href: '/'
        }
      ]
    }
  }
}
</script>

<style>
body{
  margin: 0
}
a {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
