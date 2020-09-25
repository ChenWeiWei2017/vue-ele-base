<template>
  <div>
    <div class="left-page control-btn" @click="turnLeft">
      <i class="el-icon-d-arrow-left" />
    </div>
    <div class="right-page control-btn" @click="turnRight">
      <i class="el-icon-d-arrow-right" />
    </div>
    <div class="active-btn control-btn">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <b-icon icon="chevron-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="refresh">刷新当前标签页</el-dropdown-item>
          <el-dropdown-item command="close">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item command="closeOther">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭全部标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="tags-tab">
      <ul class="tab-box" :style="{ left: tabLeft + 'px' }">
        <li v-for="item in tagViews" :key="item.path" :class="{ fixed: item.meta.affix, active: item.path === active }" @click="selectTag(item)">
          <b-icon v-if="item.path === '/' || item.path === '/home'" icon="house" />
          <template v-else>
            <span>{{ item.meta.title }}</span>
            <!-- 阻止单击事件继续传播 -->
            <i v-if="!item.fixed" class="close el-icon-close" @click.prevent.stop="closeTag($event, item)" />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import path from 'path'

export default {
  name: 'TagsView',
  data() {
    return {
      tabLeft: 0,
      active: '',
      affixTags: []
    }
  },
  computed: {
    ...mapState({
      tagViews: state => state.tab.tagList,
      routes: state => state.permission.routes
    })
  },
  watch: {
    active: {
      handler(val) {
        if (val && val !== '') {
          this.$router.push(val)
        } else {
          this.$router.push('/')
        }
      }
    },
    $route: {
      handler() {
        this.addTags()
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  created() {
    if (this.tagViews && this.tagViews.length) {
      this.active = this.tagViews[0].path
    }
  },
  methods: {
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tab/addTag', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tab/addTag', this.$route)
        this.active = this.$route.path
        this.$nextTick(() => {
          const activeTag = document.querySelector('.tab-box li.active')
          const leftBtn = document.querySelector('.left-page')
          const rightBtn = document.querySelector('.right-page')
          if (activeTag.getBoundingClientRect().right > rightBtn.getBoundingClientRect().left) {
            this.tabLeft -= activeTag.getBoundingClientRect().right - rightBtn.getBoundingClientRect().left
          } else if (activeTag.getBoundingClientRect().left < leftBtn.getBoundingClientRect().right) {
            this.tabLeft += leftBtn.getBoundingClientRect().right - activeTag.getBoundingClientRect().left
          }
        })
      }
      return false
    },
    handleCommand(command) {
      switch (command) {
        case 'refresh':
          this.refreshCurrentTag()
          break
        case 'close':
          this.closeCurrentTag()
          break
        case 'closeOther':
          this.closeOtherTags()
          break
        case 'closeAll':
          this.closeAllTags()
          break
      }
    },
    refreshCurrentTag() {
      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    },
    closeCurrentTag() {
      // 根据active判断当前tag，如果不为空且非fixed，调用this.closeTag()
      const tags = this.tagViews.filter(item => item.path === this.active && (!item.meta || !item.meta.affix))
      if (tags && tags.length) {
        const curTag = tags[0]
        // 如果标签为最后一个，判断是否要翻页
        const tagIndex = this.tagViews.findIndex(item => item.path === curTag.path)
        if (this.tagViews.length <= 1) {
          this.active = ''
        } else {
          if (tagIndex === this.tagViews.length - 1) {
            const curTagElement = document.querySelector('.tab-box li.active')
            const leftBtn = document.querySelector('.left-page')
            if (Math.round(curTagElement.getBoundingClientRect().left) === Math.round(leftBtn.getBoundingClientRect().right)) {
              this.turnLeft()
            }
            this.active = this.tagViews[tagIndex - 1].path
          } else {
            this.active = this.tagViews[tagIndex + 1].path
          }
        }
        this.$store.dispatch('tab/delTag', curTag.path)
      }
    },
    closeOtherTags() {
      this.$store.dispatch('tab/delOtherTag', this.active).then(() => {
        this.tabLeft = 0
      })
    },
    closeAllTags() {
      this.$store.dispatch('tab/delAllTag').then(fixedTags => {
        if (fixedTags && fixedTags.length) {
          this.active = fixedTags[fixedTags.length - 1].path
        } else {
          this.active = ''
        }
        this.tabLeft = 0
      })
    },
    turnLeft() {
      const tags = Array.from(document.querySelectorAll('.tab-box li'))
      const left = Math.abs(this.tabLeft)
      const tabWidth = this.getTabWidth()
      if (left < tabWidth) {
        this.tabLeft = 0
      } else {
        let curLength = 0
        const diff = left - tabWidth
        for (let i = 0; i < tags.length; i++) {
          if (curLength + tags[i].offsetWidth >= diff) {
            this.tabLeft = -(curLength + tags[i].offsetWidth)
            break
          }
          curLength += tags[i].offsetWidth
        }
      }
    },
    turnRight() {
      const tags = Array.from(document.querySelectorAll('.tab-box li'))
      const left = Math.abs(this.tabLeft)
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
        this.tabLeft = -shouldLeft
      }
    },
    getTabWidth() {
      return document.querySelector('.tab-box').offsetWidth
    },
    selectTag(item) {
      if (item.path !== this.active) {
        this.active = item.path
      }
    },
    closeTag(event, tag) {
      const tagIndex = this.tagViews.findIndex(item => item.path === tag.path)
      // 如果所关闭的标签是当前页最后一个元素且前一页还有元素，则往前翻页
      if (tagIndex === this.tagViews.length - 1) {
        const curTag = event.target.parentElement
        const leftBtn = document.querySelector('.left-page')
        if (Math.round(curTag.getBoundingClientRect().left) === Math.round(leftBtn.getBoundingClientRect().right)) {
          this.turnLeft()
        }
      }

      if (tag.path === this.active) {
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
      // this.tagViews.splice(tagIndex, 1)
      this.$store.dispatch('tab/delTag', tag.path)
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
      width: 100%;
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
