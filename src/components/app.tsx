import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug')
}

interface Step {
    component: FunctionalComponent
}

const steps: Step[] = [
    {
        component: () => <div>step 1</div>,
    },
    {
        component: () => <div>step 2</div>,
    },
    {
        component: () => <div>step 3</div>,
    },
]

const ProgressBar: FunctionalComponent<{ percentage: number }> = ({
    percentage,
}) => (
    <div className='progress-bar'>
        <div
            className='progress-bar__fill'
            style={{ width: `${percentage}%` }}
        ></div>
    </div>
)

const App: FunctionalComponent = () => {
    const [activeStep, setActiveStep] = useState(0)
    const Step = steps[activeStep].component
    console.log('Step', Step)
    return (
        <div id='app'>
            <ProgressBar percentage={(activeStep / (steps.length - 1)) * 100} />
            <h1>Give Simple</h1>
            {/* <Step /> */}
            <button onClick={() => setActiveStep(activeStep + 1)}>Next</button>
        </div>
    )
}

export default App
