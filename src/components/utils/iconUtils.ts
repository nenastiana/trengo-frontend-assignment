import * as LucideIcons from "lucide-vue-next";

export const getRandomIcon = () => {
    const iconKeys = Object.keys(LucideIcons);
    const randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    return LucideIcons[randomKey];
};



