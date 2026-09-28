<template>
  <ComponentContainer>
    <svg
      width="120"
      height="120"
      class="indicator--container"
      viewBox="0 0 120 120">
      <g class="indicator--bar" >
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M61.77,100v13.19a1.13,1.13,0,1,1-2.27,0V100a1.13,1.13,0,0,1,2.27,0Z" />
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M44.67,98.27a1.13,1.13,0,0,1,0,.87l-5.24,12.41a1.13,1.13,0,1,1-2.09-.88l5.24-12.41a1.13,1.13,0,0,1,2.09,0Z" />
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M83.94,111.54a1.13,1.13,0,0,1-2.09,0L76.61,99.14a1.13,1.13,0,1,1,2.09-.88l5.24,12.41A1.12,1.12,0,0,1,83.94,111.54Z" />
        <path
          :class="{
            'indicator--light-active-switch': twoStateSwitch,
            'indicator--hide': !twoStateSwitch
          }"
          d="M96,81.26l-.14.6C95.17,85,91.72,87.94,86.2,90c-6.48,2.43-15.39,3.72-25.79,3.72S41.1,92.45,34.62,90c-5.52-2.07-9-5-9.71-8.16l-.14-.6H96Z" />
        <path
          :class="{ 'indicator--light-active-switch': false }"
          d="M106.92,79h-2l0-.72A44.19,44.19,0,0,0,76.09,38.6l-.49-.18V22h0a1.17,1.17,0,0,0-.35-2.27H73.53V14.44a7.88,7.88,0,0,0-2.07-5.39,6.67,6.67,0,0,0-4.92-2.21H54.83c-3.85,0-7,3.41-7,7.59v5.28H46a1.16,1.16,0,0,0-.48,2.18l.15.1V38.42l-.49.18A44.19,44.19,0,0,0,16.37,78.29l0,.72h-2a1.13,1.13,0,0,0,0,2.27h12l.13.58c.71,3.06,4,5.85,9.33,7.84,6.22,2.34,14.79,3.57,24.78,3.57S79.19,92,85.42,89.69c5.31-2,8.62-4.78,9.33-7.84l.13-.58h12a1.13,1.13,0,1,0,0-2.27ZM50.11,19V14.44c0-2.94,2.12-5.33,4.72-5.33H66.54c2.6,0,4.72,2.39,4.72,5.33v5.28H50.11ZM47.93,37.35V22H73.34V38.1H47.93Zm44.21,45c-1,1.92-3.7,3.76-7.52,5.2C80.46,89.13,72.91,91,60.64,91s-19.82-1.87-24-3.43c-3.81-1.43-6.48-3.28-7.52-5.2l-.59-1.1H92.73ZM101.89,79H18.6l0-.78A42,42,0,0,1,46.87,40.4l.12,0H74.28l.12,0a42,42,0,0,1,28.23,37.82l0,.78Z" />
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
  name: 'LampIndicator',
  mixins: [IndicatorMixin],
  computed: {}
}
</script>
