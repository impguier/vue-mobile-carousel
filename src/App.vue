<template>
  <div id="app">
    <Carousel
      :initPage="0"
      :speed="3000"
      :expect_height="280"
      :imgArray="imgArray"
      :autoplay="true"
      navigator_pos="inner"
      :normalClass="normalClass"
      :activeClass="activeClass"
      @beforeClick=beforeClick
    ></Carousel>
  </div>
</template>

<script>
import Carousel from "./components/Carousel";
export default {
  name: "App",
  components: {
    Carousel
  },
  methods:{
    beforeClick () {
      console.log('clicked')
    }
  },
  data() {
    return {
      normalClass: { background: "#f4f5f6" },
      activeClass: { background: "#fff",width:'0.5rem','border-radius':'5px' },
      imgArray: [
        {
          src: "./static/1.png",
          href: "/"
        },
        {
          src: "./static/2.png",
          href: "/"
        },
        {
          src: "./static/3.png",
          href: "/"
        },
        {
          src: "./static/4.png",
          href: "/"
        }
      ]
    };
  }
};
</script>

<style>
body {
  margin: 0;
}
a {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
