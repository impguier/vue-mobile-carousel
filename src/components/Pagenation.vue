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
    width: 10px;
    height: 10px;
    margin-right: 15px;
    background:rgba(255, 255, 255, 0.8);
    transition: all ease-in .3s;
  }
  .icon-circle:last-child{
    margin-right: 0;
  }
  .icon-circle.active{
    width:36px;
    border-radius: 50px;
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
