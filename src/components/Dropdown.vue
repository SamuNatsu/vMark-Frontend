<script setup>
// External properties
const props = defineProps({
    mainStyle: String,                  // Container style <String>
    buttonStyle: String,                // Button style <String>
    listStyle: String,                  // List style <String>
    itemDefaultStyle: String,           // Item default style <String>

    buttonInnerHtml: String,            // Button inner html <String>

    list: Array,                        // Item list <Array: Object> <Object: innerHtml, style, action>

    itemDefaultAction: {                // Item default action
        type: Function,
        required: true
    }
});
</script>

<template>
    <!-- Container -->
    <div class="dropdown" :style="mainStyle">
        <!-- Button -->
        <div class="dropdown__btn" :style="buttonStyle" v-html="buttonInnerHtml" />
        <!-- List -->
        <div class="dropdown__list" :style="listStyle">
            <!-- Item -->
            <a 
                v-for="(item, id) in list"
                v-html="item.innerHtml"
                class="dropdown__list__item"
                :style="item.style || itemDefaultStyle"
                href="#"
                @click="(item.action || itemDefaultAction)(item, id)"
            />
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
