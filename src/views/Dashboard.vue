<template>
<a-layout>
    <Header />
    <a-layout style="display:flex;">
      <Sider :openKeysProp="openKeys" :selectedKeysProp="selectedKeys" />
      <a-layout style="padding: 0 10px 10px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <section class="dsshboard-card__container" style="display:flex;">
                <div class="dashborad-block">
                    <p>昨日曝光数</p>
                    <h3>{{statistic.exposure}}</h3>
                </div>
                <div class="dashborad-block">
                    <p>昨日点击数</p>
                    <h3>{{statistic.click}}</h3>
                </div>
                <div class="dashborad-block">
                    <p>昨日花费</p>
                    <h3>{{statistic.cost}}</h3>
                </div>
            </section>
            <section>
                
            </section>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">

import { dashboardBrands,dashboardChart,dashboardStatistic } from '../api/index.js';
import { useRoute, useRouter } from 'vue-router';
import { reactive,onMounted, onUnmounted,defineComponent,ref,toRefs } from 'vue';
import Sider  from '@/components/Sider.vue';
import Header  from '@/components/Header.vue';

export default defineComponent({
    components: {
        Sider,
        Header,
    },
    setup() {
            const router = useRouter()
            const state = reactive({
                // isLogin: false, // 是否已登录
                // loading: true
                brands: [],
                chart: {},
                statistic:{},
                rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
                openKeys: ['sub1'],
                selectedKeys: ['/dashboard'],
            })
            onMounted(async () => {
                const {data:brands} = await dashboardBrands();
                const {data:chart} = await dashboardChart();
                const {data:statistic} = await dashboardStatistic();
                state.brands = brands;
                state.chart = chart;
                state.statistic = statistic.data;
            })
            const onClick = (item) => {
                router.push(item.key);
            };
            const onOpenChange = openKeys => {
                console.log("==onOpenChange==");
                console.log(openKeys);
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