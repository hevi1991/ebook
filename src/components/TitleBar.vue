<template>
  <transition name="slide-down">
      <div class="title-wrapper" v-show="show">
        <div class="left">
          <span class="icon icon-arrow-left"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper"><span class="icon icon-cart"></span></div>
          <div class="icon-wrapper"><span class="icon icon-user"></span></div>
          <div class="icon-wrapper"><span class="icon icon-menu"></span></div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/global";

.icon {
  cursor: pointer;
}

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }
}
</style>