<script setup>
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

import stores from "../pinia";

const route = useRoute();
const router = useRouter();

const i18n = stores.i18n;
const item = stores.item;

const { items, pageNav } = storeToRefs(item);

const pageNavLast = computed(()=>pageNav.value.last ? i18n.getLang("pageNav.last") : "");
const pageNavNext = computed(()=>pageNav.value.next ? i18n.getLang("pageNav.next") : "");
const pageNavJump = (page)=>{
    router.push({
        query: {
            ...route.query,
            p: "" + page
        }
    });
};

onBeforeRouteUpdate(async (to)=>{
    // Todo: update items
    pageNav.value.current = parseInt(to.query.p ?? "1");
    item.update(to.query);
});

onMounted(async ()=>{
    pageNav.value.current = parseInt(route.query.p ?? "1");
    await item.update(route.query);
})
</script>

<template>
    <!-- Showcase -->
    <div class="showcase">
        <!-- Item -->
        <div v-for="i in items" class="showcase__item">
            <div class="showcase__item__wrapper">
                <!-- Item image -->
                <div class="showcase__item__img">
                    <RouterLink :to="item.getItemLink(i.iid)" :title="i.name">
                        <img :src="item.getMainPic(i) || '/svg/item.svg'"/>
                    </RouterLink>
                </div>

                <!-- Item info -->
                <div class="showcase__item__info">
                    <!-- Item name -->
                    <div class="showcase__item__name">
                        <RouterLink :to="item.getItemLink(i.iid)" :title="i.name">
                            {{ i.name }}
                        </RouterLink>
                    </div>

                    <!-- Item price -->
                    <div v-html="item.getPrice(i)" class="showcase__item__price"></div>

                    <!-- Sold out -->
                    <div v-if="(i.remain === 0)" class="showcase__item__soldout">{{ i18n.getLang("message.item.sold_out") }}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- Page navigation -->
    <div class="page-nav" v-if="pageNav.last || pageNav.next">
        <!-- Previous page -->
        <div class="page-nav__btn"><RouterLink :to="pageNav.last || '#'">{{ pageNavLast }}</RouterLink></div>

        <!-- Page labels -->
        <div class="page-nav__label">
            <!-- First -->
            <div 
                class="page-nav__label__btn"
                :class="{'page-nav__label__btn--current': pageNav.current === 1}"
                @click="pageNavJump(1)"
            >
                1
            </div>

            <div v-if="pageNav.current > 3">...</div>

            <!-- Previous -->
            <div 
                v-if="pageNav.current > 2" 
                class="page-nav__label__btn"
                @click="pageNavJump(pageNav.current - 1)"
            >
                {{ pageNav.current - 1 }}
            </div>

            <!-- Current -->
            <div 
                v-if="pageNav.current !== 1 && pageNav.current != pageNav.total"
                class="page-nav__label__btn--current"
            >
                {{ pageNav.current }}
            </div>

            <!-- Next -->
            <div
                v-if="pageNav.total - pageNav.current > 1" 
                class="page-nav__label__btn"
                @click="pageNavJump(pageNav.current + 1)"
            >
                {{ pageNav.current + 1 }}
            </div>

            <div v-if="pageNav.total - pageNav.current > 2">...</div>

            <!-- Last -->
            <div 
                v-if="pageNav.total > 1"
                class="page-nav__label__btn"
                :class="{'page-nav__label__btn--current': pageNav.current === pageNav.total}"
                @click="pageNavJump(pageNav.total)"
            >
                {{ pageNav.total }}
            </div>
        </div>

        <!-- Next page -->
        <div class="page-nav__btn"><RouterLink :to="pageNav.next || '#'">{{ pageNavNext }}</RouterLink></div>
    </div>
</template>

<style scoped>
    .showcase {
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        flex-wrap: wrap;
        margin: 30px auto;
        padding: 20px;
        overflow: hidden;
        width: 70%;
    }

    .showcase__item {
        height: 350px;
        padding: 20px;
        width: 25%
    }

    .showcase__item__wrapper {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        width: 100%;
    }
    .showcase__item__wrapper:hover {
        box-shadow: gray 1px 1px 5px;
    }

    .showcase__item__img {
        border: 1px dashed gray;
        margin-top: 5%;
        max-height: 70%;
        overflow: hidden;
        width: 90%
    }

    .showcase__item__info {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 20%;
        margin-bottom: 5%;
        max-width: 90%;
    }

    .showcase__item__name {
        font-size: large;
        font-weight: bold;
        margin-bottom: 5px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .showcase__item__name>a {
        color: inherit;
        text-decoration: none;
    }
    .showcase__item__name>a:hover {
        text-decoration: underline;
    }

    .showcase__item__price {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .showcase__item__price::before {
        content: '¥'
    }

    .showcase__item__soldout {
        color: red;
        font-weight: bold;
    }

    .page-nav {
        align-items: center;
        background: #fff;
        border-radius: 20px;
        box-shadow: lightgray 1px 1px 5px;
        display: flex;
        justify-content: space-between;
        margin: 30px auto;
        padding: 20px;
        overflow: hidden;
        width: 70%;
    }

    .page-nav__label {
        display: flex;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .page-nav__label>div {
        margin: 0 10px;
        padding: 2px 5px;
    }

    .page-nav__label__btn {
        cursor: pointer;
    }
    .page-nav__label__btn:hover {
        background: gray;
        border-radius: 3px;
        color: white;
    }
    .page-nav__label__btn--current {
        background: gray;
        border-radius: 3px;
        color: white;
    }

    .page-nav__btn>a {
        color: inherit;
        font-weight: bold;
        text-decoration: none;
    }
    .page-nav__btn>a:hover {
        text-decoration: underline;
    }
</style>
