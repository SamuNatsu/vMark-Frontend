<script setup>
// External properties
const props = defineProps({
    button: String,
    list: Array,
    style: Object,
    action: Function
});
</script>

<template>
    <div class="dropdown" :style="style.container">
        <div class="dropdown__btn" :style="style.button" v-html="button"></div>
        <div class="dropdown__list" :style="style.list">
            <a 
                class="dropdown__list__item" 
                :style="style.item" 
                href="#" 
                @click="props.action(item, id)"
                v-for="(item, id) in props.list"
                v-html="item"
            ></a>
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
