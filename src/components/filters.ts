import { MaterialName } from "./Recipe";

export type FilterPresetName = "craftable" | "seasonal";
export type FilterPresetType = Partial<Record<FilterPresetName, { desc: string; isOn: boolean }>>;
export const DefaultFilterPresets: FilterPresetType = {
    craftable: {
        desc: "Only show craftable recipes",
        isOn: false,
    },
};

export type FilterByType = Partial<Record<MaterialName, number | null>>;
