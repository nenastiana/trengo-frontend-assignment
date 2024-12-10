<template>
    <div class="relative inline-block">

        <ButtonAdd :title=title @click="openPopover" />

        <div v-if="isPopoverVisible" class="popover">

            <div class="input">
                <input v-model="inputValue" type="text" placeholder="Type to add channel..." @keydown.enter="addItem"
                    class="input-field" />
                <Plus class="input-icon" @click="addItem" />
            </div>

            <div v-if="items.length > 0">
                <Draggable v-model="items" item-key="id">
                    <template #item="{ element, index }">
                        <div class="items-container">
                            <GripVertical class="drag-icon" />
                            <component :is="element.icon" class="item-icon" />
                            {{ element.name }}
                            <img :src="IconDelete" alt="delete-icon" @click="removeItem(index)" class="delete-icon" />
                        </div>
                    </template>
                </Draggable>
            </div>

            <div class="btn-container">
                <button @click="closePopover" class="btn btn-transparent">Cancel</button>
                <button @click="updateData" class="btn btn-color">Apply</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@/stores/useStore";
import Draggable from "vuedraggable";

import * as Lucide from "lucide-vue-next";
const { Plus, GripVertical } = Lucide;

import IconDelete from "../components/icons/IconDelete.svg";
import ButtonAdd from "../components/ButtonAddComponent.vue";

import type { Item } from "../types/types";

import { getRandomIcon } from "./utils/iconUtils";

interface Props {
    title: string;
}
const props = defineProps<Props>();
const store = useStore();

const isPopoverVisible = ref(false);
const inputValue = ref("");
const items = ref<Item[]>([]);
const storeItems = computed(() => store.getSidebarItemsByTitle(props.title) || []);

const openPopover = () => {
    if (isPopoverVisible.value) {
        closePopover();
    } else {
        items.value = [...storeItems.value];
        isPopoverVisible.value = true;
    }
};

const closePopover = () => {
    isPopoverVisible.value = false;
    inputValue.value = "";
};

const addItem = () => {
    if (inputValue.value.trim() !== "") {
        items.value.unshift({
            name: inputValue.value.trim(),
            icon: getRandomIcon(),
        });
        inputValue.value = "";
    }
};
const removeItem = (index: number) => {
    items.value.splice(index, 1);
};

const updateData = () => {
    store.updateData(props.title, items.value);
    closePopover();
};

</script>

<style scoped></style>