"use client"
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Toast = { id: string; title: string; description?: string; type?: 'success'|'error'|'info' }

const ToastContext = createContext<{ show: (t: Omit<Toast,'id'>)=>void } | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }){
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(()=>{ setMounted(true) }, [])

  const show = useCallback((t: Omit<Toast,'id'>)=>{
    const toast = { ...t, id: String(Date.now()) }
    setToasts(s => [...s, toast])
    setTimeout(()=>{
      setToasts(s => s.filter(x => x.id !== toast.id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2" aria-live="polite">
              {toasts.map(t => (
                <div
                  key={t.id}
                  className={`max-w-sm rounded p-3 shadow text-white ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-slate-800'}`}
                >
                  <div className="font-semibold">{t.title}</div>
                  {t.description && <div className="text-sm opacity-90">{t.description}</div>}
                </div>
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  )
}

export function useToast(){
  const ctx = useContext(ToastContext)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
