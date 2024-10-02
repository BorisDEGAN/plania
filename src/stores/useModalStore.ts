import { ReactNode } from 'react';
import { atom, useRecoilState } from 'recoil';

interface ModalState {
    isVisible?: boolean;
    component?: {
        component: React.JSXElementConstructor<any>;
        props?: Record<string, unknown>
    };
    content?: {
        title?: string
        message?: string | React.JSXElementConstructor<any>
        width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl',
        padded?: boolean
        draggable?: boolean
        acceptText?: string
        cancelText?: string
        onAccept?: () => void
        onCancel?: () => void
        onClose?: () => void
        onSuccess?: () => void
        headerContent?: ReactNode;
        footerContent?: ReactNode | Boolean;
        [key: string]: unknown
    };
}

const modalState = atom<ModalState>({
    key: 'modal-store',
    default: {
        isVisible: false,
        component: undefined,
        content: {
            title: '',
            message: '',
            width: '4xl',
            padded: true,
            acceptText: 'Accepter',
            onAccept: () => { },
            onCancel: () => { },
            onClose: () => { },
            onSuccess: () => { },
            headerContent: undefined,
            footerContent: false,
        },
    },
});

export default function useModalStore() {
    const [modalStore, setModalStore] = useRecoilState(modalState)

    function showModal(content: ModalState['content'], component?: ModalState['component']) {
        setModalStore({
            ...modalStore,
            isVisible: true,
            content,
            component
        });
    }

    function hideModal() {
        setModalStore({
            ...modalStore,
            isVisible: false
        });
    }

    return {
        modalStore,
        showModal,
        hideModal
    }
}


export { modalState };
