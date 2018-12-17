<template>
  <div class="pagenation-navi">
    <span :key="i" class="icon-circle" :class="{ 'active':i==active }" v-for="i in length"></span>
  </div>
</template>
<style lang="">
  .pagenation-navi{
    width: 100%;
    text-align: center;
    position:absolute;
    bottom: 0;
  }
  .icon-circle{
    display:inline-block;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    background:rgba(255, 255, 255, 0.8);
    transition: all ease-in .3s;
  }
  .icon-circle:last-child{
    margin-right: 0;
  }
  .icon-circle.active{
    background:rgba(0, 0, 0, 0.6);
  }
</style>
<script>
export default {
  name: 'pagenation',
  props: {
    length: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    }
  }
}
</script>
