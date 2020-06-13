import { Fragment, FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug')
}

interface Step {
    component: FunctionalComponent<{
        form: Form
        setField: (x: keyof Form) => (value: string | boolean) => void
        setNextStep: () => void
        setPreviousStep: () => void
    }>
}

const provinces = [
    'alberta',
    'british columbia',
    'manitoba',
    'new brunswick',
    'newfoundland',
    'labrador',
    'nova scotia',
    'ontario',
    'prince edward island',
    'quebec',
    'saskatchewan',
]

const capitalizeWord = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1)
}

const toSentenceCase = (str: string): string =>
    str
        .split(' ')
        .map(capitalizeWord)
        .join(' ')

const steps: Step[] = [
    {
        component: ({ form, setField, setNextStep }) => (
            <div className='step-container'>
                <header className='question-header'>
                    <span>1</span>
                    <label htmlFor='donationTotal'>
                        How much would you like to donate to charities per year?
                    </label>
                </header>
                <div className='donation-input-container'>
                    <span>$</span>
                    <input
                        id='donationTotal'
                        placeholder='Type your answer here'
                        type='number'
                        value={form.donationTotal}
                        onInput={e => {
                            let value: string = (e.target as HTMLInputElement)
                                .value
                            setField('donationTotal')(value)
                        }}
                    />
                </div>
                {!!form.donationTotal.length && (
                    <button
                        className='btn center'
                        onClick={() => setNextStep()}
                    >
                        Next
                    </button>
                )}
            </div>
        ),
    },
    {
        component: ({ form, setField, setNextStep, setPreviousStep }) => {
            return (
                <div className='step-container'>
                    <header className='question-header'>
                        <span>2</span>
                        <label htmlFor='province'>
                            Which province/territory do you reside in?
                        </label>
                    </header>
                    <select
                        id='province'
                        placeholder='Type or select an option'
                        autocomplete='off'
                        type='text'
                        value={form.province}
                        onChange={e => {
                            let value: string = (e.target as HTMLInputElement)
                                .value
                            setField('province')(value)
                        }}
                    >
                        <option disabled selected>
                            Select an option
                        </option>
                        {provinces.map(province => (
                            <option value={province}>
                                {toSentenceCase(province)}
                            </option>
                        ))}
                    </select>
                    {form.province && (
                        <button
                            className='btn center'
                            onClick={() => setNextStep()}
                        >
                            Next
                        </button>
                    )}
                </div>
            )
        },
    },
    {
        component: () => <div>Results</div>,
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
            {activeStep} of {steps.length - 1} answered
            {/* derive this from # of fields filled instead, for back navigation */}
        </span>
    </div>
)

const StartScreen: FunctionalComponent<{ start: () => void }> = ({ start }) => (
    <div className='step-container step-container--centered'>
        <h1>Invest in changing the world</h1>
        <button className='btn btn--large center' onClick={start}>
            Start doing good
        </button>
    </div>
)

interface Form {
    donationTotal: string
    province: string
    incomeValue: string
    incomePeriod: string
    retired: boolean | undefined
}

const initialForm: Form = {
    donationTotal: '',
    province: '',
    incomeValue: '',
    incomePeriod: '',
    retired: undefined,
}

const FormStepper: FunctionalComponent = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [form, setForm] = useState<Form>(initialForm)
    const setField = (field: keyof Form) => (value: string | boolean) => {
        setForm({ ...form, [field]: value })
    }
    const Step = steps[activeStep].component
    return (
        <Fragment>
            <ProgressBar activeStep={activeStep} steps={steps} />
            <Step
                form={form}
                setField={setField}
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
