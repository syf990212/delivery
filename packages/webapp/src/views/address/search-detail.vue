<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {debounce} from 'lodash'

import {useStore} from '@/store/hook'
import {initMap} from '@/utils/map'

const store = useStore()

let addressKeyword = ref('')
let cityList = ref<any[]>([])
let city = computed(() => store.state.address.position || '北京')
let autoComplete: any = null

function handleSearch(keyword) {
  autoComplete.search(keyword, function (status, result) {
    // https://lbs.amap.com/api/jsapi-v2/documentation#autocompletesearchcallback
    if (status === 'complete') {
      cityList.value = result.tips.filter((v) => v.address.length > 0)
    }
  })
}

initMap([
  'AMap.AutoComplete'
]).then((AMap) => {
  // https://lbs.amap.com/api/jsapi-v2/documentation#autocomplete
  autoComplete = new AMap.AutoComplete({
    city: city.value,
    citylimit: true
  })
})

watch(addressKeyword, debounce(() => {
  if (addressKeyword.value) {
    handleSearch(addressKeyword.value)
  }
}, 2000))
</script>

<template>
  <div class="search-detail">
    <div class="head">
      <van-nav-bar
        title="地址搜索"
        left-arrow
        @click-left="$router.back()"
      />

      <div class="search">
        <div class="input-control">
          <input
            v-model="addressKeyword"
            type="text"
            placeholder="搜索地址名称"
          >
        </div>
        <div
          class="position"
          @click="$router.push('/city-picker')"
        >
          <van-icon
            name="location"
            size="18"
          />
          <span>{{ city }}</span>
        </div>
      </div>

      <div class="choose-common-address">
        <div class="left">
          <van-icon name="star" />
          选择常用地址
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="content">
      <ul class="content-list">
        <li
          v-for="(item,index) in cityList"
          :key="index"
        >
          <div class="title">
            {{ item.name }}
          </div>
          <div class="subtitle">
            {{ item.address }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #FFFFFF;

  .head {
    .search {
      padding: 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #E9E9EB;

      .input-control {
        flex: 1;
        padding: 15px;
        background-color: #F4F4F4;
        margin-right: 15px;

        input {
          background-color: #F4F4F4;
        }
      }
    }

    .choose-common-address {
      padding: 20px 15px;
      border-bottom: 1px solid #E9E9EB;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;

    .content-list {
      > li {
        padding: 15px;
        line-height: 1.5;
        border-bottom: 1px solid #E9E9EB;

        .title {
          font-size: 18px;
        }

        .subtitle {
          font-size: 14px;
          color: #BCC1CC;
        }
      }
    }
  }
}
</style>
