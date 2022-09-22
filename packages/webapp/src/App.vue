<template>
  <router-view v-slot="{Component, route}">
    <transition
      v-if="route.meta.transition"
      :css="false"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <component :is="Component" />
    </transition>
    <component
      :is="Component"
      v-else
    />
  </router-view>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import tearPage from '@/utils/tearPage'

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0
  })
}

function onEnter(el, done) {
  gsap.to(el, {
    duration: 1,
    opacity: 1,
    onComplete: done
  })
}

function onLeave(el, done) {
  tearPage(el, done)
}
</script>
