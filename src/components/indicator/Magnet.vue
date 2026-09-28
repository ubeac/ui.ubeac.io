<template>
  <ComponentContainer>
    <svg
      width="80"
      height="120"
      viewBox="0 0 150.8 180.8"
      class="indicator--container indicator--magnet">
      <polygon
        :class="[{ 'indicator--in-active': level < 10}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="30.07 0 30.07 14 0.17 14 0.12 0 30.07 0"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 10}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="151.55 0.14 151.5 13.97 120.9 13.97 120.9 0.14 151.55 0.14"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 9}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="29.95 17.65 29.95 31.65 0.05 31.65 0 17.65 29.95 17.65"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 9}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="151.49 17.65 151.45 31.65 120.9 31.65 120.9 17.65 151.49 17.65"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 8}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="29.95 35.34 29.95 49.34 0.11 49.34 0.06 35.34 29.95 35.34"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 8}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="151.43 35.34 151.39 49.34 120.9 49.34 120.9 35.34 151.43 35.34"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 7}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="29.95 53.03 29.95 67.03 0.17 67.03 0.12 53.03 29.95 53.03"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 7}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="151.38 53.03 151.33 67.03 120.9 67.03 120.9 53.03 151.38 53.03"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 6}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="29.95 70.72 29.95 84.72 0.23 84.72 0.18 70.72 29.95 70.72"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 6}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="151.32 70.72 151.27 84.72 120.9 84.72 120.9 70.72 151.32 70.72"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 5}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="30.07 88.4 30.07 102.4 0.17 102.4 0.12 88.4 30.07 88.4"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 5}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="151.26 88.4 151.21 102.41 120.9 102.41 120.9 88.4 151.26 88.4"/>
      <path
        :class="[{ 'indicator--in-active': level < 4}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M33.06,120.1H2.12A62.08,62.08,0,0,1,.3,106.69v-.6H30A38.21,38.21,0,0,0,33.06,120.1Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 4}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M151.2,106.09v.47a62,62,0,0,1-1.83,13.54H117.66a38.72,38.72,0,0,0,3.21-14Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 3}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M47.56,137.78H9.5a64.21,64.21,0,0,1-6.34-14H34.87A42.83,42.83,0,0,0,47.56,137.78Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 3}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M148.33,123.78a64.21,64.21,0,0,1-6.34,14H103.14a43.51,43.51,0,0,0,12.7-14Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 2}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M139.61,141.47a71.86,71.86,0,0,1-12.8,14H24.68a71.8,71.8,0,0,1-12.79-14H53.74a49,49,0,0,0,43.24,0Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 1}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M122.06,159.16a78.94,78.94,0,0,1-36,14H65.44a79.17,79.17,0,0,1-36-14Z"/>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'MagnetIndicator',
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
