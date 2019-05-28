<template>
  <div class="pagenation-navi">
    <span :key="i" class="icon-circle" :class="{ 'active':i==active }" v-for="i in length"></span>
  </div>
</template>
<style scoped>
  .pagenation-navi{
    width: 100%;
    text-align: center;
    position:absolute;
    bottom: 20px;
  }
  .icon-circle{
    display:inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background:rgba(255, 255, 255, 0.8);
    transition: all ease-in .3s;
  }
  .icon-circle:last-child{
    margin-right: 0;
  }
  .icon-circle.active{
    width:60px;
    border-radius: 20px;
    background: #fff;
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
