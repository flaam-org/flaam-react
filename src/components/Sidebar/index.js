import React, { useEffect, useMemo } from 'react'
import { routes } from "../../utils/routeStrings"
import logoImg from "../../assets/logos/icon.svg"
// import logoTextImg from "../../assets/logos/icon-text.svg"
import TextImg from "../../assets/logos/text.svg"
import { NavLink, useLocation } from 'react-router-dom'
import { LightBulbIcon, UserIcon, NewspaperIcon } from "@heroicons/react/outline"
import { useMediaQuery } from 'react-responsive'
import { breakpoints } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAsync, selectAvatar, selectFullName } from '../../slices/userSlice'

function joinClassNames(...classes) {
  return classes.join(" ")
}

function Sidebar() {

  const location = useLocation()
  const fullName = useSelector(selectFullName)
  const avatar = useSelector(selectAvatar)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAsync())
  },[dispatch])


  const navigation = useMemo(() => {

    return [
      { name: "Feed", href: routes.FEED, icon: NewspaperIcon, current: location && location.pathname === routes.FEED },
      { name: "Post ", href: routes.POST_IDEA, icon: LightBulbIcon, current: location && location.pathname === routes.POST_IDEA },
      { name: "Profile", href: routes.PROFILE("s"), icon: UserIcon, current: location && location.pathname === routes.PROFILE("s") }
    ]

  }, [location])

  const isDesktopMode = useMediaQuery({ query: breakpoints['2xl'] })

  if (isDesktopMode) {
    return (
      <div className="h-screen w-[400px] bg-white dark:bg-gray-800 flex flex-shrink-0 shadow-xl dark:text-white z-10">
        <div className="flex flex-col flex-grow" >

          {/* the logo and brand name */}
          <div className="flex items-center justify-center px-5 py-2  shadow-md" >
            <img className="h-10 w-auto" src={logoImg} alt="" />
            <img className="h-10 w-auto" src={TextImg} alt="" />
          </div>

          <div className="mt-5 flex-1 flex flex-col" >
            <nav className="flex-1 px-3 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={joinClassNames(
                    item.current ? " bg-blue-200/30 " : "hover:bg-blue-200/20 bg-blue-200/5 ",
                    "flex items-center px-5 py-2 text-md lg:text-lg font-medium rounded-sm uppercase relative"
                  )}
                >
                  {item.current && <span className="absolute -left-2 h-full w-2 block bg-blue-500" />}
                  <item.icon className={joinClassNames(
                    item.current ? "" : "opacity-50",
                    "w-6 h-6 mr-2"
                  )} />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* profile */}
          <NavLink to={routes.PROFILE("s")}>
            <div className="flex pt-5 pb-8 px-5 justify-self-end items-center shadow-2xl cursor-pointer" >
              <img className=" h-14 w-14 block mr-2 shadow-lg bg-gray-100/40 hover:shadow-xl hover:scale-105 transition-transform duration-100 ease-in-out rounded-full" src={avatar} alt="Profile pic" />
              <p className="uppercase lg:text-lg px-5">
                {fullName && fullName}
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-800 flex flex-shrink-0 shadow-xl dark:text-white z-10">
      <div className="flex flex-col flex-grow" >

        {/* the logo and brand name */}
        <div className="flex items-center justify-center px-5 py-2  shadow-md" >
          <img className="h-10 w-auto" src={logoImg} alt="" />
        </div>

        <div className="mt-5 flex-1 flex flex-col" >
          <nav className="flex-1 px-1 space-y-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={joinClassNames(
                  item.current ? "" : "hover:bg-blue-200/20",
                  "flex items-center px-5 py-2 font-medium rounded-sm uppercase relative"
                )}
              >
                {item.current && <span className="absolute -left-2 h-full w-2 block bg-blue-500" />}
                <item.icon className={joinClassNames(
                  item.current ? " text-blue-500 " : "opacity-50",
                  "w-8 h-8"
                )} />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* profile */}
        <NavLink to={routes.PROFILE("s")}>
          <div className="flex pt-5 pb-8 justify-self-end items-center justify-center cursor-pointer" >
            <img className="h-14 w-14 block shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-100 ease-in-out rounded-full" src={avatar} alt="Profile pic" />
          </div>
        </NavLink>

      </div>
    </div>
  )

}

export default Sidebar
