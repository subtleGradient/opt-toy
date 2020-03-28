import { useState, useEffect } from "react"
import { SetStateAction, Dispatch } from "react"
import useUndo from "use-undo"

export interface Actions<T> {
  set: Dispatch<SetStateAction<T>>
  reset: Dispatch<SetStateAction<T>>
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

interface State<T> {
  past: T[]
  present: T
  future: T[]
}

export function useBetterUndo<S>(
  initialState: S | (() => S),
): [State<S>, Actions<S>] {
  const [nextState, setState] = useState(initialState)
  useEffect(() => void setUndoState(nextState), [nextState])
  const [
    states,
    { undo, redo, canUndo, canRedo, set: setUndoState, reset: resetUndoState },
  ] = useUndo(nextState)
  return [
    states,
    {
      undo,
      redo,
      canUndo,
      canRedo,
      set(nextState) {
        setState(nextState)
      },
      reset(nextState) {
        setState(nextState)
        setState(state => {
          resetUndoState(state)
          return state
        })
      },
    },
  ]
}
