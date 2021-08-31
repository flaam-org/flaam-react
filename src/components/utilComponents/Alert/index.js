import { Transition } from '@headlessui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { XIcon } from "@heroicons/react/solid"

function Alert({ message, onClose, autoClose, duration }) {

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
      }else {
        clearTimeout(timerRef.current)
        timerRef.current = undefined

        if(autoClose) {

          if(autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)

          autoCloseTimerRef.current = setTimeout(()=> {

            handleOnClose()

          },duration)

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
        enterFrom="-translate-y-full"
        enterTo="translate-y-1"
        leave="transition transform ease-out duration-500"
        leaveFrom="translate-y-1"
        leaveTo="-translate-y-full"

        className="fixed top-1 left-1/2 -translate-x-1/2 px-4 py-3 rounded-md border text-white bg-red-500/80 border-red-500 flex items-center text-center"

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
// useEffect(() => {

//   if (message) {
//     setShow(true)
//     setMsg(message)
//   }
//   else {
//     setShow(false)
//   }

// }, [message])

// useEffect(() => {

//   let t;

//   if (!show) {
//     t = setTimeout(() => {
//       onClose()
//     }, 300)
//   }

//   return () => {
//     if (t) clearTimeout(t)
//   }

// }, [show, onClose])