import { Transition } from '@headlessui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { XIcon } from "@heroicons/react/solid"

const VARIANTS = {
  "error": "bg-red-500/90",
  "success": "bg-success-green-500/90",
  "warning": "bg-yellow-400/90"
}

const CORNER_SHAPE = {
  "sharp": "rounded-none",
  "very-light-curve": "rounded-sm",
  "light-curve": "rounded-md",
  "heavy-curve": "rounded-lg",
  "very-heavy-curve": "rounded-xl",
  "almost-circular": "rounded-2xl"
}

const PLACEMENT = {
  "top-middle": {
    default: "top-1 left-1/2 -translate-x-1/2 ",
    from: "-translate-y-full",
    to: "translate-y-1"
  },
  "top-start": {
    default: "top-1 left-1",
    from: "-translate-y-full",
    to: "translate-y-1"
  },
  "top-end": {
    default: "top-1 right-1",
    from: "-translate-y-full",
    to: "translate-y-1"
  },
  "left-start": {
    default: "top-2 left-1",
    from: "-translate-x-full",
    to: "translate-x-0"
  },
  "left-middle": {
    default: "top-1/2 left-1 -translate-y-1/2",
    from: "-translate-x-full",
    to: "translate-x-0"
  },
  "left-end": {
    default: "bottom-20 left-1",
    from: "-translate-x-full",
    to: "translate-x-0"
  },
  "right-start": {
    default: "top-1 right-1",
    from: "translate-x-full",
    to: "translate-x-0"
  },
  "right-middle": {
    default: "top-1/2 right-1 -translate-y-1/2",
    from: "translate-x-full",
    to: "translate-x-0"
  },
  "right-end": {
    default: "bottom-10 right-1",
    from: "translate-x-full",
    to: "translate-x-0"
  }
}



/**
 * @param {{
 * message:string,
 * onClose: function,
 * autoClose: boolean,
 * duration:number,
 * variant:"error" | "success" | "warning",
 * corners:"sharp" | "very-light-curve" | "light-curve" | "heavy-curve" | "very-heavy-curve" | "almost-circular",
 * placement:"top-middle" | "top-start" | "top-end" | "left-start" | "left-middle" | "left-end" | "right-start" | "right-middle" | "right-end",
 *  }}
 */

function Alert({ message, onClose, autoClose, duration, variant = "error", corners = "light-curve", placement = "top-middle" }) {

  const [show, setShow] = useState(false)
  const timerRef = useRef(undefined)
  const autoCloseTimerRef = useRef(undefined)


  const handleOnClose = useCallback(() => {
    setShow(false)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      onClose()
      timerRef.current = undefined
    }, 500)

  }, [onClose])



  useEffect(() => {

    if (message) {
      setShow(true)
      if (!timerRef.current) {
        if (autoClose) {

          if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)

          autoCloseTimerRef.current = setTimeout(() => {
            handleOnClose()
          }, duration)

        }
      } else {
        clearTimeout(timerRef.current)
        timerRef.current = undefined

        if (autoClose) {

          if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)

          autoCloseTimerRef.current = setTimeout(() => {

            handleOnClose()

          }, duration)

        }

      }

    }

  }, [message, autoClose, duration, handleOnClose])


  useEffect(() => {

    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }

  }, [])




  return (
    <>
      <Transition
        show={show}
        enter="transition transform ease-in duration-200"
        enterFrom={PLACEMENT[placement].from}
        enterTo={PLACEMENT[placement].to}
        leave="transition transform ease-out duration-500"
        leaveFrom={PLACEMENT[placement].to}
        leaveTo={PLACEMENT[placement].from}

        className={`fixed ${PLACEMENT[placement].default} px-4 py-3 border text-white z-30 flex items-center text-center ${VARIANTS[variant]} ${CORNER_SHAPE[corners]}`}

      >
        <span className=" text-xs w-10/12 sm:text-sm md:text-base md:w-11/12 inline-block align-top">
          {message}
        </span>
        {!autoClose && (
          <span className="w-2/12 md:w-1/12 align-middle p-1 flex items-center justify-center" onClick={handleOnClose} >
            <XIcon className="w-5 hover:text-gray-900 hover:cursor-pointer" />
          </span>
        )}


      </Transition>

    </>
  )
}

export default Alert