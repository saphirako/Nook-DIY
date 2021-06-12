import React, { Component } from 'react'
import SpeechBubble from 'components/SpeechBubble'
import saphirakosACCharacter from 'static/image/hero.png'
import { Transition } from '@headlessui/react'

export default class About extends Component {
    render() {
        return (
            <Transition
                as={React.Fragment}
                appear={this.props.isShowing}
                show={this.props.isShowing}
                enter="transform transition duration-300"
                enterFrom="opacity-10 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transform duration-300 transition ease-in-out"
                leaveFrom="opacity-100 scale-100 "
                leaveTo="opacity-0 scale-90 "
            >
                <div className="flex flex-col items-end lg:items-center justify-center h-full lg:h-auto">
                    <img className="w-64 mr-8 lg:mr-0" src={saphirakosACCharacter} alt="Saphirako's AC character"></img>
                    <SpeechBubble speaker="Saphirako" color="blue-500">
                        <p>NookDIY is a side project powered by React, Netlify, and a little bit of Python. If you notice a bug, would like to contribute to the project, or have questions, please feel free to reach out via the <a className="text-highlight font-semibold" href="https://github.com/saphirako/Nook-DIY/issues">Issues page on GitHub</a>.</p>
                    </SpeechBubble>
                </div>
            </Transition>
        )
    }
}
