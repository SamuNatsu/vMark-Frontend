<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useSkinStore } from "../stores/Skin";

// Skin store
const skin = useSkinStore();
await skin.init();
const { title } = storeToRefs(skin);

// Static data
const year = new Date().getFullYear();
</script>

<template>
    <div class="footer">
        <div>Copyright © {{ year }} {{ title.index || "vMark" }}</div>
    </div>
</template>

<style scoped>
    .footer {
        align-items: center;
        background: black;
        color: white;
        display: flex;
        height: 100px;
        justify-content: center;
        width: 100%;
    }
</style>
