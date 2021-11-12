import React, { useRef} from 'react'
import { MenuAlt4Icon, XIcon } from "@heroicons/react/solid"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { joinClassNames } from '../../../utils/functions';
import Button from '../../utilComponents/Button';


function IdeaMilestones({ milestones }) {

  const { state: arr, handleChange, handlePositionChange, remove, push } = milestones

  const inputRef = useRef("")

  function handleAdd() {

    if(inputRef.current.value !== ""){
      push(inputRef.current.value)
    }

    inputRef.current.value = ""
    inputRef.current.scrollIntoView({behavior:'smooth'})
  }

  return (
    <div className="flex flex-col" >
      {/* section heading */}
      <div>

      </div>

      {/* list container */}

      <DragDropContext
        onDragEnd={(params) => {
          const srcIndex = params.source.index;
          const destinationIndex = params.destination?.index

          if (typeof destinationIndex !== "undefined" && destinationIndex !== null) {
            handlePositionChange(srcIndex, destinationIndex)
          }

        }}
      >

        <Droppable droppableId="milestones-droppable"  >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={joinClassNames(
                snapshot.isDraggingOver ? "" : " "
              )}
              {...provided.droppableProps}
            >
              {arr.map((ms, index) => {


                return (
                  <Draggable key={ms.id} draggableId={`milestone-${ms.id}`} index={index} >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}

                        className={joinClassNames(
                          snapshot.isDragging ? " shadow-md" : "",
                          "flex px-2 my-2"
                        )}
                      >
                        <DragHandle {...provided.dragHandleProps} />
                        <input value={ms.value} onChange={(e) => handleChange(e, ms.id)} className=" bg-transparent border-b flex-1 focus:outline-none" />
                        <DeleteHandle onClick={() => remove(ms.id)} />
                      </div>
                    )}



                  </Draggable>
                )

              })}
              {provided.placeholder}

            </div>
          )}

        </Droppable>

        {/* milestone input */}
        <div className="flex px-2 my-2" >
          <input
          ref={inputRef}
          className="flex-1 border-b border-black/50 focus:outline-none focus:border-green-600 p-2"
          placeholder="Enter Milestone"
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              e.preventDefault()
              handleAdd()

            }
          }}
           />
          <Button variant="primary" className="ml-2 self-end" onClick={ handleAdd} type="button" >Add</Button>
        </div>


      </DragDropContext>

    </div>
  )
}

const DragHandle = (props) => {

  return (
    <span className="p-1" {...props} >
      <MenuAlt4Icon className="w-6 h-6 inline-block mx-1 " />
    </span>
  )
}

const DeleteHandle = (props) => {

  return (
    <span className="p-1 cursor-pointer" {...props}>
      <XIcon className="w-6 h-6 inline-block mx-1 text-gray-500" />
    </span>
  )

}

export default IdeaMilestones
