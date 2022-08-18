import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { encode, tryDecode } from "./utils";

type ReturnType<S> = [S, Dispatch<SetStateAction<S>>];
type InitialStateType<S> = S | (() => S);
type KeyType = string;

export function useParamState<S>(
  key: KeyType,
  initialState: InitialStateType<S>
): ReturnType<S> {
  const params = useMemo(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
  }, []);

  const pathname = useMemo(() => {
    if (typeof window !== undefined) {
      return window.location.pathname;
    }
  }, []);

  const paramsValue = params?.get(key);

  const _initial = useMemo(
    () => (paramsValue ? tryDecode(paramsValue, initialState) : initialState),
    [paramsValue, initialState]
  );

  const [state, setState] = useState<S>(_initial);
  const [internal, setInternal] = useState(_initial);

  const handleStateChange = useCallback(() => {
    const encoded = state ? encode(JSON.stringify(state)) : "";

    params?.set(key, encoded);

    const loc = `${pathname}?${params}`;
    history.replaceState(null, "", loc);

    setInternal(tryDecode(encoded, initialState));
  }, [state, initialState, pathname]);

  useEffect(() => {
    handleStateChange();
  }, [state]);

  return [internal, setState];
}
