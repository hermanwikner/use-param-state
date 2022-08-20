## useParamState

React hook that works much like `useState`, but it encodes the state and saves it in a parameter in the URL

### Installation

`yarn add use-param-state` or `npm i use-param-state`

### Usage

The hook accepts an object as a prop with the following properties:

- `clearOnUnmout?: boolean` – Clear the encoded state in the URL on unmount
- `initialState?: <T>` – The initial state
- `key: string` – The URL parameter key for the encoded state

```ts
import {useParamState} from 'use-param-state'

const [state, setState] = useParamState<string>({
  initialState: 'Hello world',
  key: 'myKey',
})
```
