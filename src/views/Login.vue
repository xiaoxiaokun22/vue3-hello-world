<template>
    <div class = "login-wrap">
        <div class = "ant-col panel-container">
                    <a-form
                        layout="inline"
                        :model="formState"
                        @finish="handleFinish"
                        @finishFailed="handleFinishFailed"
                    >
                        <a-form-item>
                        <a-input v-model:value="formState.user" placeholder="Username">
                            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                        </a-form-item>
                        <a-form-item>
                        <a-input v-model:value="formState.password" type="password" placeholder="Password">
                            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                        </a-form-item>
                        <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            :disabled="formState.user === '' || formState.password === ''"
                        >
                            Log in
                        </a-button>
                        </a-form-item>
                    </a-form>

                </div>
    </div>
</template>

<script lang="ts">

    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
    import { defineComponent, reactive } from 'vue';
    import { message } from 'ant-design-vue';
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { loginRequest } from '../api/index.js';

    export default defineComponent({
        setup() {
            const router = useRouter();
            const route = useRoute();
            const store = useStore()
            const formState = reactive({
                user: 'admin',
                password: '12345',
            });
            const handleFinish = (values) => {
                let params = {
                    'email':formState.user,
                    'password':formState.password,
                };
                loginRequest(params)
                .then(response => {
                    let data = response.data;
                    let token = data.data.auth;
                    message.success("登录成功");
                    localStorage.setItem("ms_username", formState.user);
                    localStorage.setItem("token",token);
                    router.push("/dashboard");
                })
                .catch(error => {
                    //console.log(error);
                })

            };
            const handleFinishFailed = (errors) => {
                //console.log(errors);
            };
            return {
                formState,
                handleFinish,
                handleFinishFailed,
            };
        },
        components: {
            UserOutlined,
            LockOutlined,
        },
    });
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ant-col {
    position: relative;
    min-height: 1px;
}
.panel-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>