import React from 'react';
import './label.css'

const Label = ({ text, f }) => {
    return (
        <div>
            <label htmlFor={ f }>
                { text }
            </label>
        </div>
    )
}

export default Label;