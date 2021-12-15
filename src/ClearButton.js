import React from 'react';


export default function ClearButton({ dispatch, digit }) {
    return <button onClick={() => dispatch({ type: 'clear' })}>AC</button>
};