import { MaterialName } from 'components/Recipe'
import {
    DefaultFilterPresets,
    FilterByType,
    FilterPresetName,
    FilterPresetType,
} from 'components/filters'
import { createContext, useMemo, useState } from 'react'

interface ICraftContext {
    filterBy: FilterByType
    filterPresets: FilterPresetType
    toggleFilterPreset: (filter: FilterPresetName, newValue: boolean) => void
    changeFilterBy: (materialCount: FilterByType) => void
}
export const CraftContext = createContext<ICraftContext | undefined>(undefined)

export const CraftContextProvider = ({ children }: any) => {
    const [filterPresets, setFilterPresets] = useState<FilterPresetType>(DefaultFilterPresets)
    const [filterBy, setFilterBy] = useState<FilterByType>({})

    const toggleFilterPreset = (presetToToggle: FilterPresetName, newValue: boolean) => {
        console.log('hey, listen! ')
        setFilterPresets((prevFilterPresets) => ({
            ...prevFilterPresets,
            [presetToToggle]: { isOn: newValue, desc: prevFilterPresets[presetToToggle].desc },
        }))
    }

    const changeFilterBy = (filtersObject: FilterByType) => {
        setFilterBy((previousFilterBy) => {
            const newFilterBy = { ...previousFilterBy }

            // Since this will only be as big as the user-selected list, it's not expensive to loop this:
            // If the value is null, it means to remove the object from the filter list
            // Otherwise, we just update the number
            Object.keys(filtersObject).forEach((material: MaterialName) => {
                if (newFilterBy[material] === null) delete newFilterBy[material]
                else newFilterBy[material] = filtersObject[material]
            })

            return newFilterBy
        })
    }

    const contextObject = useMemo(
        () => ({ filterPresets, filterBy, changeFilterBy, toggleFilterPreset }),
        [filterPresets, filterBy]
    )
    return <CraftContext.Provider value={contextObject}>{children}</CraftContext.Provider>
}
