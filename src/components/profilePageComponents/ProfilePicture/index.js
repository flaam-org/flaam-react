import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsEditMode } from '../../../slices/userSlice'
import { PencilIcon } from "@heroicons/react/solid"
import Modal from '../../utilComponents/Modal'

const sprites = [
  "avataaars",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "croodles",
  "croodles-neutral",
  "gridy",
  "identicon",
  "initials",
  "jdenticon",
  "micah",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral"
]

function getSeed(imgUrl) {
  return imgUrl.match(/\/(?<seed>[^/]*)\.svg/)?.groups?.seed
}

function ProfilePicture({avatar, setAvatar}) {
  const isEditMode = useSelector(selectIsEditMode)
  const [isOpen, setIsOpen] = useState(false)
  const [dicebearSeed, setDicebearSeed] = useState(getSeed(avatar) || "")
  const [dicebearSprite, setDicebearSprite] = useState(sprites[0])

  const generatedAvatar = `https://avatars.dicebear.com/api/${dicebearSprite}/${dicebearSeed}.svg`;

  return (
    <>
      <div className="relative w-40 h-40 shadow-inner rounded-full flex items-end justify-center" >

        <img className="w-11/12 rounded-full" src={avatar} alt="profile avatar" />

        {isEditMode && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/70 opacity-0 hover:opacity-75 cursor-pointer transition-opacity duration-150 ease-in-out" onClick={() => setIsOpen(true)} >
          <PencilIcon className="w-8 h-8 text-white" />
        </div>
        )}

      </div>
      <Modal
      className=""
      show={isOpen}
      headline="Change Profile Picture"
      btnName="Change"
      cancelBtnName="Cancel"
      onSubmit={() => {
        setIsOpen(false)
        setAvatar(generatedAvatar)
      }}
      onCancel={() => {
        setIsOpen(false)
        setDicebearSeed(getSeed(avatar) || "")
      }}

      >
        <div className="w-full h-20 rounded-md py-2 flex items-center justify-center" >
          <img className="h-full block " src={generatedAvatar} alt="profile" />
        </div>

        <div className="flex px-2 rounded-md my-3" >

          <select className="rounded-l-md flex-[1] w-full" value={dicebearSprite} onChange={(e) => setDicebearSprite(e.target.value)} >
            {sprites.map(sprite => {

              return (<option key={sprite} className="" value={sprite} >{sprite}</option>)

            })}
          </select>

          <input className="rounded-r-md flex-[3] w-full " type="text" placeholder="SEED" value={dicebearSeed} onChange={(e) => setDicebearSeed(e.target.value)} />
        </div>


      </Modal>
    </>




  )
}

export default ProfilePicture
