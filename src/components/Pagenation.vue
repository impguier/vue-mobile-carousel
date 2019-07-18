<template>
  <div
    class="pagenation-navi"
    :class="{'inner':navigator_pos == 'inner','outer':navigator_pos == 'outer'}"
  >
    <span :key="i" class="icon-circle" :style="i==active ? activeClass : normalClass" v-for="i in length"></span>
  </div>
</template>
<style scoped>
.pagenation-navi {
  width: 100%;
  text-align: center;
}
.pagenation-navi.inner {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
}
.pagenation-navi.outer {
  margin-top: 20px;
}
.icon-circle {
  display: inline-block;
  border-radius: 100%;
  width: 10px;
  height: 10px;
  margin-right: 15px;
  background: rgba(255, 255, 255, 0.8);
  transition: all ease-in 0.3s;
}
.icon-circle:last-child {
  margin-right: 0;
}
</style>
<script>
export default {
  name: "pagenation",
  props: {
    length: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    },
    navigator_pos: {
      type: String,
      default: "inner"
    },
    normalClass:{
      type:Object,
      default:()=>{
        return {
          'background': 'rgba(255, 255, 255, 0.8)'
        }
      }
    },
    activeClass:{
      type:Object,
      default:()=>{
        return {
          'width': '0.5rem',
          'border-radius': '5px',
          'background': '#fff'
        }
      }
    }
  }
};
</script>
