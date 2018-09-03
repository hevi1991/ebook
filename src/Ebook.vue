<template>
  <div class="ebook">
    <transition name="slide-down">
      <div class="title-wrapper" v-show="ifTitleAndMenuShow">
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
    <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
            <div class="left" @click="prevPage"></div>
            <div class="center" @click="toggleTitleAndMenu"></div>
            <div class="right" @click="nextPage"></div>
        </div>
    </div>
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper"><span class="icon icon-list2"></span></div>
        <div class="icon-wrapper"><span class="icon icon-pushpin"></span></div>
        <div class="icon-wrapper"><span class="icon icon-sun"></span></div>
        <div class="icon-wrapper"><span class="icon icon-font-size"></span></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Epub from "epubjs";
const DOWNLOAD_URL = "/2018_Book_AgileProcessesInSoftwareEngine.epub";
export default {
  data() {
    return {
      ifTitleAndMenuShow: false
    };
  },
  methods: {
    // 电子书的解析和渲染
    showEpub() {
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL);
      // 生成Redition
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 通过Rendition.display渲染电子书
      this.rendition.display();
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
      }
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
    }
  },
  mounted() {
    this.showEpub();
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/global";

.ebook {
  position: relative;
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
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .icon-wrapper {
      flex: 1;
      @include center;
    }
  }
}
</style>