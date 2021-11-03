import React from 'react'

function ImplementationCardShimmer() {
  return (
    <div className=" animate-pulse p-2 pt-3 rounded-lg grid grid-cols-8 gap-1 drop-shadow-xl shadow-md border-blue-400 border " >

      {/* image */}
      <div className="justify-center col-start-1 col-end-2 flex items-center" >
        <div className=" h-14 w-14 rounded-full bg-blue-300 " ></div>
      </div>

      {/* username and created at */}
      <div className="col-start-2 col-end-8 flex flex-col justify-center ">
        <div className="h-4 my-1 w-28  bg-blue-300 rounded-xl"></div>
        <div className="h-3 my-1 w-40 bg-blue-300 rounded-xl" ></div>
      </div>

      {/* idea actions(share and bookmark) */}
      <div className="col-start-8 col-end-9 flex gap-2 text-center justify-around" >
        <div className="h-5 w-5 bg-blue-300 rounded-md" ></div>
        <div className="h-5 w-5 bg-blue-300 rounded-md" ></div>
      </div>


      <div className="col-start-1 col-end-2 flex flex-col gap-3 justify-around text-center" >
        <div className="" >
          <div className="text-4xl font-bold" ></div>
          <div className="h-3 w-8 bg-blue-300 m-auto rounded-lg" ></div>
        </div>
        <div className="" >
          <div className="text-4xl font-bold" ></div>
          <div className="h-3 w-8 bg-blue-300 m-auto rounded-lg" ></div>

        </div>
      </div>

      {/* content */}
      <div className="col-start-2 col-end-9 pr-5 flex flex-col">
        <div className="py-1 pb-3 " >
          <div className="bg-blue-300 h-5 rounded-lg px-2 py-1" ></div>
        </div>

        <div className="flex-1" >
          <div className=" h-20 bg-blue-300 rounded-lg px-2 py-1" ></div>
        </div>
      </div>

      {/* tags */}

      <div className="col-start-2 col-end-8 flex flex-wrap py-2 gap-3" >
        <div className="w-full bg-blue-300 h-2 rounded-md" ></div>
      </div>

      <div className="col-start-8 col-end-9 flex items-center justify-center" >
        <div className="h-4 w-8 bg-blue-300 rounded-md" ></div>
      </div>


    </div>
  )
}

export default ImplementationCardShimmer