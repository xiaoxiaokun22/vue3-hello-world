<template>
    <a-layout-sider width="200" style="background: #fff;">
        <a-menu
          mode="inline"
          :openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          :style="{ height: '100%', borderRight: 0 }"
          @click="onClick"
          @openChange="onOpenChange"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                首页
              </span>
            </template>
            <a-menu-item key="/dashboard">Dashboard</a-menu-item>
            <a-menu-item key="2">实时数据</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                策划
              </span>
            </template>
            <a-menu-item key="3">创建人群</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                活动
              </span>
            </template>
            <a-menu-item key="/activitymanage/list">活动管理</a-menu-item>
            <a-menu-item key="5">策略管理</a-menu-item>
            <a-menu-item key="6">创意管理</a-menu-item>
            <a-menu-item key="7">交易管理</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
</template>


<script lang="ts">

import { dashboardBrands,dashboardChart,dashboardStatistic } from '../api/index.js';
import { useRoute, useRouter } from 'vue-router';
import { reactive,onMounted, onUnmounted,defineComponent,ref,toRefs } from 'vue';

export default defineComponent({
  name:'Sider',
  props: {
      openKeysProp: Array,
      selectedKeysProp: Array,
  },
  setup(props) {
        const router = useRouter();
        console.log("==props==");
        console.log(props);
        const state = reactive({
            brands: [],
            chart: {},
            statistic:{},
            rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
            openKeys: props.openKeysProp,
            selectedKeys: props.selectedKeysProp,
        })
        const onClick = (item) => {
            console.log(item);
            router.push(item.key);
        };
        const onOpenChange = openKeys => {
            const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
            if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                state.openKeys = openKeys;
            } else {
                state.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        };
        return {   
            ...toRefs(state),
            collapsed: false,
            onClick,
            onOpenChange
        };
  },
});
</script>

<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

#app header .ant-row-flex {
    flex: 1;
    height: 100%;
    align-items: center;
}

.ant-layout, .ant-layout * {
    box-sizing: border-box;
}
.ant-row-flex-space-between {
    justify-content: space-between;
}
.ant-row-flex {
    display: flex;
    flex-flow: row wrap;
}
element.style {
}

.dsshboard-card__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 24px;
}
.dashborad-block {
    width: 32%;
    background: #fff;
    border-radius: 5px;
    padding: 24px;
    border: 1px solid #eee;
}

</style>