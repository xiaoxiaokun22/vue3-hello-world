<template>
<a-layout>
    <Header />
    <a-layout>
      <Sider :openKeysProp="openKeys" :selectedKeysProp="selectedKeys" />
      <a-layout style="padding: 0 10px 10px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>编辑活动</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            编辑活动
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

export default defineComponent({
    components:{
        Sider,
        Header,
    },
    setup() {
            const router = useRouter()
            const state = reactive({
                rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
                openKeys: ['sub3'],
                selectedKeys: ['/activitymanage/list'],
            })
            onMounted(async () => {
                // const {data:activityList} = await apiActivityList();
                // state.dataSource = activityList.data.list;
                // console.log(state.dataSource);
            })
            const onClick = (item) => {
                router.push(item.key);
            };
            return {   
                ...toRefs(state),
                collapsed: false,
                onClick
            };
    },
});
</script>

<style scoped>
</style>