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
    return window.screen.width >= 1024 ? (
        <div className="h-3/4">
            <SimpleBar className="h-full" autoHide={false}>
                {/* <Transition
                    as={React.Fragment}
                    appear={true}
                    show={isShowing}
                    enter="transform transition duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transform duration-300 transition ease-in-out"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-105"
                > */}
                <div className="flex flex-row justify-center place-items-stretch gap-x-10 mx-16 xl:mx-0">
                    <Recipes
                        recipes={recipes}
                        filterBy={selectedMaterials}
                        filterPresets={filterPresets}
                    />
                    <Menu
                        updateMaterialFilterList={updateMaterialFilterList}
                        filterList={filterPresets}
                        toggleFilter={(filterToToggle: FilterPresetName) => {
                            const newFilterValue = {
                                [filterToToggle]: filterPresets[filterToToggle],
                            }
                            newFilterValue[filterToToggle].value =
                                !newFilterValue[filterToToggle].value
                            // Update the state to match the values in the form
                            setFilterPresets({ ...filterPresets, ...newFilterValue })
                        }}
                    />
                </div>
                {/* </Transition> */}
            </SimpleBar>
            <p className="absolute inset-x-0 bottom-8 text-center">
                a project by{' '}
                <a className="text-highlight" href="https://www.twitch.tv/saphirako">
                    saphirako
                </a>
            </p>
        </div>
    ) : (
        <p className="h-screen text-center font-bold flex flex-col px-8 justify-center">
            The craft page is currently unavailable for mobile users. Please use the Desktop verison
            or try again later!
        </p>
    )
}
