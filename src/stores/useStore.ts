import { defineStore } from "pinia";
import type { SidebarItem, Item } from "../types/types";
import { loadSidebar } from '../services/dataService';


export const useStore = defineStore("channel", {
  state: () => ({
    sidebar: [] as SidebarItem[],
  }),

  getters: {
    getSidebar: (state) => () => {
      return state.sidebar;
    },
    getSidebarItemsByTitle: (state) => (title: string) => {
      return state.sidebar.find(item => item.title === title)?.items;
    }
  },

  actions: {
    async loadSidebar() {
      const data = await loadSidebar();
      this.sidebar = data;
    },

    updateData(title: string, items: Item[]) {
      const existingItem = this.sidebar.find(item => item.title === title);
      if (existingItem) {
        existingItem.items = items;
      } else {
        this.sidebar.push({ title, items });
      }
    },
  },
});
