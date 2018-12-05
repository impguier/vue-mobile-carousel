<template>
  <div
    class="carousel-container"
  >
    <div class="carousel-content"
      :style="{
      transform: `translateX(${transformX}px)`,
      transition: drag ? 'none' : transition,
      height:`${height}px`
    }">
      <ul class="carousel"
      :style="{width:`${imgArray.length * 100}%`}">
      <li class="carousel-element"
      :style="{width:`${WIDTH}px`}"
      v-if="imgArray.length" :key="index" v-for="(src,index) in imgArray">
        <div class="img-container">
          <img :src="src" alt>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>
<style lang="" scoped>
.carousel-container {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  list-style: none;
}
.carousel-container .carousel {
  list-style: none;
  margin:0;
  padding: 0;
  overflow:hidden
}
.carousel-container .carousel .carousel-element{
  width: 100%;
  float:left;
}
.carousel-container .carousel .img-container{
  width: 100%;
}
.carousel-container .carousel .img-container img{
  width: 100%;
}
</style>
<script>
export default {
  props: {
    placeholderImgSrc: {
      type: String,
      default: ''
    },
    speed: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    imgArray: {
      type: Array,
      default: []
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    beforeSlide: {
      type: Object,
      default: function () {}
    },
    afterSlide: {
      type: Object,
      default: function () {}
    }
  },
  methods: {
    init () {
      let arr = this.imgArray
      let ln = arr.length
      let vm = this
      if (ln > 2) {
        this.initLength = this.imgArray.length
        if(this.loop){
          this.imgArray = [arr[ln - 1]].concat(arr, [arr[0]])
        }
        let $container = this.$el
        let startPos
        let movePos
        let diff
        let prevPos
        let startTime
        let endTime
        $container.addEventListener('touchstart', function (event) {
          event.stopPropagation()
          startPos = event.touches[0].clientX
          startTime = new Date().getTime()
          vm.touchstart()
          vm.drag = true
        })
        $container.addEventListener('touchmove', function (event) {
          event.stopPropagation()
          movePos = event.touches[0].clientX
          if (prevPos) {
            diff = movePos - prevPos
            prevPos = event.touches[0].clientX
          } else {
            prevPos = event.touches[0].clientX
            diff = movePos - prevPos
          }
          vm.touchmove(diff)
        })
        $container.addEventListener('touchend', function (event) {
          event.stopPropagation()
          endTime = new Date().getTime()
          let _diff = movePos - startPos
          let diffTime = startTime - endTime
          if (movePos) {
            vm.drag = false
            vm.touchend(diffTime, diff, $container, _diff)
          }
          prevPos = movePos = 0
        })
      }
      vm.setTranslateX(-this.index * this.WIDTH )
    },
    touchstart () {
      clearTimeout(this.loopTimeout);
    },
    touchmove (diff) {
        let vm = this
        let moved = parseFloat(this.transformX) + Number(diff);
        if(moved > 0){
          moved = 0;
        }
        console.log(moved)
        if(moved < -(this.imgArray.length - 1) * this.WIDTH){
          moved = -(this.imgArray.length - 1) * this.WIDTH
        }
        vm.setTranslateX(moved);
    },
    setTranslateX (moved) {
      this.transformX = moved;
    },
    touchend (diffTime, diff, $container, _diff) {
      let direction
      let vm = this
      const WIDTH = window.getComputedStyle(vm.$el, null).getPropertyValue('width')
      if (diffTime < 600) {
        if (diff > 0) {
          direction = 'Right'
          vm.index = vm.index === 0 ? 0 : vm.index - 1
        } else {
          direction = 'Left'
          vm.index = vm.index === vm.imgArray.length - 1 ? vm.index : vm.index + 1
        }
      } else {
        if (Math.abs(_diff) < (WIDTH / 2)) {
          if (diff > 0) {
            direction = 'Right'
          } else {
            direction = 'Left'
          }
        } else {
          if (diff > 0) {
            direction = 'Right'
            vm.index -= 1
            vm.index = vm.index === 0 ? 0 : vm.index - 1
          } else {
            direction = 'Left'
            vm.index = vm.index === vm.initLength ? vm.index : vm.index + 1
          }
        }
      }
      vm[`to${direction}`]($container, () => {
        if (this.loop) {
          console.log('loooooooop')
        }
      })
    },
    toRight (cb) {
      let width = this.WIDTH
      let $target = this.$el
      let move = 0
      move = this.index * width
      this.transformX = -move
      this.transition = 'all ease-in 1s'
      setTimeout((() => {
        if (!this.index) {
          if (this.loop) {
            this.index = this.initLength
            this.transformX = -this.index * this.WIDTH + 'px'
          }
        }
        if (Object.prototype.toString.call(cb) === '[object Function]') {
          cb()
        }
      }).bind(this), 1000)
    },
    toLeft (cb) {
      let width = this.WIDTH
      let $target = this.$el
      let move = 0
      move = this.index * width
      this.transformX = -move
      this.transition = 'all ease-in 1s'
      setTimeout((() => {
        if (this.index >= this.initLength - 1) {
          if (this.loop) {
            this.index = 1
            this.transformX = -this.index * this.WIDTH + 'px';
          }
        }
        if (Object.prototype.toString.call(cb) === '[object Function]') {
          cb()
        }
      }).bind(this), 1000)
    }
  },
  mounted () {
    const WIDTH = parseFloat(window.getComputedStyle(this.$el, null).getPropertyValue('width'))
    this.WIDTH = WIDTH
    this.init()
  },
  data () {
    return {
      transformX: 0,
      transition: '',
      loopTimeout: 0,
      WIDTH: 0,
      drag:false,
      index:0
    }
  }
}
</script>
