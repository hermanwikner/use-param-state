import {
  ThemeProvider,
  studioTheme,
  Card,
  TextInput,
  Container,
  Stack,
  Text,
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

  const [test, setTest] = useParamState<string>({key: 'testar'})

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

          <TextInput onChange={(val: any) => setTest(val.target?.value)} defaultValue={test} />
        </Stack>

        <Stack space={2}>
          <Text size={1} weight="semibold">
            State value
          </Text>
          <Card height="fill">{count?.foo}</Card>
          <Card height="fill">{count?.bar}</Card>
          <Card height="fill">{test}</Card>
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
          <Stack space={2}>
            <Button onClick={() => setCount((v) => !v)} text="Show/hide" />
            {count && <Test />}
          </Stack>
        </Container>
      </Card>
    </ThemeProvider>
  )
}
