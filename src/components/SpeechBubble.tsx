import { ReactElement } from 'react'

interface SpeechBubbleProps {
    color: string
    speaker: string
    children: ReactElement
}

export default function SpeechBubble(props: SpeechBubbleProps) {
    return (
        <div className="-mt-32 lg:mt-0 w-full lg:w-3/5 relative">
            <div className="absolute mx-auto left-2 right-2 w-auto lg:m-0 lg:w-full top-8 bg-white rounded-full h-3/4" />
            <div className="absolute mx-auto left-8 right-8 self-center w-auto bottom-0 bg-white rounded-full h-2/5" />
            <p
                className={
                    'w-2/5 lg:w-56 ml-8 rounded-full capitalize p-4 text-xl lg:text-3xl text-white text-center transform -rotate-3 ' +
                    props.color
                }
            >
                {props.speaker}
            </p>
            <div className="w-4/5 relative mx-auto py-4 px-6 lg:px-0 text-md leading-8 lg:text-2xl lg:leading-12 mb-6">
                {props.children}
            </div>
            {/* Background bubbles  */}
            <div></div>
        </div>
    )
}
