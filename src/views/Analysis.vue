<template>
  <main class="analysis">
    <h1 class="formal-text">Sale analysis</h1>
    <div class="toolbar">
      <div class="button-container" @click="setShowOrderManagement">
        <button class="order-management">
          <i class="fas fa-clipboard-list"></i>
        </button>
      </div>
      <div class="button-container">
        <button class="">
          <i class="fas fa-tools"></i>
        </button>
      </div>
      <div class="button-container">
        <button class="">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>
    <div class="date-time">
      <div class="start">
        <label for="start" class="title formal-text">Start time: </label>
        <input
          v-model="startTime"
          type="datetime-local"
          id="start"
          name="start"
        />
      </div>
      <div class="end">
        <label for="start" class="title formal-text">End time: </label>
        <input v-model="endTime" type="datetime-local" id="end" name="end" />
      </div>
      <button @click="getReport" class="get-report normal-button">
        Get report
      </button>
    </div>
    <div class="result-message" v-if="showResultMessage">
      <p
        v-for="p in resultMessage"
        :key="p.index"
        :class="getReportSuccess ? 'success' : 'fail'"
      >
        {{ p }}
      </p>
    </div>
    <h2 class="formal-text">Top sale survey</h2>
    <p class="chart-notice">This chart showing products with highest sales</p>
    <div class="select-number">
      <label for="limit">Number of product to show</label>
      <input
        type="text"
        name="limit"
        id="limit"
        min="1"
        max="10"
        @change="alterMaxBar"
        :value="maxBarShownOnChart"
      />
    </div>
    <div class="chart-container">
      <div
        class="best-selling"
        id="plot-container"
        v-show="showChartElement"
      ></div>
      <div class="legend" v-show="showChartElement">
        <div v-for="item in bestSellsWithRandomColor" :key="item.productID">
          <span class="color" :style="{ backgroundColor: item.color }"> </span>
          <span class="name">{{ item.Name }} </span>
        </div>
      </div>
    </div>

    <div class="report">
      <h2 class="formal-text">Order summary</h2>
      <p v-for="(value, index) in orderData" :key="index">
        <span class="item">{{ index }}:</span>
        <span class="detail">{{ value }} </span>
      </p>
    </div>
    <transition name="order-management"
      ><order-management-comp v-if="showOrderManagement"
    /></transition>
  </main>
</template>

<script>
import OrderManagementComp from "../components/OrderManagementComp.vue";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { GET_REPORT_DATA } from "../store/actions.type";
import {
  RESET_DATA,
  SET_STATUS,
  SET_GET_REPORT_FAIL,
  SET_MAX_BAR_NUMBER,
  SHOW_ORDER_MANAGEMENT,
} from "../store/mutations.type";
// import { GET_REPORT_DATA } from "../store/actions.type";
import * as d3 from "d3";
import { camelCaseToSpace, convertToISOformat } from "../common/helper";
export default {
  components: {
    OrderManagementComp,
  },
  setup() {
    const store = useStore();
    const maxBarShownOnChart = computed(
      () => store.state.analysisModule.maxBarShownOnChart
    );
    const fieldWidth = computed(() => store.state.analysisModule.fieldWidth);
    const fieldHeight = computed(() => store.state.analysisModule.fieldHeight);
    const barWidth = computed(() => store.state.analysisModule.barWidth);
    const padding = computed(() => store.state.analysisModule.padding);

    const orderData = computed(() => {
      const objectFromStore = store.state.analysisModule.orderData;
      const outputObject = {};
      for (const key in objectFromStore) {
        outputObject[camelCaseToSpace(key)] = objectFromStore[key];
      }
      return outputObject;
    });
    const bestSellsWithRandomColor = computed(
      () => store.getters[`analysisModule/bestSellsWithColor`]
    );

    const distanceBetweenBar = computed(
      () => store.getters[`analysisModule/distanceBetweenBar`]
    );

    const showChartElement = ref(true);
    const startTime = ref("");
    const endTime = ref("");
    const startTimeInDesiredFormat = ref("");
    const endTimeInDesiredFormat = ref("");
    const showResultMessage = ref(null);
    const showOrderManagement = computed(
      () => store.state.analysisModule.showOrderManagement
    );
    //computed
    const resultMessage = computed(
      () => store.state.analysisModule.resultMessage
    );
    const getReportSuccess = computed(
      () => store.state.analysisModule.getReportSuccess
    );

    watch(
      getReportSuccess,
      () => {
        console.log("changing from null");
        showResultMessage.value = true;
      },
      { deep: true }
    );

    // const convertToLocaleString = (time)=>time.toLocaleString('en-US', { timeZone: 'America/New_York' });
    const alterMaxBar = (e) => {
      console.log("setting mx bar", e.target.value);
      store.commit(`analysisModule/${SET_MAX_BAR_NUMBER}`, e.target.value);
    };
    const drawChart = () => {
      const data = bestSellsWithRandomColor.value;
      const dis = distanceBetweenBar.value;
      const w = fieldWidth.value;
      const h = fieldHeight.value;
      const p = padding.value;
      const barW = barWidth.value;
      console.log(data, dis, w, h, p, barW);
      if (data.length > 0) {
        console.log("hello");
        d3.selectAll("svg").remove();
        // const bestSells = r.bestSellsData.slice(0, maxBarShownOnnChart.value);
        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.AmountSold)])
          .range([h - p, p]);
        const yAxis = d3.axisLeft(yScale);
        const plotField = d3
          .select(".best-selling")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .attr("class", "plot-field");
        plotField
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .style("fill", (d) => d.color)
          .attr("height", (d) => h - p - yScale(d.AmountSold))
          .attr("width", barW)
          .attr("x", (d, i) => p - barW / 2 + (i + 0.5) * dis)
          .attr("y", (d) => yScale(d.AmountSold))
          .append("title")
          .text((d) => d.Name);
        plotField
          .selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .text((d) => d.AmountSold)
          .attr("class", "title-text")
          .attr("x", (d, i) => p - barW / 2 + (i + 0.5) * dis)
          .attr("y", (d) => yScale(d.AmountSold) - 2);
        plotField
          .append("g")
          .attr("transform", `translate(${p},0)`)
          .attr("class", "axis")
          .call(yAxis);
        plotField
          .append("line")
          .attr("x1", p)
          .attr("x2", w - p)
          .attr("y1", h - p)
          .attr("y2", h - p)
          .attr("stroke", "#02195f");
        showChartElement.value = true;
      }
    };
    const setShowOrderManagement = () =>
      store.commit(`analysisModule/${SHOW_ORDER_MANAGEMENT}`);
    const getReport = () => {
      showChartElement.value = false;
      showResultMessage.value = false;
      store.commit(`analysisModule/${RESET_DATA}`);
      //check empty time input
      if (
        startTimeInDesiredFormat.value === "" ||
        endTimeInDesiredFormat.value === ""
      ) {
        store.commit(`analysisModule/${SET_STATUS}`, {
          data: ["You must choose both start & end time"],
        });
        store.commit(`analysisModule/${SET_GET_REPORT_FAIL}`);
        return;
      }

      //check invalid time duration
      if (
        new Date(startTime.value).getTime() >= new Date(endTime.value).getTime()
      ) {
        store.commit(`analysisModule/${SET_STATUS}`, {
          data: ["Invalid time duration,"],
        });
        store.commit(`analysisModule/${SET_GET_REPORT_FAIL}`);
        return;
      }

      store
        .dispatch(`analysisModule/${GET_REPORT_DATA}`, {
          start: startTimeInDesiredFormat.value,
          end: endTimeInDesiredFormat.value,
        })
        .then(() => {
          drawChart();
        });
    };
    watch(startTime, (value) => {
      startTimeInDesiredFormat.value = convertToISOformat(value);
    });
    watch(endTime, (value) => {
      endTimeInDesiredFormat.value = convertToISOformat(value);
    });
    watch(maxBarShownOnChart, () => {
      getReport();
    });

    onMounted(() => {
      const currentDateTime = new Date();
      const offset = currentDateTime.getTimezoneOffset();
      const isoCurrentTime = new Date(
        currentDateTime.getTime() - offset * 60 * 1000
      ).toISOString();
      const defaultStartTime = isoCurrentTime.split("T")[0] + `T00:01`;
      const defaultEndTime = isoCurrentTime.split("T")[0] + `T23:59`;
      startTime.value = defaultStartTime;
      endTime.value = defaultEndTime;
    });

    return {
      startTime,
      endTime,
      getReport,
      resultMessage,
      showResultMessage,
      showChartElement,
      maxBarShownOnChart,
      orderData,
      bestSellsWithRandomColor,
      showOrderManagement,
      setShowOrderManagement,
      fieldWidth,
      padding,
      fieldHeight,
      distanceBetweenBar,
      alterMaxBar,
      //for debug
      startTimeInDesiredFormat,
      endTimeInDesiredFormat,
      getReportSuccess,
    };
  },
};
</script>
<style lang="scss" scoped>
.order-management-enter-active {
  transition: all 0.25s ease-out;
}

.order-management-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.order-management-enter-from,
.order-management-leave-to {
  opacity: 0;
}
main {
  margin-bottom: 60px;
  padding: 1vh 4vw;
  .toolbar {
    height: 50vh;
    width: fit-content;
    position: fixed;
    left: 0;
    top: 60%;
    transition: all 0.2s ease-in;
    transform-origin: 0% 0%;
    transform: translateY(-50%) scale(0.5);
    &:hover {
      transform: translateY(-50%) scale(1);
    }
    padding: 1rem 0.6rem;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#4c4c4c+0,595959+12,666666+25,474747+39,2c2c2c+50,000000+51,111111+60,2b2b2b+76,1c1c1c+91,131313+100;Black+Gloss+%231 */
    background: #4c4c4c; /* Old browsers */
    background: -moz-linear-gradient(
      top,
      #4c4c4c 0%,
      #595959 12%,
      #666666 25%,
      #474747 39%,
      #2c2c2c 50%,
      #000000 51%,
      #111111 60%,
      #2b2b2b 76%,
      #1c1c1c 91%,
      #131313 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      #4c4c4c 0%,
      #595959 12%,
      #666666 25%,
      #474747 39%,
      #2c2c2c 50%,
      #000000 51%,
      #111111 60%,
      #2b2b2b 76%,
      #1c1c1c 91%,
      #131313 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      #4c4c4c 0%,
      #595959 12%,
      #666666 25%,
      #474747 39%,
      #2c2c2c 50%,
      #000000 51%,
      #111111 60%,
      #2b2b2b 76%,
      #1c1c1c 91%,
      #131313 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=0 ); /* IE6-9 */

    border-radius: 10px;
    margin-left: 5px;
    .button-container {
      margin-bottom: 6px;
      --button-size: 30px;
      height: var(--button-size);
      width: var(--button-size);
      border: 1px solid darkgrey;
      border-radius: 8px;
      button {
        /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#4c4c4c+0,595959+12,666666+25,474747+39,2c2c2c+50,000000+51,111111+60,2b2b2b+76,1c1c1c+91,131313+100;Black+Gloss+%231 */
        background: #4c4c4c; /* Old browsers */
        background: -moz-linear-gradient(
          top,
          #4c4c4c 0%,
          #595959 12%,
          #666666 25%,
          #474747 39%,
          #2c2c2c 50%,
          #000000 51%,
          #111111 60%,
          #2b2b2b 76%,
          #1c1c1c 91%,
          #131313 100%
        ); /* FF3.6-15 */
        background: -webkit-linear-gradient(
          top,
          #4c4c4c 0%,
          #595959 12%,
          #666666 25%,
          #474747 39%,
          #2c2c2c 50%,
          #000000 51%,
          #111111 60%,
          #2b2b2b 76%,
          #1c1c1c 91%,
          #131313 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
          to bottom,
          #4c4c4c 0%,
          #595959 12%,
          #666666 25%,
          #474747 39%,
          #2c2c2c 50%,
          #000000 51%,
          #111111 60%,
          #2b2b2b 76%,
          #1c1c1c 91%,
          #131313 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=0 ); /* IE6-9 */

        border: none;
        display: block;
        width: 100%;
        height: 100%;
        color: white;
        outline: none;
        &:hover {
          position: relative;
          transform: scale(1.1);
        }
      }
    }
  }
  h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    padding: 1rem 0;
  }
  .chart-container {
    width: 750px;
    margin: 0 auto 40px auto;
    background: $plotFieldColor;
    position: relative;
  }
  .date-time {
    margin: 0 0 15px 0;
    width: 60%;
    min-width: 650px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(227, 230, 230);
    border: 1px solid rgb(201, 202, 202, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    .start,
    .end {
      label {
        display: inline-block;
        margin-right: 10px;
        font-size: 0.9rem;
      }
      input {
        display: block;
        font-size: 0.8rem;
        background-color: $color2;
        border: 1px solid rgb(231, 230, 230);
        border-radius: 5px;
        font-style: italic;
      }
    }
    .get-report {
      font-size: 0.8rem;
      width: max-content;
      height: fit-content;
      padding: 0.3rem 1rem;
      border: 1px solid rgb(231, 230, 230);
      color: white;
      border-radius: 2px;
      background-color: rgb(128, 159, 247);
      margin: auto 0 0;
    }
  }
  .result-message {
    font-size: 0.9rem;
    padding-left: 1rem;
    p {
      margin: 5px 0;
    }
  }
  h2 {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: underline;
  }
  p.chart-notice {
    font-size: 0.8rem;
    text-align: left;
  }
  .select-number {
    label {
      font-size: 0.8rem;
    }
    input {
      width: 50px;
      display: inline-block;
      margin-left: 1rem;
      font-size: 0.8rem;
    }
  }
  .legend {
    width: max-content;
    right: 5px;
    top: 5px;
    position: absolute;
    max-height: 40%;
    overflow: auto;
    padding: 0.5rem;
    border: 1px solid rgb(212, 212, 212);
    border-radius: 10px;
    div {
      span.color {
        --colorBox-side: 10px;
        display: inline-block;
        width: var(--colorBox-side);
        height: var(--colorBox-side);
        margin-right: 0.5rem;
      }
      span.name {
        font-size: 0.8rem;
        display: inline-block;
        color: $color1;
      }
    }
  }
  .best-selling {
    padding: 10% 0 0 0;
    position: relative;
    width: 100%; // background-color: blue;
    height: 100%;
  }
  .plot-background {
    background-color: red;
  }
  .report {
    width: 70%;
    min-width: 500px;
    margin: auto;
    h2 {
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    p {
      span {
        display: inline-block;
        width: 50%;
        font-size: 0.9rem;
      }
      span.detail {
        text-align: center;
      }
      span.item {
        text-transform: capitalize;
        border-bottom: 1px solid black;
        position: relative;
        &::after {
          content: ":";
          position: absolute;
          display: inline-block;
          right: -10%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
