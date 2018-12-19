<template>
  <div
    class="carousel-container"
  >
    <div class="carousel-content"
      :style="{
      transform: `translate(${transformX}px,0) translateZ(0)`,
      height:`${height}px`
    }">
      <ul class="carousel"
      v-if="imgArray.length"
      :style="{width:`${(imgArray.length + 2) * 100}%`}">
        <li class="carousel-element"
            :style="{
              width:`${WIDTH}px`,
              position:'absolute',
              height:`${height}px`,
              left:0
            }"
        >
            <a :href="imgArray[imgArray.length-1].href" class="img-container">
              <FakeImg :src="imgArray[imgArray.length-1].src"
                       :height="height"
                       :width="WIDTH"
              ></FakeImg>
            </a>
        </li>
        <li class="carousel-element"
            :style="{
              width:`${WIDTH}px`,
              position:'absolute',
              left:`${ (index+1) * 100 }%`,
              height:`${height}px`
            }"
            :key="index" v-for="(item,index) in imgArray">
            <a :href="item.href" class="img-container">
             <FakeImg  :src="item.src"
                       :height="height"
                       :width="WIDTH"
              ></FakeImg>
            </a>
        </li>
        <li class="carousel-element"
            :style="{
              width:`${WIDTH}px`,
              position:'absolute',
              height:`${height}px`,
              left:`${ (imgArray.length+1) * 100 }%`
            }"
        >
            <a :href="imgArray[0].href" class="img-container">
              <FakeImg :src="imgArray[0].src"
                       :height="height"
                       :width="WIDTH"
              ></FakeImg>
            </a>
        </li>
      </ul>
    </div>
    <Pagenation
      :length=imgArray.length
      :active=index
    >
    </Pagenation>
  </div>
</template>
<style scoped>
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
import Pagenation from './Pagenation'
import FakeImg from './FakeImg'
export default {
  name: 'carousel',
  components: {
    Pagenation,
    FakeImg
  },
  props: {
    speed: {
      type: Number,
      default: 3000
    },
    initPage: {
      type: Number,
      default: 0
    },
    expect_height: {
      type: Number,
      default: 0
    },
    imgArray: {
      type: Array,
      default: () => {}
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    init () {
      let arr = this.imgArray
      let ln = arr.length
      let vm = this
      if (ln > 2) {
        this.initLength = this.imgArray.length
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
          clearInterval(vm.interval)
        })
        $container.addEventListener('touchmove', function (event) {
          event.stopPropagation()
          if (vm.moving) return
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
            vm.touchend(diffTime, _diff)
          }
          prevPos = movePos = 0
        })
      }
      this.transformX = -this.index * this.WIDTH
    },
    touchstart () {
      clearTimeout(this.loopTimeout)
    },
    touchmove (diff) {
      let moved = parseFloat(this.transformX) + Number(diff)
      this.transformX = moved
    },
    touchend (diffTime, _diff) {
      let vm = this
      let index = vm.index
      const WIDTH = window.getComputedStyle(vm.$el, null).getPropertyValue('width')
      if (diffTime < 600) {
        if (_diff > 0) {
          index -= 1
        } else {
          index += 1
        }
      } else {
        if (Math.abs(_diff) >= (WIDTH / 2)) {
          if (_diff > 0) {
            index -= 1
          } else {
            index += 1
          }
        }
      }
      vm.index = index
      vm.pageTo(index)
      vm.drag = false
      if (this.autoplay) {
        vm.autoStart()
      }
    },
    pageTo (page) {
      let vm = this
      let former = this.transformX
      vm.animate(-page * this.WIDTH - former, () => {
        if (vm.index === 0 || vm.index >= vm.imgArray.length + 1) {
          vm.transformX = -Math.abs(vm.imgArray.length - vm.index) * vm.WIDTH
          vm.index = Math.abs(vm.imgArray.length - vm.index)
        }
      })
      vm.index = page
    },
    autoStart () {
      this.interval = setInterval(() => {
        this.pageTo(this.index + 1)
      }, this.speed)
    },
    animate (distance, callback) {
      let startTime
      let vm = this
      let former = this.transformX
      let animateFunc = (time) => {
        let percent = 0
        if (!startTime) {
          startTime = time
        }
        vm.moving = true
        percent = (time - startTime) / vm.raq.duration
        if (percent >= 1) {
          vm.moving = false
          this.transformX = distance + former
          window.cancelAnimationFrame(vm.raq.timeout)
          vm.$nextTick(callback)
        } else {
          this.transformX = percent * distance + former
          vm.raq.timeout = window.requestAnimationFrame(animateFunc)
        }
      }
      vm.raq.timeout = window.requestAnimationFrame(animateFunc)
    }

  },
  mounted () {
    const WIDTH = parseFloat(window.getComputedStyle(this.$el, null).getPropertyValue('width'))
    this.WIDTH = WIDTH
    this.height = ~~(WIDTH / this.BASE * this.expect_height)
    this.index = this.initPage + 1
    this.init()
    if (this.autoplay) {
      this.autoStart()
    }
  },
  data () {
    return {
      transformX: 0,
      transition: 'all ease-out .3s',
      WIDTH: 0,
      height: 0,
      BASE: 750,
      index: undefined,
      raq: {
        timeout: 0,
        duration: 300
      },
      interval: 0
    }
  }
}
</script>
