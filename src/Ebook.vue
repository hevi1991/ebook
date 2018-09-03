<template>
  <div class="ebook">
    <title-bar :show="ifTitleAndMenuShow" />
    <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
            <div class="left" @click="prevPage"></div>
            <div class="center" @click="toggleTitleAndMenu"></div>
            <div class="right" @click="nextPage"></div>
        </div>
    </div>
    <!-- 绑定ref -->
    <menu-bar :show="ifTitleAndMenuShow" 
    :fontSizeList="fontSizeList"
    :defaultFontSize="defaultFontSize" 
    @setFontSize="setFontSize"
    :themeList="themeList"
    :defaultTheme="defaultTheme"
    @setTheme="setTheme"
    ref="menuBar" />
  </div>
</template>

<script>
import Epub from "epubjs";
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";

const DOWNLOAD_URL = "/2018_Book_AgileProcessesInSoftwareEngine.epub";
export default {
  data() {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgba(241,236,226)"
            }
          }
        }
      ],
      defaultTheme: 0
    };
  },
  components: {
    TitleBar,
    MenuBar
  },
  methods: {
    // 电子书的解析和渲染 http://epubjs.org/documentation/0.3/#epub
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
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // 渲染主题皮肤（步骤1：注册主题皮肤，步骤2：选择主题皮肤）
      // this.themes.register(name, styles)
      // this.themes.select(name)
      this.registerTheme();
      this.setTheme(this.defaultTheme);
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
      if (this.ifTitleAndMenuShow == false) {
        // 配合组件的ref属性，可以调用子组件的方法
        this.$refs.menuBar.hideSetting();
      }
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
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
}
</style>