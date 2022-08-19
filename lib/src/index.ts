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
  const params = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;

  const _initialState = useMemo(
    () =>
      params?.get(key)
        ? tryDecode(params?.get(key), initialState)
        : initialState,
    [params, initialState]
  );

  const [state, setState] = useState<S>(_initialState);
  const [internal, setInternal] = useState<S>(_initialState);

  const handleStateChange = useCallback(() => {
    const encoded = state ? encode(JSON.stringify(state)) : "";
    const hasEncodedValue = Boolean(encoded);

    if (hasEncodedValue) {
      params?.set(key, encoded);
      const loc = `${pathname}?${params}`;
      history.replaceState(null, "", loc);
    }

    if (!hasEncodedValue) {
      const delParams = new URLSearchParams(window.location.search);
      delParams?.delete(key);
      history.replaceState(null, "", `${pathname}?${delParams}`);
    }

    setInternal(tryDecode(encoded, initialState));
  }, [state, initialState, pathname, params]);

  useEffect(() => {
    handleStateChange();
  }, [state]);

  return [internal, setState];
}
