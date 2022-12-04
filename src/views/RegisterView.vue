<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useI18NStore } from "../pinia/I18N";
import { useSkinStore } from "../pinia/Skin";

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
document.querySelector("title").innerHTML = (title.value.register || "Register - vMark");
</script>

<template>
    <Topbar />
    <Header />

    <!-- Login container -->
    <div class="register-wrapper">
        <div class="register">
            <!-- Title -->
            <div class="register__title">{{ i18n.getLang("register.title") }}</div>

            <!-- Input -->
            <div class="register__input">
                <div>
                    <input type="text" :placeholder="i18n.getLang('register.account.title')"/>
                    <div class="register__input__desc">{{ i18n.getLang('register.account.desc') }}</div>
                </div>
                <div>
                    <input type="password" :placeholder="i18n.getLang('register.password.title')"/>
                    <div class="register__input__desc">{{ i18n.getLang('register.password.desc') }}</div>
                </div>
            </div>

            <!-- Submit -->
            <button class="register__submit">{{ i18n.getLang("register.submit") }}</button>
        </div>
    </div>

    <Footer />
</template>

<style scoped>
    .register-wrapper {
        align-items: center;
        display: flex;
        justify-content: center;
        margin: 60px auto 250px auto;
    }

    .register {
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
    .register>div {
        margin: 10px auto;
    }

    .register__title {
        font-size: 2em;
        font-weight: bold;
    }

    .register__input {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    .register__input>div {
        margin-bottom: 20px;
        width: 80%;
    }
    .register__input>div>input {
        border: 2px solid lightgray;
        border-radius: 10px;
        margin: 10px 0;
        outline: none;
        padding: 5px 10px;
        width: 100%;
    }
    .register__input>div>input:focus {
        border: 2px solid gray;
    }

    .register__input__desc {
        color: gray;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: .7em;
    }

    .register__submit {
        border: none;
        border-radius: 20px;
        cursor: pointer;
        padding: 5px 15px;
    }
    .register__submit:hover {
        background: gray;
        color: white;
    }
</style>
