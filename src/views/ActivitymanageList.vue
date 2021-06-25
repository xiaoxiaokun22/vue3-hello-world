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
            <div class="top">
                <div class="under" style="display: block;">
                    <div class="operate">
                        <a-button type="primary">新增活动</a-button>
                        <a-input-search 
                            placeholder="请输入活动名称/活动id"
                            v-model:value="keywords"
                            style="width: 220px; margin-left: auto;"
                            @search="onSearch"
                        />
                        <a-popover title="选择展示项" trigger="click" placement="bottom">
                            
                            <a-button><SelectOutlined />自定义列</a-button>
                            <template #content>
                                <a-checkbox-group v-model:value="selectedOptions" name="checkboxgroup" :options="plainOptions"  />
                            </template>
                        </a-popover>
                    </div>
                </div>
            </div>
            <a-table :columns="columns" :data-source="dataSource" :scroll="{ x:1800 }">
                <template #customTitle>
                    <span>
                        总预算
                        <a-tooltip placement="bottom">
                            <template #title>
                                <span>新增活动时输入的总预算，仅用作整体预算与总花费对比</span>
                            </template>
                            <QuestionCircleOutlined />
                        </a-tooltip>
                    </span>
                </template>
                <template #customTitle2>
                    <span>
                        MMA宏替换
                        <a-tooltip placement="bottom">
                            <template #title>
                                <span>开启后该活动下符合MMA宏标准的三方监测系统将进行替换，标准宏样例：__IMEI__, __IDFA__</span>
                            </template>
                            <QuestionCircleOutlined />
                        </a-tooltip>
                    </span>
                </template>
                <template #action>
                    <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(1)">编辑</a>
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
import { QuestionCircleOutlined, SelectOutlined } from '@ant-design/icons-vue';
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
        width: 100,
        slots:{  
            title:'customTitle',
        }
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
        width: 130,
        slots:{  
            title:'customTitle2',
        }
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
const plainOptions = ['活动周期','策略数','预算'];
export default defineComponent({
    components:{
        Sider,
        Header,
        QuestionCircleOutlined,
        SelectOutlined
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
                keywords: '',
                selectedOptions: [],
            })
            onMounted(async () => {
                const {data:activityList} = await apiActivityList();
                //处理返回数据
                let list = activityList.data.list;
                list.forEach(item => {
                    item.period = item.activityEndDate + '~' + item.activityStartDate;
                });
                state.dataSource = list;
            })
            const onSearch = (searchValue) => {
                console.log('use value', searchValue);
            };
            const onOpenChange = openKeys => {
                const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

                if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    state.openKeys = openKeys;
                } else {
                    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            };
            const handleEdit = (id) => {
                router.push('/activitymanage/edit');
            }
            return {   
                ...toRefs(state),
                collapsed: false,
                onOpenChange,
                handleEdit,
                onSearch,
                //
                plainOptions
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

.under {
    position: relative;
    width: 100%;
    height: 32px;
}
.under > .operate {
    top: 0;
    bottom: 0;
}
.top .under > * {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
}
.ant-checkbox-group-item {
    display: block!important;
}
</style>