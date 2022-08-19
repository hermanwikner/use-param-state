# useParamState

The `useParamState` hook is a variant of the `useState` hook, but it encodes the state and saves it in the url – and then decodes it.

### Usage

The hook accepts an object as a prop with the following properties:

- `clearOnUnmout?: boolean` – clear the encoded state in the url on unmount
- `initialState?: <T>` – the initial state
- `key: string` – the URL parameter key for the encoded state

### Example

```ts
const [state, setState] = useParamState<string>({
  initialState: 'Hello world',
  key: 'myKey',
})

// Would result in:
// your-domain.com?myKey=eJxT8kjNyclXKM8vyklRAgAexQSB
```
