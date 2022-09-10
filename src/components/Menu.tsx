import { Combobox, Switch } from '@headlessui/react'
import { useState } from 'react'
import { MaterialName } from './Recipe'
import { RecipeFilterPresests } from './Recipes'
import materials from 'data/materials.json'
import { ChevronUpDownIcon, XCircleIcon } from '@heroicons/react/20/solid'

// export default class Menu extends React.Component {
//     constructor(props) {
//         super(props)
//         this.giveCraftPageNewMaterial = this.props.addMaterialToFilterList
//         this.updateCraftPageMaterialFilter = this.props.updateMaterialFilterList
//         this.state = {
//             itemCount: 0,
//             materialList: {},
//             addedMaterials: null,
//         }
//     }

//     // Used to create the list of materials added by the user
//     generateMaterialList(materialList, targetMaterial) {
//         return Object.keys(materialList).map((material, index) => (
//             <MenuItem
//                 key={material}
//                 offset={index}
//                 materialName={material}
//                 isTarget={material === targetMaterial}
//                 materialImage={materialList[material].image}
//                 updateMaterialQuantity={this.updateMaterialQuantity.bind(this)}
//             />
//         ))
//     }

//     // Used by AutoComplete to add margin and get new materials for the list
//     addMaterialToList(materialName, materialImage) {
//         // Add the item to CraftPage's list
//         let updateNeeded = this.giveCraftPageNewMaterial({
//             name: materialName,
//             count: null,
//         })

//         // Keep a copy to guarantee correct value returned to AutoComplete
//         let { itemCount, materialList } = this.state

//         // If we're adding a new item, update the state and return count+1 to AutoComplete
//         if (updateNeeded) {
//             // Add the item to the materialList
//             materialList[materialName] = { image: materialImage, quantity: 0 }

//             // Update the Menu's visual representation
//             let newAddedMaterials = this.generateMaterialList(
//                 materialList,
//                 materialName
//             )

//             this.setState((prevState) => ({
//                 ...prevState,
//                 materialList: materialList,
//                 addedMaterials: newAddedMaterials,
//                 itemCount: Object.keys(materialList).length,
//             }))

//             return itemCount + 1
//         }

//         //  Otherwise, return same count ot AutoComplete
//         else return itemCount
//     }

//     // Used to add change material quanities in Recipe filtering (and remove )
//     updateMaterialQuantity(materialName, quantity) {
//         // Update CraftPage's list (for Recipes)
//         this.updateCraftPageMaterialFilter({
//             name: materialName,
//             count: quantity,
//         })

//         // Update the Menu's visual representation
//         let { materialList } = this.state
//         if (quantity === 0) delete materialList[materialName]
//         else materialList[materialName].quantity = quantity
//         let newAddedMaterials = this.generateMaterialList(materialList)

//         this.setState((prevState) => ({
//             ...prevState,
//             itemCount: Object.keys(materialList).length,
//             materialList: materialList,
//             addedMaterials: newAddedMaterials,
//         }))
//     }

//     render() {
//         // Create the list of filters to show below the material list
//         const filterList = Object.keys(this.props.filterPresets)

//         return (
//             <div className="hidden h-96 justify-between sticky top-4 lg:flex flex-col gap-y-4 justify-items-start w-full max-w-xs 2xl:max-w-lg my-4">
//                 <div className="rounded-xl bg-brown">
//                     {this.state.addedMaterials}
//                     <MenuAutoComplete
//                         addMaterialToList={this.addMaterialToList.bind(this)}
//                     />
//                 </div>

//                 {
//                     // Checkbox options for further filtering query results
//                     filterList.length > 0 ? (
//                         <div>
//                             <p className="text-2xl my-4">Filter Options</p>
//                             {filterList.map((filter) => (
//                                 <div
//                                     key={filter}
//                                     className="w-full flex flex-row items-center gap-4"
//                                 >
//                                     <Switch
//                                         checked={
//                                             this.props.filterPresets[filter]
//                                                 .value
//                                         }
//                                         onChange={(ev) =>
//                                             this.props.toggleFilter(filter)
//                                         }
//                                         className={`${
//                                             this.props.filterPresets[filter]
//                                                 .value
//                                                 ? 'bg-brown-600'
//                                                 : 'bg-brown'
//                                         } relative inline-flex items-center h-6 rounded-full w-11 hover:bg-brown-400  focus:outline-none`}
//                                     >
//                                         <span className="sr-only" />
//                                         <span
//                                             className={`${
//                                                 this.props.filterPresets[filter]
//                                                     .value
//                                                     ? 'translate-x-6'
//                                                     : 'translate-x-1'
//                                             } inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-gray-100 rounded-full`}
//                                         />
//                                     </Switch>
//                                     <p className="w-auto font-light max-w-md">
//                                         {this.props.filterPresets[filter].desc}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <></>
//                     )
//                 }
//             </div>
//         )
//     }
// }

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
    updateMaterialFilterList: (props: { name: MaterialName; count: number | null }) => boolean
    filterPresets: Partial<Record<RecipeFilterPresests, { desc: string; value: boolean }>>
    toggleFilter: (filterPreset: RecipeFilterPresests) => void
}
export default function Menu(props: MenuProps) {
    const { updateMaterialFilterList, filterPresets, toggleFilter } = props
    const filterList: Array<RecipeFilterPresests> = Object.keys(filterPresets).map(
        (key: string) => key as RecipeFilterPresests
    )
    const materialsList = Object.keys(materials).sort()

    const [selectedMaterials, setSelectedMaterials] = useState(Array<MaterialName>)
    const [possibleMatches, setPossibleMatches] = useState(materialsList)
    const [match, setMatch] = useState<MaterialName>()

    // // Used by AutoComplete to add margin and get new materials for the list
    // const addMaterialToList = (materialName, materialImage) => {
    //     // Add the item to CraftPage's list
    //     let updateNeeded = giveCraftPageNewMaterial({
    //         name: materialName,
    //         count: null,
    //     })

    //     // Keep a copy to guarantee correct value returned to AutoComplete
    //     let { itemCount, materialList } = this.state

    //     // If we're adding a new item, update the state and return count+1 to AutoComplete
    //     if (updateNeeded) {
    //         // Add the item to the materialList
    //         materialList[materialName] = { image: materialImage, quantity: 0 }

    //         // Update the Menu's visual representation
    //         let newAddedMaterials = this.generateMaterialList(
    //             materialList,
    //             materialName
    //         )

    //         this.setState((prevState) => ({
    //             ...prevState,
    //             materialList: materialList,
    //             addedMaterials: newAddedMaterials,
    //             itemCount: Object.keys(materialList).length,
    //         }))

    //         return itemCount + 1
    //     }

    //     //  Otherwise, return same count ot AutoComplete
    //     else return itemCount
    // }

    // Filter presents (toggles) options for further filtering query results
    const filterOptions =
        filterList.length > 0 ? (
            <div>
                <p className="text-2xl my-4">Filter Options</p>
                {filterList.map((filter) => (
                    <div key={filter} className="w-full flex flex-row items-center gap-4">
                        <Switch
                            checked={filterPresets[filter].value}
                            onChange={(ev) => toggleFilter(filter)}
                            className={`${
                                filterPresets[filter].value ? 'bg-brown-600' : 'bg-brown'
                            } relative inline-flex items-center h-6 rounded-full w-11 hover:bg-brown-400  focus:outline-none`}
                        >
                            <span className="sr-only" />
                            <span
                                className={`${
                                    filterPresets[filter].value ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-gray-100 rounded-full`}
                            />
                        </Switch>
                        <p className="w-auto font-light max-w-md">{filterPresets[filter].desc}</p>
                    </div>
                ))}
            </div>
        ) : null

    return (
        <div className="hidden h-96 justify-between sticky top-4 lg:flex flex-col gap-y-4 justify-items-start w-full max-w-xs 2xl:max-w-lg my-4">
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
                    nullable
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
