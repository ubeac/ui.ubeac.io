<!-- https://jsfiddle.net/Bitii/z2koj56c/2/ -->
<template>
  <ComponentContainer>
    <div
      ref="indicator"
      :aria-value="level"
      class="indicator--container indicator--heart-beat">
      <svg
        style="position: relative; right: -5px;"
        width="100"
        height="100"
        viewBox="0 0 124 80">
        <path
          :class="[{ 'indicator--in-active': levelValue < 10}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M54.62,24.69H18.17a26.4,26.4,0,0,1,36.44,0Zm29.52-7.28H84a26.33,26.33,0,0,0-18.31,7.28h36.44A26.25,26.25,0,0,0,84.14,17.41Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 9}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M64.92,25.43h38a26.46,26.46,0,0,1,4.55,6.31c.31.6.58,1.21.84,1.83H12.05c.25-.61.53-1.22.83-1.82a26.53,26.53,0,0,1,4.55-6.32h38l4.75,4.33Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 8}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M11.78,34.31h96.78a25.7,25.7,0,0,1,1.65,8.14H10.13A25.69,25.69,0,0,1,11.78,34.31Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 7}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M10.1,43.19H110.23A25.58,25.58,0,0,1,109,51.33H11.35A25.56,25.56,0,0,1,10.1,43.19Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 6}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M11.61,52.07h97.1A25.66,25.66,0,0,1,104,60.21H16.38A25.56,25.56,0,0,1,11.61,52.07Z"
          transform="translate(-10.1 -17.41)"/>
        <!-- 5 -->
        <path
          :class="[{ 'indicator--in-active': levelValue < 5}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M17.07,60.95h86.2c-.25.27-.49.54-.76.8l-7.13,7.34H25l-7.17-7.38C17.54,61.46,17.31,61.2,17.07,60.95Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 4}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M25.67,69.83h69L86.77,78H33.58Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 3}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M34.29,78.71H86.05l-7.91,8.14H42.2Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 1}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M42.92,87.58H77.43l-7.91,8.14H50.83Z"
          transform="translate(-10.1 -17.41)"/>
        <path
          :class="[{ 'indicator--in-active': levelValue < 0}, indicatorLevelColor]"
          :style="{ fill: currentColor}"
          class="indicator--bar"
          d="M51.54,96.46H68.81l-7.14,7.35a2.16,2.16,0,0,1-1.5.63,2.08,2.08,0,0,1-1.5-.63Z"
          transform="translate(-10.1 -17.41)"/>

      </svg>
    </div>
  </ComponentContainer>
</template>
<style type="text/css" scoped>
  .indicator--heart-beat{
    position: absolute;
    top: 50%;
    left: 50%;
    animation: none;
    transform:translate(-50%, -50%);
  }
</style>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'HearBeatIndicator',
  mixins: [IndicatorMixin],
  props: {
    animation: {
      type: [Boolean],
      required: false,
      default: false
    }
  },
  data () {
    return {
      levelValue: null,
      cachedValue: null,
      animationStartedFlag: false,
      animationTimeout: null
    }
  },
  computed: {
    level () {
      this.levelValue = this.value
      return this.value
    }
  }
}
</script>
