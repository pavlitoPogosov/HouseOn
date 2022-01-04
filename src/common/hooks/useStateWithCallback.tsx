import { useCallback, useEffect, useRef, useState } from "react"


type ReturnType<T> = [state: T, setState: (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => void]

export const useStateWithCallback = <T,>(initialState: T): ReturnType<T> => {
  const [state, setState] = useState<T>(initialState)
  const callbackRef = useRef<(updated: T) => void>()

  const handleSetState = useCallback((
    updatedState: React.SetStateAction<T>,
    callback?: (updatedState: T) => void
  ) => {
    callbackRef.current = callback
    setState(updatedState)
  }, [])

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current(state)
      callbackRef.current = undefined
    }
  }, [state])

  return [state, handleSetState]
}