<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <!-- 当字体设置显示时，隐藏阴影 -->
      <div class="menu-wrapper" :class="{'hide-box-shadow': ifSettingShow || !show}" v-show="show">
        <div class="icon-wrapper"><span class="icon icon-list2"></span></div>
        <div class="icon-wrapper"><span class="icon icon-pushpin"></span></div>
        <div class="icon-wrapper"><span class="icon icon-sun" @click="showSetting(1)"></span></div>
        <div class="icon-wrapper"><span class="icon icon-font-size" @click="showSetting(0)"></span></div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="ifSettingShow">
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">T</div>
          <div class="select">
            <div class="select-wrapper" 
            v-for="(item, index) in fontSizeList" 
            :key="index"
            @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}">T</div>
        </div>
        <div class="setting-theme" v-else-if="showTag === 1">
          <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
            <div class="preview" :style="{background: item.style.body.background}" :class="{'no-border': item.style.body.background !== '#fff'}"></div>
            <div class="text" :class="{'selected': index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifSettingShow: false,
      showTag: 0
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number
  },
  methods: {
    showSetting(tag) {
      this.ifSettingShow = true;
      this.showTag = tag;
    },
    hideSetting() {
      this.ifSettingShow = false;
    },
    setFontSize(fontSize) {
      this.$emit('setFontSize', fontSize);
    },
    setTheme(index) {
      this.$emit('setTheme', index);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/global";

.menu-bar {
  .icon {
    cursor: pointer;
  }

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .icon-wrapper {
      flex: 1;
      @include center;
    }

    &.hide-box-shadow {
      box-shadow: none;
    }
  }

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    z-index: 101;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-of-type {
            .line:first-of-type {
              border-top: none;
            }
          }
          &:last-of-type {
            .line:last-of-type {
              border-top: none;
            }
          }

          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0; //表示没有宽度
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-11);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(3);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(25);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
  }
}
</style>