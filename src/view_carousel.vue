<template>
  <div class="carousel-container">
    <div
      class="carousel-content"
      :style="{
      transform: `translate3d(${transformX}px,0,0)`,
      transition: drag ? 'none' : transition,
      height:`${height}px`
    }"
    >
      <ul class="carousel" :style="{width:`${imgArr.length * 100}%`,height:`${height}px`}">
        <li class="carousel-element">
          <div
            :style="{'width':`${width}px`,'background':`url(${linkList.active.prev.element})`}"
          ></div>
        </li>
        <li class="carousel-element">
          <div :style="{
              'width':`${width}px`,
              'background':`url(${linkList.active.element})`
            }"></div>
        </li>
        <li class="carousel-element">
          <div :style="{
              'width':`${width}px`,
              'background':`url(${linkList.active.next.element})`
            }"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="">
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
  float:left;
  height: 100%;
}
.carousel-container .carousel .carousel-element div{
  width: 100%;
  height: 100%;
}
</style>
<script>
import LinkList from './model/linkMap'
export default {
  props: {
    imgArr: {
      required: true
    },
    speed: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 375
    },
    height: {
      type: Number,
      default: 500
    }
  },
  created () {
    if (this.imgArr.length) {
      let instance = new LinkList()
      this.imgArr.map((v, i) => {
        instance.add(v)
      })
      instance.setActive(0)
      this.linkList = instance
    }
  },
  mounted () {
    this.init()
    this.transformX = -this.width
  },
  methods: {
    init () {
      let arr = this.imgArr
      let ln = arr.length
      let vm = this
      if (ln > 2) {
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
          window.cancelAnimationFrame(vm.raq)
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
    },
    touchmove (diff) {
      let vm = this
      let moved = parseFloat(this.transformX) + Number(diff)
      vm.transformX = moved > this.width ? -this.width : moved
    },
    touchend (diffTime, diff, $container, _diff) {
      let vm = this
      let index
      const WIDTH = window.getComputedStyle(vm.$el, null).getPropertyValue('width')
      if (diffTime < 600) {
        if (diff > 0) {
          index = vm.index === 0 ? this.imgArr.length - 1 : vm.index - 1
        } else {
          index = vm.index + 1 > this.imgArr.length - 1 ? 0 : vm.index + 1
        }
      } else {
        if (Math.abs(_diff) < (WIDTH / 2)) {
          this.transformX = -this.index * this.width
        } else {
          if (diff > 0) {
            index = vm.index === 0 ? this.imgArr.length - 1 : vm.index - 1
          } else {
            index = vm.index + 1 > this.imgArr.length - 1 ? 0 : vm.index + 1
          }
        }
      }
      let spareTime = this.computeTime(_diff)
      let callback = () => {
        vm.index = index
        vm.linkList.setActive(index)
        vm.transformX = -1 * this.width
      }
      if (diff < 0) {
        this.animate(vm.transformX + 2 * this.width, spareTime * 1000, callback)
      } else {
        this.animate(vm.transformX, spareTime * 1000, callback)
      }
    },
    computeTime (diff) {
      let percent = 1 - Math.abs(diff / this.width) < 0.1 ? 0.1 : 1 - Math.abs(diff / this.width)
      return percent
    },
    animate (distance, duration, callback) {
      let vm = this
      let formerX = vm.transformX
      let animateFunc = (time) => {
        if (!vm.raqStartTime) {
          vm.raqStartTime = time
        }
        let diffTime = (time - vm.raqStartTime) / (duration)
        if (diffTime >= 1) {
          window.cancelAnimationFrame(vm.raq)
          callback()
          vm.raq = 0
          vm.raqStartTime = 0
          return
        } else {
          vm.raq = window.requestAnimationFrame(animateFunc)
        }
        vm.transformX = -diffTime * distance + formerX
      }
      vm.raq = window.requestAnimationFrame(animateFunc)
    }
  },
  data () {
    return {
      drag: false,
      transformX: 0,
      transition: '',
      index: 0,
      linkList: null,
      raq: 0,
      raqStartTime: 0
    }
  }
}
</script>
