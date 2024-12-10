import axios from "axios";
import type { SidebarItem } from "../types/types";
import * as LucideIcons from "lucide-vue-next";


export const loadSidebar = async (): Promise<SidebarItem[]> => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axios.get(`${baseURL}/src/data/sidebar.json`);
        const data = response.data;
        return data.map((sidebarItem: SidebarItem) => ({
            ...sidebarItem,
            items: sidebarItem.items.map((item: any) => ({
                ...item,
                icon: LucideIcons[item.icon],
            })),
        })) as SidebarItem[];
    } catch (error) {
        console.error("Error loading sidebar data:", error);
        return [];
    }
};