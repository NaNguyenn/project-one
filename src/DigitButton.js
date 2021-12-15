import React from 'react';


export default function DigitButton({ dispatch, digit }) {
    return <button onClick={() => dispatch({ type: 'addDigit', payload: { digit } })}>{digit}</button>
};