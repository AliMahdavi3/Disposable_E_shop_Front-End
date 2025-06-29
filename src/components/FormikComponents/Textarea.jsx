import React from 'react';
import { FastField } from 'formik';


const Textarea = ({ name, label, placeholder, cols, rows, className }) => {
    return (
        <div className="flex flex-col w-full">
            <label
                htmlFor={name}
                className={`ms-2 mb-1 text-xs font-medium text-gray-400`}
            >
                {label}
            </label>

            <FastField
                className={`w-full ${className} scrollbar_hidden
                placeholder:italic mb-3 placeholder:text-xs text-gray-700 placeholder:px-1`}
                as="textarea"
                placeholder={placeholder}
                name={name}
                id={name}
                cols={cols}
                rows={rows}
            />
        </div>
    )
}

export default Textarea
