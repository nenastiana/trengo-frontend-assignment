import { setActivePinia, createPinia } from "pinia";
import { useStore } from "../stores/useStore";
import { loadSidebar } from "../services/dataService";
import type { SidebarItem, Item } from "../types/types";

// Mock the loadSidebar function
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

jest.mock("../services/dataService", () => ({
    loadSidebar: jest.fn(),
}));

describe("useStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("initializes with an empty sidebar", () => {
        const store = useStore();
        expect(store.sidebar).toEqual([]);
    });

    it("getSidebar returns the sidebar", () => {
        const store = useStore();
        store.sidebar = [{ title: "Test", items: [] }];
        expect(store.getSidebar()).toEqual([{ title: "Test", items: [] }]);
    });

    it("getSidebarItemsByTitle returns items by title", () => {
        const store = useStore();
        store.sidebar = [{ title: "Test", items: [{ name: "Item 1", icon: "icon_name" }] }];
        expect(store.getSidebarItemsByTitle("Test")).toEqual([{ name: "Item 1", icon: "icon_name" }]);
    });

    it("loadSidebar fetches and sets the sidebar data", async () => {
        const store = useStore();
        const mockData: SidebarItem[] = [{ title: "Test", items: [{ name: "Item 1", icon: "icon_name" }] }];
        (loadSidebar as jest.Mock).mockResolvedValue(mockData as never);

        await store.loadSidebar();
        expect(store.sidebar).toEqual(mockData);
    });

    it("updateData updates existing items", () => {
        const store = useStore();
        store.sidebar = [{ title: "Test", items: [{ name: "Item 1", icon: "icon_name" }] }];
        const newItems: Item[] = [{ name: "Updated Item 1", icon: "updated_icon_name" }];

        store.updateData("Test", newItems);
        expect(store.sidebar).toEqual([{ title: "Test", items: newItems }]);
    });

    it("updateData adds new items if title does not exist", () => {
        const store = useStore();
        store.sidebar = [{ title: "Test", items: [{ name: "Item 1", icon: "icon_name" }] }];
        const newItems: Item[] = [{ name: "Updated Item 1", icon: "updated_icon_name" }];

        store.updateData("New Test", newItems);
        expect(store.sidebar).toEqual([
            { title: "Test", items: [{ name: "Item 1", icon: "icon_name" }] },
            { title: "New Test", items: newItems },
        ]);
    });
});