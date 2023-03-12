import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import Menu from 'components/Menu'
import Recipes from 'components/Recipes'
import SimpleBar from 'simplebar-react'
import 'static/stylesheets/simplebar.css'
import { MaterialName, Recipe } from 'components/Recipe'
import { FilterPresetType, DefaultFilterPresets, FilterPresetName } from 'components/filters'

interface CraftProps {
    recipes: Array<Recipe>
}

export default function Craft(props: CraftProps) {
    const { recipes } = props
    // State Management
    const [selectedMaterials, setSelectedMaterials] = useState<
        Partial<Record<MaterialName, number | null>>
    >({})
    const [filterPresets, setFilterPresets] = useState<FilterPresetType>(DefaultFilterPresets)
    const [itemHasFocus, setItemHasFocus] = useState({
        itemHasFocus: {
            value: false,
            item: null,
        },
    })

    //  Local functions
    const updateMaterialFilterList = (material: { name: MaterialName; count: number | null }) => {
        let newSelectedMaterials = selectedMaterials

        if (material.count === 0) delete newSelectedMaterials[material.name]
        else newSelectedMaterials[material.name] = material.count

        setSelectedMaterials({ ...newSelectedMaterials })
    }

    // Render
    return (
        <>
            <p className="font-bold text-center text-lg p-16 lg:hidden">
                The craft page is currently unavailable for mobile/tablet users. Please use the
                Desktop verison or try again later!
            </p>
            <div className="hidden lg:flex flex-1 basis-96 justify-between gap-x-10 overflow-hidden">
                <SimpleBar className="w-full" autoHide={false}>
                    <Recipes
                        recipes={recipes}
                        filterBy={selectedMaterials}
                        filterPresets={filterPresets}
                    />
                </SimpleBar>
                <Menu
                    updateMaterialFilterList={updateMaterialFilterList}
                    filterList={filterPresets}
                    toggleFilter={(filterToToggle: FilterPresetName) => {
                        const newFilterValue = {
                            [filterToToggle]: filterPresets[filterToToggle],
                        }
                        newFilterValue[filterToToggle].value = !newFilterValue[filterToToggle].value
                        // Update the state to match the values in the form
                        setFilterPresets({ ...filterPresets, ...newFilterValue })
                    }}
                />
            </div>
        </>
    )
}
