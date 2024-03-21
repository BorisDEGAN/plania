
import { FunctionComponent, ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    component?: {
        component: FunctionComponent
        props?: Record<string, unknown>
    };
    content: {
        title?: string
        message?: string
        description?: string
        width?: string
        acceptText?: string
        cancelText?: string
        onAccept?: () => void
        onClose?: () => void
        [key: string]: unknown
    };
    showModal: (content?: ModalState['content'], component?: ModalState['component']) => void;
    hideModal: () => void;
}

const useModalStore = create<ModalState>(set => ({
    isOpen: false,
    component: undefined,
    content: {
        acceptText: 'Accepter',
        cancelText: 'Annuler',
        onAccept: () => { },
        onClose: () => { },
    },
    showModal: (content?: ModalState['content'], component?: ModalState['component']) => {
        set({
            isOpen: true,
            component,
            content: { ...content },
        });
    },
    hideModal: () => {
        set({
            isOpen: false,
            component: undefined,
            content: {}
        });
    },
}));

export default useModalStore;