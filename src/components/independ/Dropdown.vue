<script setup>
// External properties
const props = defineProps({
    mainStyle: String,
    buttonStyle: String,
    listStyle: String,
    itemDefaultStyle: String,

    buttonInnerHtml: String,

    list: Array,

    itemDefaultAction: {
        type: Function,
        required: true
    }
});
</script>

<template>
    <div class="dropdown" :style="mainStyle">
        <div class="dropdown__btn" :style="buttonStyle" v-html="buttonInnerHtml" />
        <div class="dropdown__list" :style="listStyle">
            <a 
                v-for="(item, id) in list"
                class="dropdown__list__item"
                :style="item.style || itemDefaultStyle"
                href="#"
                @click="(item.action || itemDefaultAction)(item, id)"
                v-html="item.innerHtml" />
        </div>
    </div>
</template>

<style scoped>
    .dropdown {
        position: relative;
    }

    .dropdown__btn {
        cursor: pointer;
    }
    .dropdown:hover .dropdown__btn {
        background: #eee;
    }

    .dropdown__list {
        display: none;
        position: absolute;
    }
    .dropdown:hover .dropdown__list {
        display: block;
    }

    .dropdown__list__item {
        background: white;
        border: 1px solid lightgray;
        color: inherit;
        display: block;
        text-decoration: none;
    }
    .dropdown__list__item:hover {
        background-color: #eee;
    }

</style>
