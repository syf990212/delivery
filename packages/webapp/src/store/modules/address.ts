import {Toast} from 'vant'
import type {ActionTree, Module, MutationTree} from 'vuex'
import type {AxiosResponse} from 'axios'
import type {HTTP_TYPES} from '@rabbit-run/common'

import type {AddressState, RootState} from '@/store/interface'
import {addAddress} from '@/api/address'
import {initMap} from '@/utils/map'

const state: AddressState = {
  delivery: null,
  shipping: null,
  position: '定位中'
}

const mutations: MutationTree<AddressState> = {
  setDelivery(state, payload) {
    state.delivery = payload
  },
  setShipping(state, payload) {
    state.shipping = payload
  },
  setPosition(state, payload) {
    state.position = payload
  },
  toggleAddress(state) {
    let tmp = state.delivery
    state.delivery = state.shipping
    state.shipping = tmp
  }
}

const actions: ActionTree<AddressState, RootState> = {
  addAddress(context, {type, addressInfo}) {
    return addAddress(addressInfo).then(({data}: AxiosResponse<HTTP_TYPES.HttpMessage>) => {
      if (type === 'shipping') {
        context.commit('setShipping', {id: data.data.id, ...addressInfo})
      } else {
        context.commit('setDelivery', {id: data.data.id, ...addressInfo})
      }
      return data
    })
  },
  getPosition(context) {
    // https://lbs.amap.com/api/jsapi-v2/documentation
    if (context.state.position === '定位中') {
      initMap([
        'AMap.CitySearch'
      ]).then((AMap) => {
        // https://lbs.amap.com/api/jsapi-v2/documentation#citysearch
        new AMap.CitySearch().getLocalCity(function (status, result) {
          if (status === 'complete') {
            context.commit('setPosition', result.city)
          } else {
            Toast.fail('定位失败，请手动选择城市')
          }
        })
      })
    }
  }
}

const module: Module<AddressState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default module
