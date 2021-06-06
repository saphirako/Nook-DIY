import React, { Component } from 'react'

export default class SpeechBubble extends Component {
    render() {
        return (
            <div className="w-3/5 relative">
                <div className="absolute w-full top-8 bg-white rounded-full h-3/4"></div>
                <div className="absolute mx-auto left-8 right-8 self-center w-auto bottom-0 bg-white rounded-full h-2/5"></div>
                <p className={`w-56 ml-8 rounded-full capitalize p-4 bg-${this.props.color} text-3xl text-white text-center transform -rotate-3`}>{this.props.speaker}</p>
                <div className="w-4/5 relative mx-auto py-4 text-2xl leading-12 mb-6">{this.props.children}</div>
                {/* Background bubbles  */}
                <div></div>
            </div>
        )
    }
}
