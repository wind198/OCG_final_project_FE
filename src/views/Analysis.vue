<template>
  <main class="analysis">
    <h1 class="formal-text">Sale analysis</h1>
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
        max="20"
        v-model="maxBarShownOnnChart"
      />
    </div>
    <div class="chart-container">
      <div class="best-selling" id="plot-container" v-show="showChartElement">
        <span
          class="axis-text"
          v-for="(i, index) in bestSells"
          :key="i.product_id"
          :style="{
            left: (index + 0.5) * distanceBetweenBar + padding + 'px',
            top: fieldHeight - padding + 'px',
            width: distanceBetweenBar * 0.8 + 'px',
          }"
          >{{ i.product_name }}
        </span>
      </div>
    </div>

    <div class="report">
      <h2 class="formal-text">Order summary</h2>
      <p v-for="(value, index) in saleData" :key="index">
        <span class="item">{{ index }}:</span>
        <span class="detail">{{value}} </span>
      </p>
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { GET_REPORT_DATA } from "../store/actions.type";
import {
  RESET_DATA,
  SET_ERRORS,
  SET_GET_REPORT_FAIL,
} from "../store/mutations.type";
// import { GET_REPORT_DATA } from "../store/actions.type";
import * as d3 from "d3";
import { calculateXdistanceBetweenBar } from "../common/helper";
export default {
  setup() {
    const store = useStore();
    const maxBarShownOnnChart = ref(3);
    const fieldWidth = 750;
    const fieldHeight = 320;
    const barWidth = 20;
    const padding = 60;
    const saleData = computed(() => {
      const objectFromStore=store.state.analysisModule.saleData;
      const outputObject={};
      for (const key in objectFromStore) {
        outputObject[key.split("_").join(" ")]=objectFromStore[key];
      }
      return outputObject;
    });
    const bestSells = computed(() =>
      store.state.analysisModule.bestSells.slice(0, maxBarShownOnnChart.value)
    );

    const distanceBetweenBar = computed(() => {
      const numberOfBar = store.state.analysisModule.bestSells.slice(
        0,
        maxBarShownOnnChart.value
      ).length;
      return calculateXdistanceBetweenBar(fieldWidth, padding, numberOfBar);
    });
    const convertToISOformat = (timeValue) => {
      const time = new Date(timeValue);
      const offset = time.getTimezoneOffset();
      const isoTime = new Date(time.getTime() - offset * 60 * 1000);
      const desiredTime = isoTime
        .toISOString()
        .split(".")[0]
        .split("T")
        .join(" ");
      console.log(desiredTime);
      return desiredTime;
    };
    const showChartElement = ref(false);
    const startTime = ref("");
    const endTime = ref("");
    const startTimeInDesiredFormat = ref("");
    const endTimeInDesiredFormat = ref("");
    const showResultMessage = ref(null);
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

    const getReport = () => {
      showChartElement.value = false;
      showResultMessage.value = false;
      store.commit(`analysisModule/${RESET_DATA}`);
      //check empty time input
      if (
        startTimeInDesiredFormat.value === "" ||
        endTimeInDesiredFormat.value === ""
      ) {
        store.commit(`analysisModule/${SET_ERRORS}`, {
          data: ["You must choose both start & end time"],
        });
        store.commit(`analysisModule/${SET_GET_REPORT_FAIL}`);
        return;
      }

      //check invalid time duration
      if (
        new Date(startTime.value).getTime() >= new Date(endTime.value).getTime()
      ) {
        store.commit(`analysisModule/${SET_ERRORS}`, {
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
        .then((r) => {
          d3.selectAll("svg").remove();
          const bestSellsToShow = r.bestSellsData.slice(
            0,
            maxBarShownOnnChart.value
          );
          const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(bestSellsToShow, (d) => d.amount_sold)])
            .range([fieldHeight - padding, padding]);
          const yAxis = d3.axisLeft(yScale);
          const plotField = d3
            .select(".best-selling")
            .append("svg")
            .attr("width", fieldWidth)
            .attr("height", fieldHeight)
            .attr("class", "plot-field");
          plotField
            .selectAll("rect")
            .data(bestSellsToShow)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("height", (d) => yScale(d.amount_sold))
            .attr("width", barWidth)
            .attr(
              "x",
              (d, i) =>
                padding -
                barWidth / 2 +
                (i + 0.5) *
                  calculateXdistanceBetweenBar(
                    fieldWidth,
                    padding,
                    bestSellsToShow.length
                  )
            )
            .attr("y", (d) => fieldHeight - yScale(d.amount_sold) - padding);

          plotField
            .append("g")
            .attr("transform", `translate(${padding},0)`)
            .attr("class", "axis")
            .call(yAxis);
          plotField
            .append("line")
            .attr("x1", padding)
            .attr("x2", fieldWidth - padding)
            .attr("y1", fieldHeight - padding)
            .attr("y2", fieldHeight - padding)
            .attr("stroke", "#02195f");
        })
        .then(() => {
          showChartElement.value = true;
        });
    };
    watch(startTime, (value) => {
      startTimeInDesiredFormat.value = convertToISOformat(value);
    });
    watch(endTime, (value) => {
      endTimeInDesiredFormat.value = convertToISOformat(value);
    });
    watch(maxBarShownOnnChart, () => (showChartElement.value = false));

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
      maxBarShownOnnChart,
      saleData,
      bestSells,
      fieldWidth,
      padding,
      fieldHeight,
      distanceBetweenBar,
      //for debug
      startTimeInDesiredFormat,
      endTimeInDesiredFormat,
      getReportSuccess,
    };
  },
};
</script>
<style lang="scss" scoped>
main {
  margin-bottom: 60px;
  padding: 1vh 2vw;
  h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    padding: 1rem 0;
  }
  .chart-container {
    width: 750px;
    height: 320px;
    margin: 0 auto 40px;
    background: $plotFieldColor;
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

  .best-selling {
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
