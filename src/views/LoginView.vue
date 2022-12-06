<script setup>
import { computed, ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { onBeforeRouteUpdate, useRouter } from "vue-router";

import stores from "../pinia";

// Components
import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// Rooter
const router = useRouter();

const i18n = stores.i18n;
const skin = stores.skin;
const user = stores.user;

const { title } = storeToRefs(skin);

// Set title
document.querySelector("title").innerHTML = (title.value.login || "Login - vMark");

// Warning
const message = ref("");
const warning = computed(()=>message.value === "" ? "" : i18n.getLang(message.value));

// Captcha
const captchaUrlVersion = ref(0);
const captchaUrl = computed(()=>vMarkBackendAPI + "api/auth/captcha?v=" + captchaUrlVersion.value);
const refresh = ()=>captchaUrlVersion.value = Math.trunc(Math.random() * 10000000);

// Login
const account = ref("");
const password = ref("");
const captcha = ref("");
const login = ()=>{
    message.value = "";

    if (!/^[0-9a-zA-Z_]{6,30}$/.test(account.value)) {
        message.value = "message.invalid.account";
        refresh();
        return;
    }
    if (!/^[0-9a-zA-Z._~!@#$^&*]{6,}$/.test(password.value)) {
        message.value = "message.invalid.password";
        refresh();
        return;
    }
    if (!/^[0-9A-Z]{4}$/.test(captcha.value.toUpperCase())) {
        message.value = "message.invalid.captcha";
        refresh();
        return;
    }
    let pass = CryptoJS.SHA256(password.value).toString();
    let capt = captcha.value.toUpperCase();

    user.login(account.value, pass, capt, message, router);
};
</script>

<template>
    <Topbar />
    <Header />

    <!-- Login container -->
    <div class="login-wrapper">
        <div class="login">
            <!-- Title -->
            <div class="login__title">{{ i18n.getLang("login.title") }}</div>

            <!-- Warning -->
            <div class="login__warning">{{ warning }}</div>

            <!-- Input -->
            <div class="login__input">
                <input type="text" :placeholder="i18n.getLang('login.account')" v-model="account"/>
                <input type="password" :placeholder="i18n.getLang('login.password')" v-model="password"/>
                <input type="text" :placeholder="i18n.getLang('login.captcha')" v-model="captcha"/>
            </div>

            <!-- Captcha -->
            <div class="login__captcha">
                <img :src="captchaUrl" @click="refresh"/>
                <div>{{ i18n.getLang('login.refresh') }}</div>
            </div>

            <!-- Submit -->
            <div><button class="login__submit" @click="login">{{ i18n.getLang("login.submit") }}</button></div>
        </div>
    </div>

    <Footer />
</template>

<style scoped>
    .login-wrapper {
        align-items: center;
        display: flex;
        justify-content: center;
        margin: 60px auto 250px auto;
    }

    .login {
        align-items: center;
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        width: 500px;
    }
    .login>div {
        margin: 10px auto;
    }

    .login__title {
        font-size: 2em;
        font-weight: bold;
    }

    .login__input {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    .login__input>input {
        border: 2px solid lightgray;
        border-radius: 10px;
        margin: 10px 0;
        outline: none;
        padding: 5px 10px;
        width: 60%;
    }
    .login__input>input:focus {
        border: 2px solid gray;
    }

    .login__captcha {
        align-items: center;
        display: flex;
    }
    .login__captcha>img {
        border: 1px solid lightgray;
        cursor: pointer;
        margin: 0 10px;
    }
    .login__captcha>div {
        color: gray;
        font-size: small;
        font-style: italic;
    }

    .login__warning {
        color: red;
        font-size: small;
        font-weight: bold;
    }

    .login__submit {
        border: none;
        border-radius: 20px;
        cursor: pointer;
        padding: 5px 15px;
    }
    .login__submit:hover {
        background: gray;
        color: white;
    }
</style>
