import React, { useMemo } from 'react'
import { routes } from "../../utils/routeStrings"
import logoImg from "../../assets/logos/icon.svg"
// import logoTextImg from "../../assets/logos/icon-text.svg"
import TextImg from "../../assets/logos/text.svg"
import { NavLink, useLocation } from 'react-router-dom'

function joinClassNames(...classes) {
  return classes.join(" ")
}

function Sidebar() {

  const location = useLocation()

  const navigation = useMemo(() => {

    return [
      { name: "Feed", href: routes.FEED, icon: "", current: location && location.pathname === routes.FEED },
      { name: "Post ", href: routes.POST_IDEA, icon: "", current: location && location.pathname === routes.POST_IDEA },
      { name: "Profile", href:routes.PROFILE,icon:"",current:location && location.pathname === routes.PROFILE }
    ]

  }, [location])


  return (
    <div className="hidden h-screen md:w-16 lg:w-[400px] bg-white md:flex md:flex-shrink-0 shadow-xl dark:text-white z-10">
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
                {/* <item.icon /> */}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* profile */}
        <div className="flex pt-5 pb-8 px-5 justify-self-end items-center shadow-2xl" >
          <img className=" h-14 w-14 block mr-2 shadow-md bg-gray-200 rounded-full" src="https://picsum.photos/100" alt="Profile pic" />
          <p className="uppercase lg:text-lg px-5">
            Mohit kumar
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
