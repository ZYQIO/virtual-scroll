<template>
  <div class="continaer" ref="itemBox" @scroll.passive="scrollHandle">
    <div
      :style="{
        paddingTop: topFillHeight + 'px',
        paddingBottom: bottomFillHeight + 'px'
      }"
    >
      <div class="item" v-for="item in reallyDataList" :key="item.title">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
           
<script>
export default {
  name: 'VirtualScroll',
  props: {
    oneHeight: {
      type: Number,
      default: 100
    },
    url: {
        type: String,
        default: ''
    },
    query: {
        type: Object,
        default: () => ({ num: 0 })
    }
  },
  data() {
    return {
      list: [],

      // 容器最大的容积
      containSize: 0,
      // 记录当前滚动的第一个元素的索引
      startIndex: 0,
      // 记录当前有效的滚动状态
      isScrolStatus: true,
      // 记录当前滚动的距离顶部的位移
      currentScrollTop: 0
    }
  },
  computed: {
    // 容器最后一个元素的索引
    endIndex() {
      // 优化快速滚动时加载数据需要时间造成的白屏问题
      // 解决思路: 轮播图, 留两屏幕的数据,
      let endIndex = this.startIndex + this.containSize * 2

      // 如果滚动到最后一个元素时, 避免滚动出去
      // 与返回顶部封装动画思路相同
      if (!this.list[endIndex]) {
        return (endIndex = this.list.length - 1)
      }

      return endIndex
    },
    // 定义一个真正展示的数组列表元素
    reallyDataList() {
      // 优化快速滚动时加载数据需要时间造成的白屏问题
      // 解决思路: 轮播图
      let startIndex = 0
      if (this.startIndex <= this.containSize) {
        startIndex = 0
      } else {
        startIndex = this.startIndex - this.containSize
      }

      return this.list.slice(startIndex, this.endIndex)
    },

    // 定义顶部填充的高度
    topFillHeight() {
      // // 当前索引乘以每一个元素的高度
      // return this.startIndex * this.oneHeight

      // 优化快速滚动时加载数据需要时间造成的白屏问题
      // 解决思路: 轮播图
      let startIndex = 0
      if (this.startIndex <= this.containSize) {
        startIndex = 0
      } else {
        startIndex = this.startIndex - this.containSize
      }

      // 当前索引乘以每一个元素的高度
      return startIndex * this.oneHeight
    },
    // 定义底部填充的高度
    bottomFillHeight() {
      return (this.list.length - this.endIndex) * this.oneHeight
    }
    // // 定义空白填充的样式
    // blandFillStyle() {
    //   return {
    //     paddingTop: this.startIndex * this.oneHeight,
    //     paddingBottom: (this.list.length - this.endIndex) * this.oneHeight
    //   }
    // }
  },
  async mounted() {
    let data = await this.getList(this.query.num)

    if (data) {
      this.list = data
    }

    this.getContainSize()

    window.onresize = this.getContainSize

    window.onorientationchange = this.getContainSize
  },
  // 路由记录使用到keep alive 的时候, 调用生命周期方法, 还原滚动到的位置
  activated() {
    this.$nextTick(() => {
      this.$refs.itemBox.scrollTop = this.currentScrollTop
    })
  },
  methods: {
    // 定义滚动事件行为
    scrollHandle() {
      if (this.isScrolStatus) {
        this.isScrolStatus = false

        this.setScrollData()

        // 优化滚动事件, 减缓事件监听频率
        // 60HZ刷新率13.3, 适当取值30ms
        setTimeout(() => {
          this.isScrolStatus = true
          // clearTimeout(timeId)
        }, 30)

        console.log(~~(this.$refs.itemBox.scrollTop / this.oneHeight))

        this.setScrollData()
      }
    },
    // 滚动相关事件设置项
    async setScrollData() {
      this.currentScrollTop = this.$refs.itemBox.scrollTop

      let currentIndex = ~~(this.$refs.itemBox.scrollTop / this.oneHeight)

      if (this.startIndex === currentIndex) return

      this.startIndex = currentIndex

      // 滚动到底部, 加载更多数据
      if (this.startIndex + this.containSize > this.list.length - 1) {
        let temp = await this.getList(this.query.num)
        if (temp) {
          this.list = [...this.list, ...temp]
        }
      }
    },
    // 计算最大容器数量
    getContainSize() {
      // ~~ --> Math.floor
      console.log(~~(this.$refs.itemBox.offsetHeight / this.oneHeight) + 2)
      this.containSize =
        ~~(this.$refs.itemBox.offsetHeight / this.oneHeight) + 2
    },
    // 获取数据
    getList(num) {
      return this.$axios
        .get(this.url + num)
        .then((res) => res.data)
        .then((res) => {
          console.log('res', res.list)
          // this.list = res.list;
          return res.list
        })
        .catch((err) => {
          return false
        })
    }
  }
}
</script>
<style scoped lang="less">
.continaer {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>