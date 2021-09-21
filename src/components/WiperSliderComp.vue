<template>
  <div class="wipe-handler" id="wipe-handler">
    <div class="handler-container" :style="{backgroundColor:containerColor}" id="left" @click="handlerSlide">
      <div class="handler" id="go-left" :style="{borderColor: handlerColor}"></div>
    </div>
    <div class="handler-container" :style="{backgroundColor:containerColor}" id="right" @click="handlerSlide">
      <div class="handler" id="go-right" :style="{borderColor: handlerColor}"></div>
    </div>
  </div>
</template>

<script>
export default {
props:{
    containerColor:String,handlerColor:String
}

};
</script>

<style lang ="scss" scoped>
.wipe-handler {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  .handler-container {
    pointer-events: fill;
    height: 100%;
    width: calc((100% - 29vw * 3 - 10px) / 2);
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    position: relative;
  }
  div.handler {
    --handler-side: calc(100vw * 0.04);
    width: var(--handler-side);
    height: var(--handler-side);
    border-top: 3px solid white;
    border-left: 3px solid white;
    position: absolute;
    pointer-events: none;
  }
  div.handler#go-left {
    transform: translate(-15%, -50%) rotate(-45deg);
    top: 50%;
    left: 50%;
  }
  div.handler#go-right {
    top: 50%;
    left: 0%;
    transform: translate(-10%, -50%) rotate(135deg);
    /* margin: auto 45% auto auto; */
  }
}
</style>