<template>
  <div class="order-management">
    <div class="background"></div>
    <div class="dashboard">
      <h1 class="formal-text">Order Management</h1>
      <button class="exit" @click="exit">⨯</button>
      <div class="row1">
        <div class="time-picker">
          <div class="time-picker-row1">
            <div class="start">
              <label for="start">Start</label>
              <input type="datetime-local" id="start" v-model="startTime" />
            </div>
            <div class="end">
              <label for="end">End</label>
              <input type="datetime-local" id="end" v-model="endTime" />
            </div>
          </div>
          <div class="warning-place-holder">
            <div class="warning" v-show="showResultMesage">
              <p v-for="(p, index) in resultMessage" :key="index">
                {{ p }}
              </p>
            </div>
          </div>
        </div>
        <button class="big-button" @click="getData">Get data</button>
      </div>
      <div class="data row2">
        <table
          class="orders"
          :style="{ width: showOrderDetail ? '65%' : '100%' }"
        >
          <tr>
            <th
              v-for="(h, index) in orderManagementDataHeadings"
              :key="index"
              :id="h"
              @click="setSortField"
              :class="[
                currentSortField == h ? 'active' : '',
                currentSortDirection == 1 ? 'down' : 'up',
              ]"
            >
              {{ h }}
            </th>
          </tr>
          <tbody>
            <table-row-comp
              v-for="od in orderManagementData"
              :key="od.OrderID"
              :data="od"
            />
          </tbody>
        </table>
        <div class="detail-info" v-show="showOrderDetail">
          <div class="customer section">
            <div
              class="info-line"
              v-for="(value, title) in currentOrderCustomerInfo"
              :key="title"
            >
              <span class="title">{{ title }}</span>
              <span class="value">{{ value }}</span>
            </div>
          </div>
          <div class="order-details section">
            <table class="order-details">
              <tr>
                <th v-for="(hd, name) in currentOrderDetails[0]" :key="name">
                  {{ name }}
                </th>
              </tr>
              <table-row-comp
                v-for="item in currentOrderDetails"
                :key="item.ProductVarianceID"
                :data="item"
              />
            </table>
          </div>
          <button class="close" @click="closeOrderDetails">⨯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertToISOformat } from "../common/helper";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { GET_ORDER_MANAGEMENT_DATA } from "../store/actions.type";
import {
  CLEAR_CURRENT_ORDER_ID,
  SET_ORDER_MANAGEMENT_DATA_FAIL,
  SET_STATUS,
  CLEAR_STATUS,
  SET_SORT_FIELD,
  TOGGLE_SORT_DIRECTION,
  HIDE_ORDER_DETAILS,
} from "../store/mutations.type";
import TableRowComp from "../components/TableRowComp.vue";
import { useRouter } from "vue-router";
export default {
  components: { TableRowComp },
  setup() {
    const store = useStore();
    const startTime = ref("");
    const endTime = ref("");
    const router = useRouter();
    const showResultMesage = ref(false);
    const startTimeInDesiredFormat = computed(() =>
      convertToISOformat(startTime.value)
    );
    const endTimeInDesiredFormat = computed(() =>
      convertToISOformat(endTime.value)
    );
    const orderManagementDataHeadings = computed(
      () => store.getters[`orderManagementModule/orderManagementDataHeadings`]
    );
    const orderManagementData = computed(
      () => store.getters[`orderManagementModule/orderManagementDataToShow`]
    );
    const currentOrderCustomerInfo = computed(
      () => store.getters[`orderManagementModule/currentOrderCustomerInfo`]
    );
    const currentOrderDetails = computed(
      () => store.getters[`orderManagementModule/currentOrderDetails`]
    );
    const showOrderDetail = computed(
      () => store.state.orderManagementModule.showOrderDetail
    );
    const resultMessage = computed(
      () => store.state.orderManagementModule.resultMessage
    );
    const currentSortField = computed(
      () => store.state.orderManagementModule.sortField
    );
    const currentSortDirection = computed(
      () => store.state.orderManagementModule.sortDirection
    );
    const setSortField = (e) => {
      console.log(e.target.id);
      const sortField = e.target.id;
      if (sortField == currentSortField.value) {
        store.commit(`orderManagementModule/${TOGGLE_SORT_DIRECTION}`);
        return;
      } else {
        store.commit(`orderManagementModule/${SET_SORT_FIELD}`, sortField);
      }
    };

    const getData = () => {
      store.commit(`orderManagementModule/${CLEAR_STATUS}`);
      showResultMesage.value = false;
      if (
        startTimeInDesiredFormat.value === "" ||
        endTimeInDesiredFormat.value === ""
      ) {
        store.commit(`orderManagementModule/${SET_STATUS}`, {
          data: ["You must choose both start & end time"],
        });
        store.commit(`orderManagementModule/${SET_ORDER_MANAGEMENT_DATA_FAIL}`);
        return;
      }

      //check invalid time duration
      if (
        new Date(startTime.value).getTime() >= new Date(endTime.value).getTime()
      ) {
        store.commit(`orderManagementModule/${SET_STATUS}`, {
          data: ["Invalid time duration,"],
        });
        store.commit(`orderManagementModule/${SET_ORDER_MANAGEMENT_DATA_FAIL}`);
        return;
      }
      const payload = {
        start: startTimeInDesiredFormat.value,
        end: endTimeInDesiredFormat.value,
      };
      store.dispatch(
        `orderManagementModule/${GET_ORDER_MANAGEMENT_DATA}`,
        payload
      );
    };
    const clearCurrentOrderID = () => {
      store.commit(`orderManagementModule/${CLEAR_CURRENT_ORDER_ID}`);
    };
    const getOrderDataSuccess = computed(
      () => store.state.orderManagementModule.getOrderDataSuccess
    );

    const closeOrderDetails = () => {
      store.commit(`orderManagementModule/${HIDE_ORDER_DETAILS}`);
    };

    const exit = () => {
      router.push({ path: `/analysis` });
    };

    watch(
      getOrderDataSuccess,
      () => {
        showResultMesage.value = true;
      },
      { deep: true }
    );

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
      getData,
      orderManagementDataHeadings,
      orderManagementData,
      clearCurrentOrderID,
      closeOrderDetails,exit,
      setSortField,
      resultMessage,
      currentOrderDetails,
      currentOrderCustomerInfo,
      showOrderDetail,
      showResultMesage,
      currentSortDirection,
      currentSortField,
      //debug
      startTimeInDesiredFormat,
      endTimeInDesiredFormat,
      getOrderDataSuccess,
    };
  },
};
</script>

<style lang="scss" scoped>
.order-management {
  .dashboard {
    position: fixed;
    width: 90%;
    height: 90vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fafafa;
    z-index: 1300;
    border-radius: 1vw;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border: 1px solid rgba(128, 128, 128, 0.5);
    h1 {
      font-size: 1.5rem;
      text-align: center;
      text-transform: uppercase;
    }
    button.exit {
      position: absolute;
      background: none;
      border: none;
      top: 15px;
      right: 15px;
      font-size: 200%;
      color:red;
      display: block;width: 30px;height: 30px;
      line-height: 30px;
      padding:0;
      outline: none;
    }
    .row1 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1rem 2rem;
      border-radius: 10px;
      background-color: white;
      border: 1px solid rgba(128, 128, 128, 0.5);
      margin-bottom: 10px;
      .time-picker {
        width: 70%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        > div.time-picker-row1 {
          width: 100%;
          display: flex;
          justify-content: space-around;
          div {
            width: 40%;
            label {
              display: block;
              padding: 0.2rem 1rem;
              font-weight: bold;
              font-size: 1.1rem;
              text-align: center;
              color: black;
            }
            input {
              display: block;
              width: 100%;
              padding: 0.2rem 0.5rem;
              font-size: 0.8rem;
              text-align: center;
              background-color: rgb(252, 252, 252);
              border: 1px solid darkgrey;
              border-radius: 5px;
            }
          }
        }
        .warning-place-holder {
          margin-top: 10px;
          min-height: 40px;
          p {
            font-size: 0.9rem;
          }
        }
      }
      button.big-button {
        background-color: rgb(83, 83, 83);
        margin-left: 10px;
        width: 40%;
      }
    }
    .data.row2 {
      height: 58vh;
      overflow: auto;
      background-color: white;
      padding: 0.5rem;
      border-radius: 10px;
      position: relative;
      border: 1px solid rgba(128, 128, 128, 0.5);
      table.orders {
        color: $color1;
        // height: 100%;
        table-layout: auto;
        tr {
          height: 10px;
        }
        th {
          font-size: 0.7rem;
          text-align: center;
          cursor: pointer;
          position: relative;
        }
        th.active.up {
          &::after {
            content: "→";
            position: absolute;
            transform: rotate(-90deg);
          }
        }
        th.active.down {
          &::after {
            content: "→";
            position: absolute;
            transform: rotate(90deg);
          }
        }
      }
      .detail-info {
        width: 30%;
        color: $color1;
        background-color: $color2;
        border-radius: 10px;
        border: 1px solid darkgrey;
        // box-shadow: 0 0 10px darkgrey;
        margin: 10px;
        height: 60%;
        padding: 0.5rem;
        position: fixed;
        right: 2rem;
        bottom: 3%;
        .customer {
          padding: 0.5rem;
          border-radius: 5px;
          span.title {
            font-size: 0.7rem;
            text-transform: capitalize;
            display: inline-block;
            margin-right: 0.5rem;
            font-weight: bold;
            text-decoration: underline;
            &::after {
              content: ":";
            }
            &::before {
              content: "·";
              display: inline-block;
              margin-right: 0.1rem;
            }
          }
          span.value {
            font-size: 0.7rem;
            text-transform: capitalize;
            display: inline;
          }
        }
        .order-details {
          table.order-details {
            table-layout: auto;
            width: 100%;
            //  background-color: $color2;
            td,
            th {
              font-size: 0.7rem;
              color: $color1;
              text-align: center;
            }
          }
        }
        button.close {
          position: absolute;
          top: 2%;
          right: 5%;
          color: red;
          outline: none;
          display: block;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>