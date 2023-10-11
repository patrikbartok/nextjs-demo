import { useEffect, useState, useRef, RefObject } from 'react'

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
  const [isOnScreen, setIsOnScreen] = useState(false)

  useEffect(() => {
    intersectionObserverRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
  }, [])

  useEffect(() => {
    intersectionObserverRef.current!.observe(ref.current!)

    return () => {
      intersectionObserverRef.current!.disconnect()
    }
  }, [ref])

  return isOnScreen
}
