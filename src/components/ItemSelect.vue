<script setup>
import { ref } from 'vue';
import { useI18NStore } from '../pinia/I18N';

const props = defineProps(['max'])

const i18n = useI18NStore();
await i18n.init();

const count = ref(1);
const desc = ()=>{
    if (count.value > 1)
        --count.value;
};
const restrain = ()=>{
    if (!/^\d+$/.test(count.value)) {
        count.value = 1;
        return;
    }

    if (count.value < 1)
        count.value = 1;
    if (count.value > props.max)
        count.value = props.max;
};
const incr = ()=>{
    if (count.value < props.max)
        ++count.value;
}

defineExpose({count})
</script>

<template>
    <div class="wrapper">
        <div>{{ i18n.getLang("item_select.text").format(props.max) }}</div>
        <div class="selector">
            <div class="selector__desc" @click="desc">-</div>
            <input class="selector__input" type="text" v-model="count" @blur="restrain()"/>
            <div class="selector__incr" @click="incr">+</div>
        </div>
    </div>
</template>

<style scoped>
    .wrapper {
        margin: 10px 0;
    }

    .selector {
        display: flex;
        justify-content: center;
        margin: 10px 0;
        width: fit-content;
    }
    .selector>div {
        user-select: none;
    }
    .selector>div:hover {
        background: #000;
        color: #fff;
    }

    .selector__desc {
        border: 2px solid #000;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        cursor: pointer;
        font-size: 2em;
        font-weight: bolder;
        text-align: center;
        width: 50px;
    }
    .selector__input {
        border: 2px solid #000;
        border-left: none;
        border-right: none;
        outline: none;
        padding: 10px;
        text-align: center;
        width: 50px;
    }
    .selector__incr {
        border: 2px solid #000;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 2em;
        font-weight: bolder;
        cursor: pointer;
        text-align: center;
        width: 50px;
    }

</style>
