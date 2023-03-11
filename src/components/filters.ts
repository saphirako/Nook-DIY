export type FilterPresetName = 'craftable'
export type FilterPresetType = Partial<Record<FilterPresetName, { desc: string; value: boolean }>>
export const DefaultFilterPresets: FilterPresetType = {
    craftable: {
        desc: 'Only show craftable recipes',
        value: false,
    },
}
