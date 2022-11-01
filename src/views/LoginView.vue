<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useI18NStore } from "../stores/I18N";
import { useSkinStore } from "../stores/Skin";

// Components
import Topbar from "../components/Topbar.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// I18N store
const i18n = useI18NStore();
await i18n.init();

// Skin store
const skin = useSkinStore();
await skin.init();
const { title } = storeToRefs(skin);

// Set title
document.querySelector("title").innerHTML = (title.value.login || "Login - vMark");
</script>

<template>
    <Topbar />
    <Header />

    <!-- Login container -->
    <div class="login-wrapper">
        <div class="login">
            <!-- Title -->
            <div class="login__title">{{ i18n.getLang("login.title") }}</div>

            <!-- Input -->
            <div class="login__input">
                <input type="text" :placeholder="i18n.getLang('login.account')"/>
                <input type="password" :placeholder="i18n.getLang('login.password')"/>
            </div>

            <!-- Submit -->
            <button class="login__submit">{{ i18n.getLang("login.submit") }}</button>
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
