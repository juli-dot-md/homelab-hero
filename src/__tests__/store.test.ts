import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useSheetStore } from "../store";

beforeEach(() => {
  localStorage.clear();
  useSheetStore.setState({ sheet: null, isDirty: false });
});

afterEach(() => {
  localStorage.clear();
});

describe("useSheetStore", () => {
  describe("createNew", () => {
    it("creates a new sheet with default values", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      expect(result.current.sheet).not.toBeNull();
      expect(result.current.sheet?.name).toBe("My Homelab");
      expect(result.current.sheet?.hardware).toEqual([]);
    });

    it("initialises all 8 stat keys as empty strings", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      const { stats } = result.current.sheet!;
      expect(stats.scalability).toBe("");
      expect(stats.reliability).toBe("");
      expect(stats.cost).toBe("");
      expect(stats.cloudIndependence).toBe("");
      expect(stats.security).toBe("");
      expect(stats.monitoring).toBe("");
      expect(stats.backupStrategy).toBe("");
      expect(stats.deployment).toBe("");
    });

    it("persists new sheet to localStorage", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      expect(localStorage.getItem("homelab-hero-sheet")).not.toBeNull();
    });
  });

  describe("updateField", () => {
    it("updates a top-level field", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateField("name", "Mike's Homelab"));
      expect(result.current.sheet?.name).toBe("Mike's Homelab");
    });

    it("marks sheet as dirty after update", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateField("description", "Some desc"));
      expect(result.current.isDirty).toBe(true);
    });
  });

  describe("updateStat", () => {
    it("updates a stat field", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateStat("reliability", "Glued together, my baby"));
      expect(result.current.sheet?.stats.reliability).toBe("Glued together, my baby");
    });

    it("does not overwrite other stat fields", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateStat("cost", "$40/mo"));
      act(() => result.current.updateStat("deployment", "By hand, with love"));
      expect(result.current.sheet?.stats.cost).toBe("$40/mo");
      expect(result.current.sheet?.stats.deployment).toBe("By hand, with love");
    });

    it("marks sheet as dirty", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateStat("scalability", "Vertical only"));
      expect(result.current.isDirty).toBe(true);
    });

    it("persists to localStorage", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateStat("security", "Tailscale and a prayer"));
      const stored = JSON.parse(localStorage.getItem("homelab-hero-sheet")!);
      expect(stored.stats.security).toBe("Tailscale and a prayer");
    });
  });

  describe("addHardware / removeHardware", () => {
    it("adds a hardware component", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.addHardware());
      expect(result.current.sheet?.hardware).toHaveLength(1);
    });

    it("removes a hardware component by id", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.addHardware());
      const id = result.current.sheet!.hardware[0].id;
      act(() => result.current.removeHardware(id));
      expect(result.current.sheet?.hardware).toHaveLength(0);
    });

    it("updates a hardware component field", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.addHardware());
      const id = result.current.sheet!.hardware[0].id;
      act(() => result.current.updateHardware(id, "name", "Dell R720"));
      expect(result.current.sheet?.hardware[0].name).toBe("Dell R720");
    });
  });

  describe("addService / removeService", () => {
    it("adds and removes a service", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.addService());
      expect(result.current.sheet?.services).toHaveLength(1);
      const id = result.current.sheet!.services[0].id;
      act(() => result.current.removeService(id));
      expect(result.current.sheet?.services).toHaveLength(0);
    });
  });

  describe("addCustomField / removeCustomField", () => {
    it("adds and removes a custom field", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.addCustomField());
      expect(result.current.sheet?.customFields).toHaveLength(1);
      const id = result.current.sheet!.customFields[0].id;
      act(() => result.current.removeCustomField(id));
      expect(result.current.sheet?.customFields).toHaveLength(0);
    });

    it("updates a custom field", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.addCustomField());
      const id = result.current.sheet!.customFields[0].id;
      act(() => result.current.updateCustomField(id, "label", "Power Draw"));
      expect(result.current.sheet?.customFields[0].label).toBe("Power Draw");
    });
  });

  describe("loadFromStorage", () => {
    it("restores a sheet from localStorage", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      act(() => result.current.updateField("name", "Restored Lab"));
      act(() => useSheetStore.setState({ sheet: null, isDirty: false }));
      act(() => result.current.loadFromStorage());
      expect(result.current.sheet?.name).toBe("Restored Lab");
    });

    it("does nothing if nothing in localStorage", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.loadFromStorage());
      expect(result.current.sheet).toBeNull();
    });
  });

  describe("loadFromJson", () => {
    it("loads a valid sheet from JSON", () => {
      const { result } = renderHook(() => useSheetStore());
      act(() => result.current.createNew());
      const json = JSON.stringify(result.current.sheet);
      act(() => useSheetStore.setState({ sheet: null, isDirty: false }));
      let success = false;
      act(() => {
        success = result.current.loadFromJson(json);
      });
      expect(success).toBe(true);
      expect(result.current.sheet).not.toBeNull();
    });

    it("returns false for invalid JSON", () => {
      const { result } = renderHook(() => useSheetStore());
      let success = true;
      act(() => {
        success = result.current.loadFromJson("not json");
      });
      expect(success).toBe(false);
      expect(result.current.sheet).toBeNull();
    });
  });
});
