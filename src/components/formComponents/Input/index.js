import { useField } from "formik"
import React, { useEffect, useMemo, useState } from "react"
import TextError from "../TextError"
import { CheckIcon, XIcon } from "@heroicons/react/solid"
import LoadingSpinner from "../../utilComponents/LoadingSpinner"
import { endpoints } from "../../../utils/constants"

const classes = {
  INPUT: (error, touched) => {
    const common = "block shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:focus:bg-gray-600"

    if (error && touched) {
      return `border-2 border-red-500/50 ${common} `
    }
    else {
      return `${common} border-2 border-gray-300 dark:border-gray-600/80 `
    }
  }
}


export const InputField = ({ label, labelClassName, className, ...props }) => {

  const [field, meta] = useField(props)

  return (
    <label htmlFor={label} className={labelClassName} >
      <span className="capitalize">{label}</span>
      <input {...field}  {...props} className={`${classes.INPUT(meta.error, meta.touched)} rounded-md ${className}`} />
      <TextError touched={meta.touched} error={meta.error} />
    </label>
  )
}


const INPUT_STATES = {
  CHECKING: 'checking',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  WAITING: 'waiting'
}


export const AvailabilityCheckInput = ({ label, labelClassName, className, dataType, ...props }) => {

  const [field, meta, helpers] = useField(props)
  const [currentInputState, setCurrentInputState] = useState(INPUT_STATES.WAITING)
  const [checkTimer, setCheckTimer] = useState(undefined)

  const errMsg = useMemo(() => `This ${props.name} is already taken.`, [props.name])

  function changeHandler(e) {

    const currentValue = e.target.value
    helpers.setValue(currentValue)

    if (checkTimer) clearTimeout(checkTimer)

    const timer = setTimeout(async () => {

      setCurrentInputState(INPUT_STATES.WAITING)

      if ((!meta.error || meta.error === errMsg) && currentValue) {
        setCurrentInputState(INPUT_STATES.CHECKING)

        try {

          const res = await fetch(`${endpoints.CHECK_EXISTS}?${props.name}=${currentValue}`)

          switch (res.status) {
            case 204: setCurrentInputState(INPUT_STATES.UNAVAILABLE);
              helpers.setError(errMsg)
              helpers.setTouched(true)
              break;

            case 400: setCurrentInputState(INPUT_STATES.WAITING)
              break;

            case 404: setCurrentInputState(INPUT_STATES.AVAILABLE)
              helpers.setError(undefined)
              break;

            default: setCurrentInputState(INPUT_STATES.WAITING)
          }


        } catch (err) {
          console.log(err);
        }
        finally {
          setCheckTimer(undefined)
        }
      }
    }, 1000)

    setCheckTimer(timer)
  }

  useEffect(() => {

    if (!meta.error) {
      if (currentInputState === INPUT_STATES.UNAVAILABLE)
        helpers.setError(errMsg)
    }

  }, [currentInputState, helpers, meta.error, errMsg])


  return (
    <label htmlFor={label} className={labelClassName} >
      <span className="capitalize">{label}</span>
      <div className="flex mt-1">
        <input {...field}  {...props} className={`${classes.INPUT(meta.error, meta.touched)} ${className} w-full rounded-l`} onChange={changeHandler} />
        <span className="block p-1 w-12 shadow-sm dark:bg-gray-700 dark:focus:bg-gray-600 rounded-r flex items-center justify-center border-2 dark:border-gray-600/80" >

          {currentInputState === INPUT_STATES.AVAILABLE && <CheckIcon className="w-6 text-green-400" />}

          {currentInputState === INPUT_STATES.UNAVAILABLE && <XIcon className="w-6 text-red-500" />}

          {currentInputState === INPUT_STATES.CHECKING && <LoadingSpinner />}

        </span>
      </div>
      <TextError touched={meta.touched} error={meta.error} />
    </label>
  )

}
