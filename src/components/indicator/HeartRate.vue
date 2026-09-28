<template>
  <div
    :id="randomId"
    class="heart-rate-chart"/>
</template>
<script>
/* eslint-disable */
  // https://bl.ocks.org/velickym/d19f76572243c774557f
import IndicatorMixin from './mixin'

export default {
  name: 'heart-rate',
  mixins: [IndicatorMixin],
  data () {
    return {
      randomId: 'random-widget-id-' + Math.random().toString().split('.')[1],
      tabFocused: true,
      beatCheckerValidatorTimer: null
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      this.initChart()
    }, 500)
  },
  methods: {
    initChart () {
      var self = this
      var svg = null;
      var latestBeat = null;
      var insideBeat = false;
      var data = [];
      var SECONDS_SAMPLE = 12;
      var BEAT_TIME = 1000;
      var TICK_FREQUENCY = SECONDS_SAMPLE * 1000 / BEAT_TIME;
      var BEAT_VALUES = [0, 0, 3, -4, 10, -7, 3, 0, 0];
      var CIRCLE_FULL_RADIUS = 2;
      var MAX_LATENCY = 10000;
      var svgWrapper = document.getElementById(this.randomId);
      var margin = {left: 0, top: 10, right: 0, bottom: 10};
      var width = '500'//svgWrapper.offsetWidth - margin.left - margin.right;
      var height = svgWrapper.offsetHeight - margin.top - margin.bottom;
      var now = new Date();
      var fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);
      // create SVG
      svg = d3.select(`#${this.randomId}`).append("svg")
        //.attr("width", width + margin.left + margin.right)
        .attr("width", '100%')
        .attr("height", height + margin.bottom + margin.top)
        .append("g");
      // init scales
      // create initial set of data
      data.push({
        date: now,
        value: 0
      });
      var x = d3.time.scale()
          .domain([fromDate, new Date(now.getTime())])
          .range([0, width]),
        y = d3.scale.linear()
          .domain([-8, 8])
          .range([height, 0]);

      var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.value);
        });

      var path = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .attr("class", "line");

      //svg.select(".line")
      //  .attr("d", line(data));

      var transition = d3.select(path).transition()
        .duration(100)
        .ease("cubic ");

      (function tick () {
        transition = transition.each(function () {
          if (self.tabFocused) {
            // update the domains
            now = new Date();
            fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);
            x.domain([fromDate, new Date(now.getTime() - 100)]);
            var translateTo = x(new Date(fromDate.getTime()) - 100);

            // redraw the line
            svg.select(".line")
              .attr("d", line(data))
              .attr("transform", null)
              .transition()
              .attr("transform", "translate(" + translateTo + ")");

          }
        }).transition().each("start", tick);
      })();
      setInterval(() => {
        if (self.tabFocused) {
          now = new Date();
          fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);
          for (var i = 0; i < data.length; i++) {
            if (data[i].date < fromDate - 20000) {
              data.shift();
            } else {
              break;
            }
          }
          if (insideBeat) return;
          data.push({
            date: now,
            value: 0
          });
          if (data.length > 1600) {
            data.shift();
          }
        }
      }, TICK_FREQUENCY);

      function beat () {
        if (insideBeat) return;
        insideBeat = true;
        var now = new Date();
        var nowTime = now.getTime();
        if (data.length > 0 && data[data.length - 1].date > now) {
          data.splice(data.length - 1, 1);
        }
        if (data.length > BEAT_TIME) {
          data.shift();
        }
        data.push({
          date: now,
          value: 0
        });
        var step = BEAT_TIME / BEAT_VALUES.length - 2;
        for (var i = 1; i < BEAT_VALUES.length; i++) {
          if (data.length > BEAT_TIME) {
            data.shift();
          }
          data.push({
            date: new Date(nowTime + i * step),
            value: BEAT_VALUES[i]
          });
        }
        latestBeat = now;
        setTimeout(function () {
          insideBeat = false;
        }, BEAT_TIME);
      }

      beat();
      this.beat = beat
    },
    beatChecker () {
      clearTimeout(this.beatCheckerValidatorTimer)
      this.beatCheckerValidatorTimer = setTimeout(() => {
        if (this.beat) {
          this.beat()
        }  
      }, 1)
    }
  },
  watch: {
   lastUpdate: {
     deep: true,      
     handler () {
      this.beatChecker()
     }
    },
    currentColor: {
     deep: true,      
     handler (newValue) {
      jQuery(`#${this.randomId} svg path`).css({
       stroke: newValue
      })
      jQuery(`#${this.randomId} svg circle`).css({
       fill: newValue
      })
     }
    }
  }
}
</script>

<style>
  .heart-rate-chart {
    display: block;
    width: 100%;
    margin: 0 auto;
    height: 175px;
  }

  .heart-rate-chart svg path {
    fill: none;
    stroke: #1a92cf;
    stroke-width: 2.5px;
  }

  /* TODO: its better remove circle from SVG */
  .heart-rate-chart svg circle {
    display: none;
  }
</style>
