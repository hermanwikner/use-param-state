## useParamState

React hook that encodes and persist the state in the URL. It works pretty much like `useState`.

### Installation

`yarn add use-param-state` or `npm i use-param-state`

### Usage

The hook accepts an object as a prop with the following properties:

- `clearOnUnmout?: boolean` – Clear the encoded state in the url on unmount
- `initialState?: <T>` – The initial state
- `key: string` – The URL parameter key for the encoded state

```ts
import {useParamState} from 'use-param-state'

const [state, setState] = useParamState<string>({
  initialState: 'Hello world',
  key: 'myKey',
})
```
