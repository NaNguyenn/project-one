import { useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';
import ClearButton from './ClearButton';
import OperationButton from './OperationButton';
import EvaluateButton from './EvaluateButton';
import DeleteButton from './DeleteButton';

function reducer(state, { type, payload }) { //action includes type & payload
  switch (type) {
    case 'addDigit':
      if (payload.digit === "0" && state.currentEntry === "0") return state //prevent 0000 input
      if (payload.digit === "." && state.currentEntry.includes(".")) return state //prevent ..... input

      return {
        ...state,
        currentEntry: `${state.currentEntry || ""}${payload.digit}` //default to empty string
      }
    case 'clear':
      return {}
    case 'addOperation':
      if (state.currentEntry == null && state.previousEntry == null) return state //when current and previous are null cant add operation
      if (state.currentEntry == null) { //when choosing wrong operation
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousEntry == null) { //when previous is null, push current to previous
        return {
          ...state,
          operation: payload.operation,
          previousEntry: state.currentEntry,
          currentEntry: null,
        }
      }
      else { //when previous and current have something in
        return {
          ...state,
          previousEntry: evaluate(state),
          operation: payload.operation,
          currentEntry: null
        }
      }
    case 'evaluate':
      if (state.operation == null || state.currentEntry == null || state.previousEntry == null) return state
      else {
        return {
          ...state,
          previousEntry: null,
          operation: null,
          currentEntry: evaluate(state)
        }
      }
    case 'delete':
      if (state.currentEntry == null) return state
      else {
        return {
          ...state,
          currentEntry: state.currentEntry.slice(0, -1)

        }
      }
    default:
      return state
  }
}

function evaluate({ currentEntry, previousEntry, operation }) {
  const previous = parseFloat(previousEntry) //make entry a float for computing
  const current = parseFloat(currentEntry)
  if (isNaN(previous) || isNaN(current)) return ""
  let result = ""
  switch (operation) {
    case "+":
      result = previous + current
      break
    case "-":
      result = previous - current
      break
    case "*":
      result = previous * current
      break
    case "/":
      result = previous / current
      break
    case "%":
      result = previous % current
      break
    default:
      break
  }
  return result.toString()
}

function App() {
  const [{ currentEntry, previousEntry, operation }, dispatch] = useReducer(reducer, {}) // state includes currentEntry, previousEntry, operation

  return (
    <div className='app'>
      <h1>A React calculator</h1>
      <div className="calculator">
        <div className='output'>
          <div className='previousEntry'>{previousEntry} {operation}</div>
          <div className='currentEntry'>{currentEntry}</div>
        </div>
        <ClearButton dispatch={dispatch} />
        <DeleteButton dispatch={dispatch} />
        <OperationButton operation="%" dispatch={dispatch} />
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button></button>
        <EvaluateButton dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
