import { FunctionalComponent, h } from 'preact'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug')
}

const App: FunctionalComponent = () => {
    return <div id='app'>hello</div>
}

export default App
