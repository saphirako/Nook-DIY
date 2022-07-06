import React from 'react'
import { Transition } from '@headlessui/react'
import Menu from 'components/Menu'
import Recipes from 'components/Recipes'
import SimpleBar from 'simplebar-react'
import 'static/stylesheets/simplebar.css'

export default class Craft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: this.props.recipes,
            selectedMaterials: {},
            filterPresets: {
                craftable: {
                    desc: 'Only show craftable recipes',
                    value: false,
                },
            },
            itemHasFocus: {
                value: false,
                item: null,
            },
        }
    }

    addMaterialToFilterList(newMaterial) {
        let { selectedMaterials } = this.state

        // If we already have this item in the list, return outright.
        if (newMaterial.name in Object.keys(selectedMaterials)) return false

        // If we reach this, it's a new material -- time to filter:
        // Add to list of matrials
        selectedMaterials[newMaterial.name] = newMaterial.count

        // Update the state
        this.setState((prevState) => ({
            ...prevState,
            selectedMaterials: selectedMaterials,
        }))

        return true
    }

    updateMaterialFilterList(material) {
        let { selectedMaterials } = this.state

        if (material.count === 0) delete selectedMaterials[material.name]
        else selectedMaterials[material.name] = material.count

        this.setState((prevState) => ({
            ...prevState,
            selectedMaterials: selectedMaterials,
        }))
    }

    focusItem(item, event) {
        this.setState(
            (prevState) => ({
                ...prevState,
                itemHasFocus: {
                    value: true,
                    item: item,
                },
            }),
            this.props.transition()
        )
    }

    render() {
        return window.screen.width >= 1024 ? (
            <div className="h-3/4">
                <SimpleBar className="h-full" autoHide={false}>
                    <Transition
                        as={React.Fragment}
                        appear={true}
                        show={this.props.isShowing}
                        enter="transform transition duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transform duration-300 transition ease-in-out"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-105"
                    >
                        <div className="flex flex-row justify-center place-items-stretch gap-x-10 mx-16 xl:mx-0">
                            <Recipes
                                recipes={this.props.recipes}
                                filterBy={this.state.selectedMaterials}
                                filterPresets={this.state.filterPresets}
                                focusItem={this.focusItem.bind(this)}
                                isShowing={this.props.isShowing}
                                transition={this.props.transition}
                            />
                            <Menu
                                addMaterialToFilterList={this.addMaterialToFilterList.bind(
                                    this
                                )}
                                updateMaterialFilterList={this.updateMaterialFilterList.bind(
                                    this
                                )}
                                filterPresets={this.state.filterPresets}
                                toggleFilter={(filterToToggle) => {
                                    // Update the state to match the values in the form
                                    this.setState((prevState) => ({
                                        filterPresets: {
                                            ...prevState.filterPresets,
                                            [filterToToggle]: {
                                                desc: prevState.filterPresets[
                                                    filterToToggle
                                                ].desc,
                                                value: !prevState.filterPresets[
                                                    filterToToggle
                                                ].value,
                                            },
                                        },
                                    }))
                                }}
                            />
                        </div>
                    </Transition>
                </SimpleBar>
                <p className="absolute inset-x-0 bottom-8 text-center">
                    a project by{' '}
                    <a
                        className="text-highlight"
                        href="https://www.twitch.tv/saphirako"
                    >
                        saphirako
                    </a>
                </p>
            </div>
        ) : (
            <p className="h-screen text-center font-bold flex flex-col px-8 justify-center">
                The craft page is currently unavailable for mobile users. Please
                use the Desktop verison or try again later!
            </p>
        )
    }
}
