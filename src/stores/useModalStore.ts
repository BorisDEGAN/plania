
import { FunctionComponent, ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
    isVisible: boolean;
    component?: {
        component: FunctionComponent
        props?: Record<string, unknown>
    };
    content: {
        title?: string
        message?: string
        width?: string
        acceptText?: string
        cancelText?: string
        onAccept?: () => void
        onClose?: () => void
        footerContent?: ReactNode;
        headerContent?: ReactNode;
        [key: string]: unknown
    };
    show: (content?: ModalState['content'], component?: ModalState['component']) => void;
    hide: () => void;
}

const useModalStore = create<ModalState>(set => ({
    isVisible: false,
    component: undefined,
    content: {
        title: '',
        message: '',
        width: '60vw',
        acceptText: 'Accepter',
        cancelText: 'Annuler',
        onAccept: () => { },
        onClose: () => { },
        footerContent: undefined,
        headerContent: undefined
    },
    show: (content?: ModalState['content'], component?: ModalState['component']) => {
        set({
            isVisible: true,
            component,
            content: { ...content },
        });
        console.log({ content, component })
    },
    hide: () => {
        set({
            isVisible: false,
            component: undefined,
            content: {}
        });
    },
}));

export default useModalStore;