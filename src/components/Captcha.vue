<script setup>
import { ref, computed, onMounted, defineExpose } from 'vue';
import { useI18NStore } from '../pinia/I18N';

const i18n = useI18NStore();
await i18n.init();

const v = ref(0);
const url = computed(()=>vMarkBackendAPI + "api/auth/captcha?v=" + v.value);

const refresh = ()=>v.value = Math.trunc(Math.random() * 1000000000);

onMounted(()=>refresh());

defineExpose({refresh})
</script>

<template>
    <div class="wrapper">
        <img class="img__captcha" :src="url" :alt="i18n.getLang('captcha.alt')" @click="refresh"/>
        <div class="text__refresh">{{ i18n.getLang("captcha.refresh") }}</div>
    </div>
</template>

<style scoped>
    .wrapper {
        align-items: center;
        display: flex;
    }
    .wrapper>*{
        margin: 0 10px;
    }
    .img__captcha {
        border: 1px solid lightgray;
        cursor: pointer;
    }
    .text__refresh {
        color: gray;
        font-size: small;
        font-style: italic;
        margin-left: 10px;
    }
</style>
