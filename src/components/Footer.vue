<script setup>
import { storeToRefs } from "pinia";

// Stores
import { useSkinStore } from "../pinia/Skin";

// Skin store
const skin = useSkinStore();
await skin.init();
const { sitename } = storeToRefs(skin);

// Static data
const year = new Date().getFullYear();
</script>

<template>
    <div class="footer">
        <div>Copyright © {{ year }} {{ sitename || "vMark" }}</div>
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
