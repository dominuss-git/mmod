import { useCallback, useEffect, useMemo, useRef } from "react"

interface IUseIntervalProps {
  callback: () => void
  timeout: number
}

export const useInterval = ({ callback, timeout }: IUseIntervalProps) => {
  const refTimeout = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    refTimeout.current = setInterval(callback, timeout)

    return () => clearInterval(refTimeout.current as ReturnType<typeof setInterval>)
  }, [callback, timeout])
}