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
    "mjao",
    { foo: "hej", bar: "asdads" }
  );

  const [test, setTest] = useParamState("test", "hello world");

  return (
    <ThemeProvider theme={studioTheme}>
      <Card height="fill">
        <Container width={1} padding={5} sizing="border">
          <Stack space={2}>
            <Card border radius={2} padding={5}>
              <Stack space={5}>
                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    Update the state
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
                  <TextInput
                    onChange={(val: any) => setTest(val.target?.value)}
                    defaultValue={test}
                  />
                </Stack>

                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    State value
                  </Text>
                  <Card height="fill">{count.foo}</Card>
                  <Card height="fill">{count.bar}</Card>
                  <Card height="fill">{test}</Card>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Card>
    </ThemeProvider>
  );
}
