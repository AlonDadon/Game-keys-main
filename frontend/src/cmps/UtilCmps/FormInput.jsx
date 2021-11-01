import React from 'react'
export const FormInput = ({ type, value, handleChange, name, label, cols = '', rows = '' ,options=[] }) => {
// const sx = { 
//     'mr': `${mr}px`
// }
    return (
        <div className="input-filed" >
            {(type !== 'textarea' && type !== 'select') && < input className="form-input" type={type} name={name} placeholder=" "
                value={value} onChange={handleChange}
                autoComplete="off"
            />}
            {(type === 'textarea') && <textarea className="form-input" type={type} name={name} placeholder=" "
                value={value} onChange={handleChange}
                autoComplete="off"
                cols={cols} rows={rows} />}
            {(type === 'select') && <select className="form-input" type={type} name={name} placeholder=" "
                 onChange={handleChange}
                autoComplete="off"
                cols={cols} rows={rows} >
                    {options.map(option => <option value={option}>{option}</option>
                    )}
                    </select>}
            <label className="form-label" htmlFor={label}>{label}</label>
        </div>
    )
}
