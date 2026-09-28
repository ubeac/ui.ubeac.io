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
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M28.86,41.61A2.61,2.61,0,1,1,26.25,39,2.62,2.62,0,0,1,28.86,41.61Z" />
        <path
          :class="{
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M41.73,52.28a2.61,2.61,0,1,1-2.61-2.61A2.62,2.62,0,0,1,41.73,52.28Z" />
        <path
          :class="{
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M54.6,41.61A2.61,2.61,0,1,1,52,39,2.62,2.62,0,0,1,54.6,41.61Z" />
        <path
          :class="{
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M54.6,52.17A2.61,2.61,0,1,1,52,49.56,2.62,2.62,0,0,1,54.6,52.17Z" />
        <path
          :class="{
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M41.73,41.72a2.61,2.61,0,1,1-2.61-2.61A2.62,2.62,0,0,1,41.73,41.72Z" />
        <path
          :class="{
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M106.38,82.21l-4.62-1.32a67.49,67.49,0,0,0-18.33-2.54H65.09V27A19,19,0,0,0,46,8.12H32.64A19,19,0,0,0,13.5,27V92.85a19,19,0,0,0,19.13,18.9H46A19,19,0,0,0,64.95,95l.08-.75H83.46a67.51,67.51,0,0,0,18.32-2.54l4.59-1.32a4.22,4.22,0,0,0,0-8.15ZM16.24,27A16.32,16.32,0,0,1,32.64,10.81H46A16.32,16.32,0,0,1,62.35,27v3H16.24Zm0,5.73H62.35v28H16.24ZM62.17,95.18A16.41,16.41,0,0,1,46,109.06H32.64A16.32,16.32,0,0,1,16.24,92.85V63.47H62.35V78.36H54.19l-.25-.42a17,17,0,0,0-20.32-7.4A16.71,16.71,0,0,0,24,79.11a16.42,16.42,0,0,0-.64,12.76A16.66,16.66,0,0,0,32,101.36,17.09,17.09,0,0,0,45,102a16.85,16.85,0,0,0,8.94-7.37l.25-.42h8.14Zm-22.87-1H51.12l-1.28,1.42a13.9,13.9,0,0,1-5.79,3.85,14.22,14.22,0,0,1-10.83-.54,14,14,0,0,1-7.29-8,13.78,13.78,0,0,1,.56-10.67,14,14,0,0,1,8-7.19,14.32,14.32,0,0,1,10.83.53,14.07,14.07,0,0,1,4.49,3.33l1.28,1.42H39.3a7.93,7.93,0,1,0,0,15.86Zm66.31-6.43L101,89.09a64.65,64.65,0,0,1-17.58,2.43h-30v-.85l-.12.85H39.3A5.24,5.24,0,1,1,39.3,81H83.44A64.92,64.92,0,0,1,101,83.47l4.62,1.32a1.54,1.54,0,0,1,0,3Z" />
        <path
          :class="{
            'indicator--green-active-switch': twoStateSwitch,
            'indicator--red-active-switch': !twoStateSwitch
          }"
          d="M28.86,52.17a2.61,2.61,0,1,1-2.61-2.61A2.62,2.62,0,0,1,28.86,52.17Z" />
      </g>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'DoorLockIndicator',
  mixins: [IndicatorMixin],
  computed: {}
}
</script>
