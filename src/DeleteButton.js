import React from 'react';


export default function ClearButton({ dispatch }) {
    return <button onClick={() => dispatch({ type: 'delete' })}>DEL</button>
};