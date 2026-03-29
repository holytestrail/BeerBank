import { useEffect } from 'react'

type ToastProps = {
  message: string
  isError?: boolean
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, isError, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => {
      onClose()
    }, 2400)

    return () => clearTimeout(timer)
  }, [visible, onClose])

  if (!visible || !message) return null

  return (
    <div
      className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform duration-300 ease-out max-w-[320px] text-center"
      style={{
        background: isError ? '#c0392b' : '#333',
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',
      }}
    >
      {message}
    </div>
  )
}
