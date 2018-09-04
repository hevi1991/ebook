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
    :bookAvailable="bookAvailable"
    :progress="progress"
    @onProgressChange="onProgressChange"
    @jumpTo="jumpTo"
    :navigation="navigation"
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
      // 字体大小
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
      // 主题
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
              background: "#F1ECE2"
            }
          }
        }
      ],
      defaultTheme: 0,
      // 进度滚动
      bookAvailable: false, //图书是否处于可用状态
      progress: 0,
      navigation: null
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
      // 获取Location对象
      // 通过epubjs的钩子函数来实现
      this.book.ready
        .then(() => {
          // 当epub初始完成后，生成locations
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        })
        .then(() => {
          //这个result是epubfti, epub用于定位电子书位置的标识，当result生成了， 即epubjs对象的locations也生成完成了
          this.locations = this.book.locations;
          this.bookAvailable = true; //图书加载完成，转为可用
        });
    },
    prevPage() {
      this.hideTitleAndMenu();
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      this.hideTitleAndMenu();
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
    },
    /**
     * progress 进度条数值(0-100)
     */
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
      this.progress = progress;
    },
    //根据链接跳转到指定位置
    jumpTo(href) {
      this.rendition.display(href);
      this.hideTitleAndMenu();
    },
    hideTitleAndMenu() {
      this.ifTitleAndMenuShow = false;
      // 隐藏菜单弹出的设置栏
      this.$refs.menuBar.hideSetting();
      // 隐藏目录
      this.$refs.menuBar.hideContent();
    }
  },
  mounted() {
    this.showEpub();
    // 给左右加翻页功能
    window.onkeydown = event => {
      switch (event.keyCode) {
        case 37: //←
          this.prevPage();
          break;
        case 39: //→
          this.nextPage();
          break;
        default:
          break;
      }
    };
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