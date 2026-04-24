import { create } from "zustand";
import type { HomelabSheet, StatKey } from "../types";
import { createComponent, createCustomField, createSheet, importJson } from "../utils";

const STORAGE_KEY = "homelab-hero-sheet";

type SheetStore = {
  sheet: HomelabSheet | null;
  isDirty: boolean;

  createNew: () => void;
  loadFromStorage: () => void;
  loadFromJson: (json: string) => boolean;
  save: () => void;

  updateField: <K extends keyof HomelabSheet>(field: K, value: HomelabSheet[K]) => void;
  updateStat: (key: StatKey, value: string) => void;

  addHardware: () => void;
  updateHardware: (id: string, field: "name" | "description", value: string) => void;
  removeHardware: (id: string) => void;

  addService: () => void;
  updateService: (id: string, field: "name" | "description", value: string) => void;
  removeService: (id: string) => void;

  addCustomField: () => void;
  updateCustomField: (id: string, field: "label" | "value", value: string) => void;
  removeCustomField: (id: string) => void;
};

function persist(sheet: HomelabSheet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sheet));
}

export const useSheetStore = create<SheetStore>((set, get) => ({
  sheet: null,
  isDirty: false,

  createNew: () => {
    const sheet = createSheet();
    persist(sheet);
    set({ sheet, isDirty: false });
  },

  loadFromStorage: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const result = importJson(raw);
    if (result.success) set({ sheet: result.data, isDirty: false });
  },

  loadFromJson: (json: string) => {
    const result = importJson(json);
    if (!result.success) return false;
    persist(result.data);
    set({ sheet: result.data, isDirty: false });
    return true;
  },

  save: () => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, updatedAt: new Date().toISOString() };
    persist(updated);
    set({ sheet: updated, isDirty: false });
  },

  updateField: (field, value) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, [field]: value };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  updateStat: (key, value) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, stats: { ...sheet.stats, [key]: value } };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  addHardware: () => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, hardware: [...sheet.hardware, createComponent()] };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  updateHardware: (id, field, value) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = {
      ...sheet,
      hardware: sheet.hardware.map((h) => (h.id === id ? { ...h, [field]: value } : h)),
    };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  removeHardware: (id) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, hardware: sheet.hardware.filter((h) => h.id !== id) };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  addService: () => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, services: [...sheet.services, createComponent()] };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  updateService: (id, field, value) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = {
      ...sheet,
      services: sheet.services.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  removeService: (id) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, services: sheet.services.filter((s) => s.id !== id) };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  addCustomField: () => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = { ...sheet, customFields: [...sheet.customFields, createCustomField()] };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  updateCustomField: (id, field, value) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = {
      ...sheet,
      customFields: sheet.customFields.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },

  removeCustomField: (id) => {
    const { sheet } = get();
    if (!sheet) return;
    const updated = {
      ...sheet,
      customFields: sheet.customFields.filter((f) => f.id !== id),
    };
    persist(updated);
    set({ sheet: updated, isDirty: true });
  },
}));
