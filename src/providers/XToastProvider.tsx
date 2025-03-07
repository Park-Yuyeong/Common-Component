'use client';

import XToast from '@/components/Modals/XToast';
import { ToastContextType, ToastType } from '@/types/modal.type';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const initialValue: ToastContextType = {
    on: () => {}
};

const ToastContext = createContext(initialValue);

export const useToast = (): ToastContextType => useContext(ToastContext);

export function XToastProvider({ children }: PropsWithChildren) {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const addToast = (toast: ToastType): void => {
        const id = Date.now();

        setToasts((prev) => [...prev, { ...toast, id }]);

        setTimeout(() => removeToast(id), 2000);
    };

    const removeToast = (id: number): void => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const value: ToastContextType = {
        on: addToast
    };

    return (
        <ToastContext.Provider value={value}>
            <div className="z-10 fixed left-0 right-0 flex flex-col items-center">
                {toasts.map((toast) => (
                    <XToast key={toast.id} toast={toast} onClose={() => removeToast(toast.id!)} />
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );
}
