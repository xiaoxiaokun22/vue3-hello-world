<template>
<a-layout>
    <Header />
    <a-layout>
      <Sider :openKeysProp="openKeys" :selectedKeysProp="selectedKeys" />
      <a-layout style="padding: 0 10px 10px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>活动管理</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <a-table :columns="columns" :data-source="dataSource" :scroll="{ x:1800 }">
                <template #action>
                    <a>action</a>
                </template>
            </a-table>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">

import { apiActivityList } from '../api/index.js';
import { useRoute, useRouter } from 'vue-router';
import { reactive,onMounted, onUnmounted,defineComponent,ref,toRefs } from 'vue';
import Sider  from '@/components/Sider.vue';
import Header  from '@/components/Header.vue';

const columns = [
    {
        key:'id', 
        dataIndex:'id',
        title:'ID',
        width: 50,
        fixed:'left'
    },
    {
        key:'name', 
        dataIndex:'name',
        title:'活动名称',
        width: 150,
        fixed:'left'
    },
    {
        key:'period', 
        dataIndex:'period',
        title:'活动周期',
        width: 125,
    },
    {
        key:'strategyCount', 
        dataIndex:'strategyCount',
        title:'策略数',
        width: 125,
    },
    {
        key:'totalBudget', 
        dataIndex:'totalBudget',
        title:'总预算',
        width: 100,
    },
    {
        key:'jointFrequencyControl', 
        dataIndex:'jointFrequencyControl',
        title:'联合频控',
        width: 125,
    },
    {
        key:'mma', 
        dataIndex:'mma',
        title:'MMA宏替换',
        width: 125,
    },
    {
        key:'modifyTime', 
        dataIndex:'modifyTime',
        title:'修改时间',
        width: 125,
    },
    {
        key:'totalCost', 
        dataIndex:'totalCost',
        title:'总花费',
        width: 100,
    },
    {
        key:'requestCount', 
        dataIndex:'requestCount',
        title:'请求数',
        width: 100,
    },
    {
        key:'bidCount', 
        dataIndex:'bidCount',
        title:'竞价数',
        width: 100,
    },
    {
        key:'exposeCount', 
        dataIndex:'exposeCount',
        title:'曝光数',
        width: 100,
    },
    {
        key:'clickCount', 
        dataIndex:'clickCount',
        title:'点击数',
        width: 100,
    },
    {
        key:'clickRate', 
        dataIndex:'clickRate',
        title:'点击率',
        width: 100,
    },
    {
        key:'CPC', 
        dataIndex:'CPC',
        title:'eCPC',
        width: 100,
    },
    {
        key:'CPM', 
        dataIndex:'CPM',
        title:'eCPM',
    },
    {
        title: '操作',
        key: 'action',
        width: 100,
        fixed:'right',
        slots: {
            customRender: 'action',
        },
    },
];
const dataSource = [];
export default defineComponent({
    components:{
        Sider,
        Header,
    },
    setup() {
            const router = useRouter()
            const state = reactive({
                // isLogin: false, // 是否已登录
                // loading: true
                rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
                openKeys: ['sub3'],
                selectedKeys: ['/activitymanage/list'],
                columns: columns,
                dataSource: dataSource,
            })
            onMounted(async () => {
                const {data:activityList} = await apiActivityList();
                state.dataSource = activityList.data.list;
                console.log(state.dataSource);
            })
            const onClick = (item) => {
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