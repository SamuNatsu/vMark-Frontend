<script setup>
import { ref } from 'vue';
import { useI18NStore } from '../pinia/I18N';
import { cart } from "../modules/Cart"

const props = defineProps(['max', 'cur', 'cart', 'iid', 'update', 'refresh'])

const i18n = useI18NStore();
await i18n.init();

const count = ref(props.cur || 1);
const desc = ()=>{
    if (count.value > 1 || props.cart)
        --count.value;
    else 
        return
    if (props.cart)
        cart.del({iid: props.iid, count: 1})
    if (count.value === 0 && props.refresh) {
        props.refresh()
        return
    }
    if (props.update)
        props.update()
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
    if (props.cart)
        cart.set(props.iid, count.value)
    if (props.update)
        props.update()
};
const incr = ()=>{
    if (count.value < props.max)
        ++count.value;
    else 
        return
    if (props.cart)
        cart.add({iid: props.iid, count: 1})
    if (props.update)
        props.update()
}

defineExpose({count})
</script>

<template>
    <div class="selector__wrapper">
        <div>{{ i18n.getLang("item_select.text").format(props.max) }}</div>
        <div class="selector">
            <div class="selector__desc" @click="desc">-</div>
            <input class="selector__input" type="text" v-model="count" @blur="restrain()"/>
            <div class="selector__incr" @click="incr">+</div>
        </div>
    </div>
</template>

<style scoped>
    .selector__wrapper {
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
