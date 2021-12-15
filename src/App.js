import { useState, useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';
import ClearButton from './ClearButton';

const ACTIONS = {
  ADDDIGIT: 'addDigit',
  ADDOPERATION: 'addOperation',
  CLEAR: 'clear',
  DELETEDIGIT: 'deleteDigit',
  EVALUATE: 'evaluate'
}

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
  }
}

function App() {
  const [{ currentEntry, previousEntry, operation }, dispatch] = useReducer(reducer, {}) // state includes currentEntry, previousEntry, operation

  return (
    <div className='app'>
      <h1>A simple React calculator</h1>
      <div className="calculator">
        <div className='output'>
          <div className='previousEntry'>{previousEntry} {operation}</div>
          <div className='currentEntry'>{currentEntry}</div>
        </div>
        <ClearButton dispatch={dispatch} />
        <button>DEL</button>
        <button>%</button>
        <button>/</button>
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <button>*</button>
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <button>+</button>
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <button>-</button>
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button>+/-</button>
        <button>=</button>
      </div>
    </div>
  );
}

export default App;
