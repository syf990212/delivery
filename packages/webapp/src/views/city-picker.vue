<script lang="ts" setup>
import {areaList} from '@vant/area-data'
import {useRouter} from 'vue-router'

import {useStore} from '@/store/hook'

const store = useStore()
const router = useRouter()

let city_list: Array<string> = Object.values(areaList['city_list']).sort((a, b) => a.localeCompare(b))

function handleClickCity(record: string) {
  store.commit('address/setPosition', record)
  router.back()
}
</script>

<template>
  <div class="bgc">
    <van-nav-bar
      title="城市选择"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="city_choice pt-2">
      城市选择
    </div>
    <ul class="city_ul">
      <li
        v-for="item in city_list"
        :key="item"
        @click="handleClickCity(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.bgc {
  background-color: white;

  .city_choice {
    font-size: 20px;
    font-weight: bold;
  }

  .city_ul {
    list-style: none;
    padding: 5px 10px;

    li {
      font-size: 13px;
      padding: 20px 0;
      border-bottom: 1px solid #EEEEEE;
    }
  }
}
</style>
