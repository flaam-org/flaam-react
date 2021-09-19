import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

function Modal({ show, onCancel, children, headline }) {
  return (
    <Transition show={show} as={Fragment} >
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={show}
        onClose={onCancel}
        initialFocus={null} // the ref of element which needs to be initially focused
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl scale-7">
              <div>
                <Dialog.Title as="h3" className="text-lg leading-3 font-medium text-gray-900">
                  {headline}
                </Dialog.Title>

                <div>
                  {children}
                </div>
              </div>

              <div>
                <button onClick={onCancel} type="button" >cancel</button>
              </div>

            </div>


          </Transition.Child>

        </div>


      </Dialog>
    </Transition>
  )
}

export default Object.assign(Modal)
