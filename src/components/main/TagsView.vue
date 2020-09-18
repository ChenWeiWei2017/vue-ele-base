<template>
  <div>
    <div class="left-page control-btn" @click="turnLeft">
      <i class="el-icon-d-arrow-left" />
    </div>
    <div class="right-page control-btn" @click="turnRight">
      <i class="el-icon-d-arrow-right" />
    </div>
    <div class="active-btn control-btn">
      <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
        <template v-slot:button-content>
          <i class="el-icon-arrow-down tab-action" />
        </template>
        <b-dropdown-item href="#">刷新当前标签页</b-dropdown-item>
        <b-dropdown-item href="#">关闭当前标签页</b-dropdown-item>
        <b-dropdown-item href="#">关闭其它标签页</b-dropdown-item>
        <b-dropdown-item href="#">关闭全部标签页</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="tags-tab">
      <ul class="tab-box" :style="{ left: tabLeft }">
        <li v-for="item in tagViews" :key="item.path" :class="{ fixed: item.fixed, active: item.path === active }" @click="selectTag(item)">
          <b-icon v-if="item.path === '/'" icon="house" />
          <template v-else>
            <span>{{ item.label }}</span>
            <!-- 阻止单击事件继续传播 -->
            <i v-if="!item.fixed" class="close el-icon-close" @click.stop="closeTag(item)" />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsView',
  data() {
    return {
      tabLeft: '0px',
      active: '/',
      tagViews: [
        {
          name: 'home',
          label: '主页',
          path: '/',
          fixed: true
        },
        {
          name: 'user',
          label: '用户管理',
          path: '/user'
        },
        {
          name: 'video',
          label: '视频管理',
          path: '/video'
        },
        {
          name: 'show-page1',
          label: '页面一',
          path: '/show/page1'
        },
        {
          name: 'show-page2',
          label: '页面二',
          path: '/show/page2'
        },
        {
          name: 'show-page3',
          label: '页面三',
          path: '/show/page3'
        }
      ]
    }
  },
  methods: {
    turnLeft() {
      const tags = Array.from(document.querySelectorAll('.tab-box li'))
      const left = Math.abs(Number(this.tabLeft.substring(0, this.tabLeft.length - 2)))
      const tabWidth = this.getTabWidth()
      if (left < tabWidth) {
        this.tabLeft = '0px'
      } else {
        let curLength = 0
        const diff = left - tabWidth
        for (let i = 0; i < tags.length; i++) {
          if (curLength + tags[i].offsetWidth >= diff) {
            this.tabLeft = -(curLength + tags[i].offsetWidth) + 'px'
            break
          }
          curLength += tags[i].offsetWidth
        }
      }
    },
    turnRight() {
      const tags = Array.from(document.querySelectorAll('.tab-box li'))
      const left = Math.abs(Number(this.tabLeft.substring(0, this.tabLeft.length - 2)))
      const tabWidth = this.getTabWidth()
      let curLength = 0
      let shouldLeft = 0
      for (let i = 0; i < tags.length; i++) {
        if (curLength + tags[i].offsetWidth - left > tabWidth) {
          shouldLeft = curLength
          break
        }
        curLength += tags[i].offsetWidth
      }
      if (shouldLeft > 0) {
        this.tabLeft = -shouldLeft + 'px'
      }
    },
    getTabWidth() {
      return document.querySelector('.tab-box').offsetWidth
    },
    selectTag(item) {
      if (item.path !== this.active) {
        // 切换
        this.active = item.path
      }
    },
    closeTag(tag) {
      if (tag.path === this.active) {
        const tagIndex = this.tagViews.findIndex(item => item.path === tag.path)
        if (this.tagViews.length <= 1) {
          this.active = ''
        } else {
          if (tagIndex === this.tagViews.length - 1) {
            this.active = this.tagViews[tagIndex - 1].path
          } else {
            this.active = this.tagViews[tagIndex + 1].path
          }
        }
      }
      this.tagViews.splice(this.tagViews.findIndex(item => item.path === tag.path), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-tags {
    position: relative;

    .control-btn {
      position: absolute;
      top: 0;
      width: 40px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
      -webkit-transition: all .3s;
      box-sizing: border-box;
      border-left: 1px solid #f6f6f6;

      .tab-action {
        color: #2c3e50;
      }

      &:hover {
        background-color: #f6f6f6;
      }
    }

    .left-page {
      left: 0;
      border-left: none;
      border-right: 1px solid #f6f6f6;
    }

    .right-page {
      right: 40px
    }

    .active-btn {
      right: 0
    }

    .tags-tab {
      margin: 0;
      overflow: hidden;
      text-align: left!important;

      .tab-box {
        height: 40px;
        border: none;
        position: relative;
        left: 0;
        white-space: nowrap;
        font-size: 0;
        transition: all .2s;
        -webkit-transition: all .2s;
        margin-bottom: 0;

        li {
          min-width: 0;
          line-height: 40px;
          max-width: 160px;
          text-overflow: ellipsis;
          overflow: hidden;
          border-right: 1px solid #f6f6f6;
          vertical-align: top;
          display: inline-block;
          font-size: 14px;
          transition: all .2s;
          -webkit-transition: all .2s;
          position: relative;
          padding: 0 40px 0 15px;
          text-align: center;
          cursor: pointer;
          list-style: none;

          a {
            text-decoration: none;
            color: #2c3e50;
          }

          &.fixed {
            padding-right: 15px;
          }

          &:hover, &.active {
            background-color: #f6f6f6;

            &::after {
              width: 100%;
            }
          }

          &::after {
            width: 0;
            background-color: #2f4256 !important;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 2px;
            border-radius: 0;
            transition: all .3s;
            -webkit-transition: all .3s;
          }

          [class^="el-icon-"], [class*=" el-icon-"], .b-icon {
            font-size: 16px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .close {
            position: absolute;
            right: 8px;
            top: 50%;
            margin: -7px 0 0;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 50%;
            font-size: 12px;
            display: inline-block;
            text-align: center;
            color: #c2c2c2;
            transition: all .2s;
            -webkit-transition: all .2s;

            &:hover {
              background-color: #FF5722;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .dropdown-menu {

    width: 140px;

    .dropdown-item {
      font-size: 14px;
    }
  }
</style>
