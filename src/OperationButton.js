import React from 'react';


export default function OperationButton({ dispatch, operation }) {
    return <button onClick={() => dispatch({ type: 'addOperation', payload: { operation } })}>{operation}</button>
};