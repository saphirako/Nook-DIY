import SpeechBubble from 'components/SpeechBubble'
import saphirakoCharacter from 'static/image/hero.png'
// const SaphirakoCharacter = require('static/image/hero.png') as string

export default function About() {
    return (
        <div className="flex flex-col items-end lg:items-center justify-center h-full lg:h-auto">
            <img src={saphirakoCharacter} className="w-64 mx-auto" alt="Saphirako's AC character" />
            <SpeechBubble speaker="Saphirako" color="bg-blue-500">
                <p>
                    NookDIY is a side project powered by React, Netlify, and a little bit of Python.
                    If you notice a bug, would like to contribute to the project, or have questions,
                    please feel free to reach out via the{' '}
                    <a
                        className="text-highlight font-semibold"
                        href="https://github.com/saphirako/Nook-DIY/issues"
                    >
                        Issues page on GitHub
                    </a>
                    .
                </p>
            </SpeechBubble>
        </div>
    )
}
