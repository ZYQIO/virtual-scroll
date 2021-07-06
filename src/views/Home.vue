<template>
  <div class="home">
    <VirtualScroll
      :url="url"
      :oneHeight="oneHeight"
      :query="query"
      v-slot:default="infoItem"
    >
      <!-- slot, 自定义内容 -->
      <router-link class="item" to="xxx" tag="div">
        <div class="item-left">
          <h4>{{ infoItem.item.title }}</h4>
          <p class="item-info">
            <span>
              <span>{{ infoItem.item.reads }}</span>
              <span>新浪新闻</span>
            </span>
            <span>{{ infoItem.item.date }}</span>
          </p>
        </div>
        <div class="item-right">
          <!-- <img :src="item.url" alt="" /> -->
          图片
        </div>
      </router-link>
    </VirtualScroll>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      // 单条数据的高度
      oneHeight: 100,
      // 请求url
      url: 'http://localhost:3000/data?num=',
      // 请求参数
      query: {
        num: 20
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  max-height: 800px;
  .item {
    display: flex;
    width: 100%;
    height: 100px;
    padding: 8px 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #888;
    
    .item-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 8px;
      .item-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > span:first-child {
          > span:first-child {
            margin-right: 6px;
          }
        }
      }
    }
    .item-right {
      width: 120px;
      border-left: 1px solid #ccc;
    }
  }
}
</style>