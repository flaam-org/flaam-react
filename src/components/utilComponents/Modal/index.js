import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

function Modal({ show, onCancel, children, headline,btnName,onSubmit,cancelBtnName,className }) {
  return (
    <Transition show={show} as={Fragment} >
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={show}
        onClose={onCancel}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-8 scale-75 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-8 sm-translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div>
                <Dialog.Title as="h3" className="text-lg leading-3 font-medium py-2 text-gray-900">
                  {headline}
                </Dialog.Title>

                <div className={className}>
                  {children}
                </div>
              </div>

              <div className="flex py-2 items-center justify-end">
                <button className="py-1 px-2 border-2 border-red-400 hover:shadow-md focus:ring-2 text-red-500 focus:ring-indigo-500/50 rounded-md ml-2 focus:outline-none" onClick={onCancel} type="button" >{cancelBtnName}</button>

                <button className="py-1 px-2 border-2 border-success-400 focus:ring-2 focus:ring-success-green-500/70 hover:bg-success-green-500 hover:text-white transition duration-200 ease-in-out   rounded-md ml-2 focus:outline-none" onClick={onSubmit} type="button" >{btnName}</button>
              </div>

            </div>


          </Transition.Child>

        </div>


      </Dialog>
    </Transition>
  )
}

export default Modal
