<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <SidebarSection v-for="(section, index) in sidebar" :key="index" :title="section.title"
        :isActive="section.isActive" />
    </div>
    <button class="btn-conversation">
      <SquarePen class="icon-conversation" />
      <span>Create conversation</span>
    </button>
  </div>
</template>

<script setup>
import SidebarSection from "./SidebarSection.vue";
import { onMounted, ref } from "vue";
import { useStore } from "@/stores/useStore";

import * as Lucide from "lucide-vue-next";
const { SquarePen } = Lucide;

const store = useStore();
const sidebar = ref([]);

onMounted(async () => {
  await store.loadSidebar();
  sidebar.value = store.getSidebar();
});


</script>
