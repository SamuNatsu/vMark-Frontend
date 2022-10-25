<script setup>
import { defineAsyncComponent } from "vue";
import { RouterView } from "vue-router";
const asyncComp = defineAsyncComponent(RouterView);
</script>

<template>
    <Suspense>
        <RouterView />
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>
