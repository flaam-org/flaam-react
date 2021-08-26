import { useField } from "formik"
import React from "react"
import TextError from "../TextError"

const classes = {
  INPUT: (error, touched) => {
    const common = "block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:focus:bg-gray-600"

    if (error && touched) {
      return `border-red-500/50 ${common} `
    }
    else {
      return `${common} border-gray-300 dark:border-gray-700 `
    }
  }
}


export const InputField = ({ label, labelClassName, className, ...props }) => {

  const [field, meta] = useField(props)

  return (
    <label htmlFor={label} className={labelClassName} >
      <span className="capitalize">{label}</span>
      <input {...field}  {...props} className={`${classes.INPUT(meta.error, meta.touched)} ${className}`} />
      {meta.touched && meta.error && (
        <TextError>
          {meta.error}
        </TextError>
      )}
    </label>
  )

}
