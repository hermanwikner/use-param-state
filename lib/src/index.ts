import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react'
import {encode, tryDecode} from './utils'

type ReturnType<S> = [S, Dispatch<SetStateAction<S>>, {removeParam: () => void}]
type InitialStateType<S> = S | (() => S)
type KeyType = string

export function useParamState<S>(props: {
  /**
   * The initial state
   */
  initialState?: InitialStateType<S>
  /**
   * The URL parameter key for the encoded state
   */
  key: KeyType
}): ReturnType<S> {
  const {initialState, key} = props

  const _initialState = useMemo(() => {
    if (typeof window === 'undefined') {
      return initialState
    }

    const params = new URLSearchParams(window.location.search)

    return params?.get(key) ? tryDecode(params?.get(key), initialState) : initialState
  }, [initialState])

  const [state, setState] = useState<S>(_initialState)
  const [internal, setInternal] = useState<S>(_initialState)

  const handleClear = useCallback(() => {
    const pathname = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    params?.delete(key)
    history.replaceState(null, '', `${pathname}?${params}`)
  }, [key])

  const handleStateChange = useCallback(() => {
    const encoded = state ? encode(JSON.stringify(state)) : ''
    const hasEncodedValue = Boolean(encoded)
    const params = new URLSearchParams(window.location.search)
    const pathname = window.location.pathname

    if (hasEncodedValue) {
      params?.set(key, encoded)
      history.replaceState(null, '', `${pathname}?${params}`)
    }

    if (!hasEncodedValue) {
      handleClear()
    }

    setInternal(tryDecode(encoded, initialState))
  }, [state, initialState, handleClear])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleStateChange()
    }
  }, [state, handleClear])

  return [internal, setState, {removeParam: handleClear}]
}
