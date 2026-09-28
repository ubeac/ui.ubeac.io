<template>
  <ComponentContainer>
    <svg
      width="130"
      height="130"
      viewBox="0 0 130 130"
      class="indicator--container">
      <ellipse
        :class="{ 'indicator--red-active-switch': true }"
        cx="70"
        cy="23"
        rx="1.16"
        ry="1.18"/>
      <ellipse
        :class="{ 'indicator--green-active-switch': true }"
        cx="74"
        cy="23"
        rx="1.16"
        ry="1.18"/>
      <ellipse
        :class="{ 'indicator--green-active-switch': true }"
        cx="78"
        cy="23"
        rx="1.16"
        ry="1.18"/>
      <path
        class="indicator--bar"
        d="M82.8,17.27,81.52,28a.83.83,0,0,1-.83.73H38.29a.83.83,0,0,1-.83-.73L36.17,17.27a.83.83,0,0,1,.74-.92H82a.83.83,0,0,1,.84.83A.81.81,0,0,1,82.8,17.27ZM70.74,45.42a.84.84,0,0,1-.82.63H49a.84.84,0,0,1-.82-.63l-3.65-15h29.8Zm11.52-30.7-.29,0H37a2.5,2.5,0,0,0-2.52,2.48,2.42,2.42,0,0,0,0,.29l1.28,10.72a2.51,2.51,0,0,0,2.5,2.19h4.56L46.6,45.8A2.5,2.5,0,0,0,49,47.7H69.92a2.5,2.5,0,0,0,2.45-1.9l3.74-15.42h4.56a2.51,2.51,0,0,0,2.5-2.19l1.28-10.72A2.49,2.49,0,0,0,82.26,14.72Z" />
      <path
        :class="[{ 'indicator--in-active': level < 1}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.78,55.86a6.83,6.83,0,0,1-5.49-2.74l1.59-1.21a4.87,4.87,0,0,0,7.78,0l1.59,1.21A6.84,6.84,0,0,1,59.78,55.86Z" />
      <path
        :class="[{ 'indicator--in-active': level < 2}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.78,61.75a12.68,12.68,0,0,1-10.13-5l1.59-1.22a10.74,10.74,0,0,0,17.07,0l1.58,1.22A12.69,12.69,0,0,1,59.78,61.75Z" />
      <path
        :class="[{ 'indicator--in-active': level < 3}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.79,67.63A18.54,18.54,0,0,1,45,60.34l1.58-1.22a16.62,16.62,0,0,0,26.35,0l1.58,1.23A18.54,18.54,0,0,1,59.79,67.63Z" />
      <path
        :class="[{ 'indicator--in-active': level < 4}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.8,73.52A24.39,24.39,0,0,1,40.36,64l1.58-1.22a22.53,22.53,0,0,0,35.65.06L79.18,64A24.4,24.4,0,0,1,59.8,73.52Z" />

      <path
        :class="[{ 'indicator--in-active': level < 5}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.8,79.41A30.25,30.25,0,0,1,35.72,67.57l1.58-1.22a28.42,28.42,0,0,0,44.94.08l1.58,1.23A30.26,30.26,0,0,1,59.8,79.41Z" />
      <path
        :class="[{ 'indicator--in-active': level < 6}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.81,85.29A36.1,36.1,0,0,1,31.08,71.18L32.66,70a34.3,34.3,0,0,0,54.22.1l1.58,1.23A36.11,36.11,0,0,1,59.81,85.29Z" />
      <path
        :class="[{ 'indicator--in-active': level < 7}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.82,91.18A42,42,0,0,1,26.44,74.79L28,73.57a40.18,40.18,0,0,0,63.5.11l1.58,1.23A42,42,0,0,1,59.82,91.18Z" />
      <path
        :class="[{ 'indicator--in-active': level < 8}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.82,97.07a48.08,48.08,0,0,1-38-18.66l1.58-1.23a46.07,46.07,0,0,0,72.79.13l1.58,1.23A48.07,48.07,0,0,1,59.82,97.07Z" />
      <path
        :class="[{ 'indicator--in-active': level < 9 }, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.83,103A54,54,0,0,1,17.16,82l1.58-1.23a52,52,0,0,0,82.07.14l1.58,1.23A54,54,0,0,1,59.83,103Z" />
      <path
        :class="[{ 'indicator--in-active': level < 10}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M59.84,108.84A59.85,59.85,0,0,1,12.51,85.62l1.58-1.23A57.83,57.83,0,0,0,96.21,94a58.26,58.26,0,0,0,9.24-9.41L107,85.79a59.84,59.84,0,0,1-47.19,23.05Z" />
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'CeilingIndicator',
  mixins: [IndicatorMixin],
  computed: {
    level () {
      let out = Math.ceil((parseInt(this.percent) * 10) / 100)
      if (out === 0) {
        out = 1
      }
      if (out > 10) {
        out = 10
      }
      return out
    }
  }
}
</script>
