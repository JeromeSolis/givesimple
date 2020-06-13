import { Fragment, FunctionalComponent, h } from 'preact'
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
                <header className='question-header'>
                    <span>1</span>
                    <h2>
                        How much would you like to donate to charities per year?
                    </h2>
                </header>
                <input />
                <button className='btn' onClick={() => setNextStep()}>
                    Next
                </button>
            </div>
        ),
    },
    {
        component: () => <div>Results</div>,
    },
]

const ProgressBar: FunctionalComponent<{
    activeStep: number | undefined
    steps: Step[]
}> = ({ activeStep, steps }) =>
    typeof activeStep === 'number' ? (
        <div className='progress-bar'>
            <div
                className='progress-bar__fill'
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
            <span className='progress-bar__step-notice'>
                {activeStep} of {steps.length - 1} answered
                {/* derive this from # of fields filled instead, for back navigation */}
            </span>
        </div>
    ) : null

const StartScreen: FunctionalComponent<{ start: () => void }> = ({ start }) => (
    <div className='step-container'>
        <h1>Invest in changing the world</h1>
        <button className='btn btn--large' onClick={start}>
            Start doing good
        </button>
    </div>
)

const FormStepper: FunctionalComponent = () => {
    const [activeStep, setActiveStep] = useState(0)
    const Step = steps[activeStep].component
    return (
        <Fragment>
            <ProgressBar activeStep={activeStep} steps={steps} />
            <Step
                setNextStep={() => setActiveStep(activeStep + 1)}
                setPreviousStep={() => setActiveStep(activeStep - 1)}
            />
        </Fragment>
    )
}

const App: FunctionalComponent = () => {
    const [hasStarted, setHasStarted] = useState(false)
    return (
        <div id='app'>
            <header className='app-header'>
                <h1>Give Simple</h1>
            </header>
            {hasStarted ? (
                <FormStepper />
            ) : (
                <StartScreen start={() => setHasStarted(true)} />
            )}
        </div>
    )
}

export default App
