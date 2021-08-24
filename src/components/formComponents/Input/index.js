import React, { useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

function Input({ label, className, labelClassName, type, required, value, ...rest }) {

  const [error, setError] = useState("")

  function handleBlur(e) {
    e.preventDefault()

    if (required)
      if (!value) {
        setError("This field is required")
      }
  }

  function handleFocus(e) {
    e.preventDefault()

    if (!!error) setError("")
  }

  return (
    <label className={labelClassName}>
      <span>{label}</span>
      <input
        {...rest}
        type={type}
        value={value}
        className={`rounded-md border ${!!error ? "border-red-500/60 dark:border-red-400/60" : "border-gray-300 focus:border-indigo-300 dark:border-gray-700"} shadow-sm  focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700  dark:focus:bg-gray-600 ${className}`}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={!!required}
      />

      <span className="text-xs text-red-500 px-2 align-middle">
        {!!error && (
          <>
            <span className="inline-block">
              <InformationCircleIcon className="w-4 inline mr-2" />
            </span>
            <span className="inline-block">
              {error}
            </span>
          </>
        )}
      </span>

    </label>
  )
}

export default Input