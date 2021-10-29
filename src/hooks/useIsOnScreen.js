import { useEffect, useState } from "react";

export default function useIsOnScreen(options) {

  const [ref, setRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {

    const observer = new IntersectionObserver(([entry]) => {

      setIsVisible(entry.isIntersecting)

    }, options)

    if(ref) observer.observe(ref)

    return () => {
      if(ref) observer.unobserve(ref)
    }

  }, [ref, options])

  return { setRef, isVisible }

}