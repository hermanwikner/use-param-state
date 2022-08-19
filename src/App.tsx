import {
  ThemeProvider,
  studioTheme,
  Card,
  TextInput,
  Container,
  Stack,
  Text,
  Code,
  Checkbox,
  Button,
} from '@sanity/ui'
import {useState} from 'react'
import {useParamState} from '../lib'

function Test() {
  const [count, setCount] = useParamState<{foo: string; bar: string}>({
    key: 'myKey',
    clearOnUnmount: false,
    initialState: {
      foo: 'test',
      bar: 'test',
    },
  })

  return (
    <Card border radius={2} padding={5}>
      <Stack space={5}>
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Update the state
          </Text>
          <TextInput
            onChange={(val: any) =>
              setCount((p) => ({
                bar: p?.bar,
                foo: val.target?.value,
              }))
            }
            defaultValue={count?.foo}
          />
          <TextInput
            onChange={(val: any) =>
              setCount((p) => ({
                foo: p?.foo,
                bar: val.target?.value,
              }))
            }
            defaultValue={count?.bar}
          />
        </Stack>

        <Stack space={2}>
          <Text size={1} weight="semibold">
            State value
          </Text>
          <Card height="fill">{count?.foo}</Card>
          <Card height="fill">{count?.bar}</Card>
        </Stack>
      </Stack>
    </Card>
  )
}

export default function App() {
  const [count, setCount] = useState<boolean>(true)

  return (
    <ThemeProvider theme={studioTheme}>
      <Card height="fill">
        <Container width={1} padding={5} sizing="border">
          <Button onClick={() => setCount((v) => !v)} text="Show/hide" />
          {count && <Test />}
        </Container>
      </Card>
    </ThemeProvider>
  )
}
