import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug')
}

interface Step {
    component: FunctionalComponent<{
        setNextStep: () => void
        setPreviousStep: () => void
    }>
}

const steps: Step[] = [
    {
        component: ({ setNextStep }) => (
            <div className='step-container'>
                <h1>Invest in changing the world</h1>
                <button
                    className='btn btn--large'
                    onClick={() => setNextStep()}
                >
                    Start doing good
                </button>
            </div>
        ),
    },
    {
        component: ({ setNextStep }) => (
            <div className='step-container'>
                <h1>Invest in changing the world</h1>
                <button
                    className='btn btn--large'
                    onClick={() => setNextStep()}
                >
                    Start doing good
                </button>
            </div>
        ),
    },
    {
        component: () => <div>step 3</div>,
    },
]

const ProgressBar: FunctionalComponent<{
    activeStep: number
    steps: Step[]
}> = ({ activeStep, steps }) => (
    <div className='progress-bar'>
        <div
            className='progress-bar__fill'
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
        <span className='progress-bar__step-notice'>
            {activeStep} of {steps.length} answered
            {/* derive this from # of fields filled instead, for back navigation */}
        </span>
    </div>
)

const App: FunctionalComponent = () => {
    const [activeStep, setActiveStep] = useState(0)
    const Step = steps[activeStep].component
    return (
        <div id='app'>
            <ProgressBar activeStep={activeStep} steps={steps} />
            <header>
                <h1>Give Simple</h1>
            </header>
            <Step
                setNextStep={() => setActiveStep(activeStep + 1)}
                setPreviousStep={() => setActiveStep(activeStep - 1)}
            />
        </div>
    )
}

export default App
