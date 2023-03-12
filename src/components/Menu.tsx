import { Combobox, Switch } from '@headlessui/react'
import { useState } from 'react'
import { MaterialName } from './Recipe'
import { FilterPresetName, FilterPresetType } from './filters'
import materials from 'data/materials.json'
import { ChevronUpDownIcon, XCircleIcon } from '@heroicons/react/20/solid'

function MenuItem(materialName: MaterialName, materialImage: string, onClick: () => void) {
    return (
        <div key={materialName} className="flex flex-row">
            <img
                className="w-16 h-auto"
                src={materialImage}
                alt={'Inventory icon for ' + materialName + ' material.'}
            />
            <input className="rounded-md bg-brown text-center text-brown-700 font-semibold m-1 p-2 w-16 text-xl outline-none focus:outline-none peer" />
            <XCircleIcon
                className="w-8 h-8 relative -left-6 -top-2 text-red-500 opacity-0 hover:opacity-100 peer-hover:opacity-100 cursor-pointer transition-opacity duration-100 ease-in-out"
                onClick={() => onClick()}
            />
        </div>
    )
}

interface MenuProps {
    updateMaterialFilterList: (material: { name: MaterialName; count: number | null }) => void
    filterList: FilterPresetType
    toggleFilter: (filterToToggle: FilterPresetName) => void
}
export default function Menu(props: MenuProps) {
    const { updateMaterialFilterList, filterList, toggleFilter } = props
    const materialsList = Object.keys(materials).sort()

    const [selectedMaterials, setSelectedMaterials] = useState(Array<MaterialName>)
    const [possibleMatches, setPossibleMatches] = useState(materialsList)
    const [match, setMatch] = useState<MaterialName>()

    // Filter presents (toggles) options for further filtering query results
    let filterOptions =
        Object.keys(filterList).length > 0 ? (
            <div>
                <p className="text-2xl my-4">Filter Options</p>
                {Object.keys(filterList).map((filter: FilterPresetName) => (
                    <div key={filter} className="w-full flex flex-row items-center gap-4">
                        <Switch
                            checked={filterList[filter].value}
                            onChange={(ev) => toggleFilter(filter)}
                            className={`${
                                filterList[filter].value ? 'bg-brown-600' : 'bg-brown'
                            } relative inline-flex items-center h-6 rounded-full w-11 hover:bg-brown-400  focus:outline-none`}
                        >
                            <span className="sr-only" />
                            <span
                                className={`${
                                    filterList[filter].value ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-gray-100 rounded-full`}
                            />
                        </Switch>
                        <p className="w-auto font-light max-w-md">{filterList[filter].desc}</p>
                    </div>
                ))}
            </div>
        ) : null

    return (
        <div className="justify-start sticky mt-4 pr-12 flex flex-col gap-y-4 justify-items-start w-full max-w-lg">
            <div>
                <p className="text-2xl my-4">Select Materials</p>
                <Combobox
                    value={match}
                    onChange={(material: MaterialName) => {
                        updateMaterialFilterList({ name: material, count: null })
                        setSelectedMaterials((prevSelectedMaterials) => [
                            ...prevSelectedMaterials,
                            material,
                        ])
                        setMatch(material)
                        setPossibleMatches(materialsList)
                    }}
                >
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-sm outline-none focus:outline-none sm:text-sm">
                            <Combobox.Input
                                // displayValue={(displayMaterials: Array<MaterialName>) =>
                                //     possibleMatches.length > 0
                                //         ? 'Enter a material name to filter results'
                                //         : possibleMatches.join(',')
                                // }
                                className={
                                    'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-brown text-gray-900 focus:outline-none outline-none'
                                }
                                onChange={(event) =>
                                    setPossibleMatches(
                                        materialsList.filter(
                                            (material: MaterialName) =>
                                                material.includes(event.target.value) &&
                                                !selectedMaterials.includes(material)
                                        )
                                    )
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-6 w-6 text-acnh-brown"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Combobox.Options
                            className={
                                'absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-brown py-1 text-base shadow-lg ring-1focus:outline-none sm:text-sm'
                            }
                        >
                            {possibleMatches
                                .filter((pm: MaterialName) => !selectedMaterials.includes(pm))
                                .map((material) => (
                                    <Combobox.Option
                                        className={'cursor-pointer'}
                                        key={material}
                                        value={material as MaterialName}
                                    >
                                        {material}
                                    </Combobox.Option>
                                ))}
                        </Combobox.Options>
                    </div>
                </Combobox>
            </div>
            <div>
                {selectedMaterials.map((individualMaterial: MaterialName) =>
                    MenuItem(individualMaterial, materials[individualMaterial], () => {
                        updateMaterialFilterList({ name: individualMaterial, count: 0 })
                        setSelectedMaterials(
                            selectedMaterials.filter(
                                (selectedMaterial) => selectedMaterial !== individualMaterial
                            )
                        )
                    })
                )}
            </div>
            {filterOptions}
        </div>
    )
}
