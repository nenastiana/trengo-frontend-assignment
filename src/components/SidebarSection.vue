<template>
  <div class="section-container">
    {{ title }}
    <div class="add-button">
      <Popover v-if="isActive" :title="title" />
      <img :src="IconToggle" @click="toggleList" :class="{ 'rotate-180': isListVisible }" class="icon"
        alt="toggle-icon" />
    </div>
  </div>

  <div v-if="isListVisible && items" class="list-items">
    <div v-for="(item, index) in items" :key="index" class="item">
      <component :is="item.icon" class="icon" />
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@/stores/useStore";
import IconToggle from "../components/icons/IconToggle.svg";
import Popover from "./PopoverComponent.vue";

interface SidebarSectionProps {
  title: string;
  isActive?: boolean;
}
const props = defineProps<SidebarSectionProps>();
const store = useStore();

const items = computed(() => store.getSidebarItemsByTitle(props.title));
const isListVisible = ref(false);
const toggleList = () => {
  isListVisible.value = !isListVisible.value;
};

</script>

<style scoped></style>