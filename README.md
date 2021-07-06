## description
一个vue的大数据虚拟滚动列表...

## virtual-scr-list

## Project setup
```
npm i virtual-scr-list

```

## usAge
```

import VirtualScroll from 'virtual-scr-list'
import 'virtual-scr-list/styles/index.css'

Vue.use(VirtualScroll)


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

```

> slot 里面的内容自定义, 同理样式也需要自定义

> 在使用组件的外层盒子, 要有具体样式

> v-slot:default="infoItem" slot 接收的数据

## Props type

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Type**  | **Description**                                                               |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `query`       | Object | 请求参数. |
| `oneHeight`   | Number | 单条数据的高度. |
| `url`         | String | 请求url. |

## 这个demo需要配合 my-mock demo才可以演示

