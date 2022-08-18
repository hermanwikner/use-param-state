import {
  ThemeProvider,
  studioTheme,
  Card,
  TextInput,
  Container,
  Stack,
  Text,
  Code,
} from "@sanity/ui";
import { useParamState } from "../lib";

export default function App() {
  const [count, setCount] = useParamState<{ foo: string; bar: string }>(
    "test",
    { foo: "hej", bar: "asdads" }
  );

  return (
    <ThemeProvider theme={studioTheme}>
      <Card height="fill">
        <Container width={1} padding={5} sizing="border">
          <Stack>
            <Card border radius={2} padding={5}>
              <Code language="javascript" size={0}>
                {`
  const [count, setCount] = useParamState<{ foo: string; bar: string }>(
    "test",
    { foo: "hej", bar: "asdads" }
  );
`}
              </Code>
            </Card>

            <Card border radius={2} padding={5}>
              <Stack space={5}>
                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    Update the state by typing in this input
                  </Text>
                  <TextInput
                    onChange={(val: any) =>
                      setCount((p) => ({
                        bar: p.bar,
                        foo: val.target?.value,
                      }))
                    }
                    defaultValue={count.foo}
                  />
                  <TextInput
                    onChange={(val: any) =>
                      setCount((p) => ({
                        foo: p.foo,
                        bar: val.target?.value,
                      }))
                    }
                    defaultValue={count.bar}
                  />
                </Stack>

                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    State value
                  </Text>
                  <Card height="fill">{count.foo}</Card>
                  <Card height="fill">{count.bar}</Card>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Card>
    </ThemeProvider>
  );
}
