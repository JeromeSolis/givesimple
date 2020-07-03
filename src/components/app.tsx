import { Fragment, FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'
import Arrow from './Arrow'

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
        questionNumber: number
    }>
}

const provinces = [
    'alberta',
    'british columbia',
    'manitoba',
    'new brunswick',
    'newfoundland and labrador',
    'northwest territories',
    'nova scotia',
    'nunavut',
    'ontario',
    'prince edward island',
    'quebec',
    'saskatchewan',
    'yukon'
]

const incomeBrackets = [
    'Less than 50,000',
    'Between 50,000 and 100,000',
    'Between 100,001 and 200,000',
    'More than 200,000'
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
        component: ({ questionNumber, form, setField, setNextStep }) => {
            const [message, setMessage] = useState('')
            const [timeoutId, setTimeoutId] = useState<number | undefined>(
                undefined,
            )
            return (
                <div className='step-container'>
                    <header className='question-header'>
                        <span>{questionNumber}</span>
                        <label htmlFor='donationTotal'>
                            How much would you like to donate to charities per
                            year?
                        </label>
                    </header>
                    <div className='donation-input-container'>
                        <span className='currency-symbol'>$</span>
                        <input
                            id='donationTotal'
                            placeholder='Type your answer here'
                            type='number'
                            value={form.donationTotal}
                            onInput={e => {
                                let value: string = (e.target as HTMLInputElement)
                                    .value
                                setField('donationTotal')(value)
                                window.clearTimeout(timeoutId)
                                if (value) {
                                    setTimeoutId(
                                        window.setTimeout(() => {
                                            setMessage(
                                                `That's $${(
                                                    Number(value) / 12
                                                ).toFixed(
                                                    2,
                                                )} per month. Great job.`,
                                            )
                                        }, 1000),
                                    )
                                } else {
                                    setMessage('')
                                }
                            }}
                        />
                        {message && (
                            <span className='validation-message'>
                                {message}
                            </span>
                        )}
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
            )
        },
    },
    {
        component: ({
            questionNumber,
            form,
            setField,
            setNextStep,
            setPreviousStep,
        }) => {
            return (
                <div className='step-container'>
                    <button
                        className='back-button'
                        onClick={() => setPreviousStep()}
                    >
                        <Arrow />
                    </button>
                    <header className='question-header'>
                        <span>{questionNumber}</span>
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
        component: ({
            questionNumber,
            form,
            setField,
            setNextStep,
            setPreviousStep,
        }) => {
            return (
                <div className='step-container'>
                    <button
                        className='back-button'
                        onClick={() => setPreviousStep()}
                    >
                        <Arrow />
                    </button>
                    <header className='question-header'>
                        <span>{questionNumber}</span>
                        <label htmlFor='province'>
                            How much do you earn per year?
                        </label>
                    </header>
                    <select
                        id='incomeBrackets'
                        placeholder='Select an option'
                        autocomplete='off'
                        type='text'
                        value={form.bracket}
                        onChange={e => {
                            let value: string = (e.target as HTMLInputElement)
                                .value
                            setField('bracket')(value)
                        }}
                    >
                        <option disabled selected>
                            Select an option
                        </option>
                        {incomeBrackets.map(bracket => (
                          <option value={bracket}>
                              {bracket}
                          </option>
                        ))}
                    </select>
                    {form.bracket && (
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
        component: ({ form }) => (
            <div className='step-container'>
                Results
                {Object.keys(form).map((key: any) => (
                    <p>
                        {key}: {form[key as keyof Form]}
                    </p>
                ))}
            </div>
        ),
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
    bracket: string
    // retired: boolean | undefined
}

const initialForm: Form = {
    donationTotal: '',
    province: '',
    bracket: '',
    // retired: undefined,
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
                questionNumber={activeStep + 1}
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
                <h1>Givesimple</h1>
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
