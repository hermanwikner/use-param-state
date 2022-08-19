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

export function useParamState<S>({
  key,
  initialState,
}: {
  key: KeyType;
  initialState?: InitialStateType<S>;
}): ReturnType<S> {
  const pathname = window.location.pathname;

  const _initialState = useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return params?.get(key)
      ? tryDecode(params?.get(key), initialState)
      : initialState;
  }, [initialState]);

  const [state, setState] = useState<S>(_initialState);
  const [internal, setInternal] = useState<S>(_initialState);

  const handleStateChange = useCallback(() => {
    const encoded = state ? encode(JSON.stringify(state)) : "";
    const hasEncodedValue = Boolean(encoded);
    const params = new URLSearchParams(window.location.search);

    if (hasEncodedValue) {
      params?.set(key, encoded);
      const loc = `${pathname}?${params}`;
      history.replaceState(null, "", loc);
    }

    if (!hasEncodedValue) {
      const params = new URLSearchParams(window.location.search);
      params?.delete(key);
      history.replaceState(null, "", `${pathname}?${params}`);
    }

    setInternal(tryDecode(encoded, initialState));
  }, [state, initialState, pathname]);

  useEffect(() => {
    handleStateChange();
  }, [state]);

  return [internal, setState];
}
