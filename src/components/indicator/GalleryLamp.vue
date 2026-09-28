<template>
  <ComponentContainer>
    <svg
      width="120"
      height="120"
      class="indicator--container"
      viewBox="0 0 120 120">
      <g class="indicator--bar" >
        <path
          :class="{ 'indicator--light-active-switch': false }"
          d="M102.62,52.56a8.37,8.37,0,0,0-2.49-6L93.55,40l3.67-3.66a14.81,14.81,0,0,0,0-21A11,11,0,0,1,94,7.5V5.08a1.13,1.13,0,0,0-2.26,0V7.5a13.23,13.23,0,0,0,3.93,9.44,12.58,12.58,0,0,1,0,17.85L92,38.45l-5.82-5.79V5.08A1.13,1.13,0,0,0,85,4H78.79a1.13,1.13,0,0,0-1.13,1.12V27.29a8.48,8.48,0,0,0-6.45,2.46L53.53,47.33l-21.08-.58a3.83,3.83,0,0,0-2.83,6.54L43.14,66.73a17.59,17.59,0,0,0,5,14.73,17.79,17.79,0,0,0,14.81,5L76.47,99.9A3.85,3.85,0,0,0,79.19,101a3.89,3.89,0,0,0,1.53-.31A3.81,3.81,0,0,0,83,97.08l-.59-21,17.67-17.58A8.37,8.37,0,0,0,102.62,52.56ZM79.91,6.2h4V46.87a2,2,0,0,1-4,0Zm-.08,92.45a1.57,1.57,0,0,1-1.76-.34L31.22,51.7A1.59,1.59,0,0,1,32.34,49h.05l21.11.59,26.7,26.56.59,21A1.56,1.56,0,0,1,79.83,98.65Zm1.49-24.57L55.58,48.47,72.8,31.34a6.21,6.21,0,0,1,4.86-1.8V46.92a4.18,4.18,0,0,0,4.19,4.17h.09a4.18,4.18,0,0,0,4.19-4.17V35.83l5,5h0l7.38,7.34a6.18,6.18,0,0,1,0,8.77Z"
          transform="translate(0 0)"/>
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M29.8,74.92H10.59a1.12,1.12,0,1,1,0-2.25H29.8a1.12,1.12,0,1,1,0,2.25Z" />
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M25.61,102.77a1.12,1.12,0,0,1-.8-1.92L39.72,86a1.13,1.13,0,0,1,1.6,0,1.12,1.12,0,0,1,0,1.59L26.41,102.44A1.13,1.13,0,0,1,25.61,102.77Z" />
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M57.14,117.16A1.13,1.13,0,0,1,56,116V96.92a1.13,1.13,0,0,1,2.26,0V116A1.13,1.13,0,0,1,57.14,117.16Z" />
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M65.23,88.11h-.28a24.67,24.67,0,0,1-17.28-7,23.91,23.91,0,0,1-7.14-17.3Z" />
        <circle
          :class="{ 'indicator--light-active-switch': twoStateSwitch }"
          cx="81.9"
          cy="46.65"
          r="1.1" />
        <ellipse
          :class="{ 'indicator--red-active-switch': twoStateSwitch }"
          cx="81.49"
          cy="68.48"
          rx="1.16"
          ry="1.18"/>
        <ellipse
          :class="{ 'indicator--green-active-switch': twoStateSwitch }"
          cx="84.28"
          cy="65.75"
          rx="1.16"
          ry="1.18"/>
        <ellipse
          :class="{ 'indicator--green-active-switch': twoStateSwitch }"
          cx="87.09"
          cy="63.1"
          rx="1.16"
          ry="1.18"/>
      </g>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'GalleryLampIndicator',
  mixins: [IndicatorMixin],
  computed: {}
}
</script>
