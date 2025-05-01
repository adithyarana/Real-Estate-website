import React from 'react'

const Button = ({ additionalClass, children,...props }) => {
  return (
    <button
    className={`w-full text-center text-white bg-emerald-600 hover:bg-emerald-700 transition duration-150 ease-in-ou px-4 rounded-lg font-semibold py-3 ${additionalClass}`}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button