import {
  ThemeProvider,
  studioTheme,
  Card,
  TextInput,
  Container,
  Stack,
  Text,
  Button,
  MenuDivider,
  Checkbox,
} from '@sanity/ui'
import {useParamState} from '../lib'

function Test({_key}: {_key: string}) {
  const [state, setState] = useParamState<{foo: string; bar: string; bool: boolean}>({
    key: _key,
    clearOnUnmount: true,
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
              setState((p: any) => ({
                ...p,
                foo: val.target?.value,
              }))
            }
            defaultValue={state?.foo}
          />
          <TextInput
            onChange={(val: any) =>
              setState((p: any) => ({
                ...p,
                bar: val.target?.value,
              }))
            }
            defaultValue={state?.bar}
          />
          <Checkbox
            onChange={(e: any) => setState((p: any) => ({...p, bool: e?.target?.checked}))}
            defaultChecked={state?.bool}
          />
        </Stack>

        <MenuDivider />

        <Stack space={2}>
          <Text size={1} weight="semibold">
            State value
          </Text>
          <Card height="fill">{state?.foo}</Card>
          <Card height="fill">{state?.bar}</Card>
        </Stack>
      </Stack>
    </Card>
  )
}

export default function App() {
  const [test, setTest] = useParamState<boolean>({
    initialState: false,
    key: 'unMountTest',
  })

  return (
    <ThemeProvider theme={studioTheme}>
      <Card height="fill">
        <Container width={1} padding={5} sizing="border">
          <Stack space={2}>
            <Button onClick={() => setTest((v) => !v)} text="clearOnUnmount" />

            {test && <Test key="test1" _key="test1" />}
            {!test && (
              <Card padding={2} tone="caution" border radius={2}>
                <Test key="test2" _key="test" />
              </Card>
            )}
          </Stack>
        </Container>
      </Card>
    </ThemeProvider>
  )
}
