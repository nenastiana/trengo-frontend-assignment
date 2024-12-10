<template>
    <div class="relative group">
        <Plus class="tooltip-icon" />        
        <div class="tooltip-content">
            <div class="tooltip-box">
                Add {{ title }}
                <span class="tooltip-arrow"></span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import * as Lucide from "lucide-vue-next";
const { Plus } = Lucide;

interface Props {
    title: string;
}
defineProps<Props>();

</script>

<style scoped></style>
