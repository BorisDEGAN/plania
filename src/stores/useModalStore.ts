import { ReactNode } from 'react';
import { atom, selector, useRecoilState } from 'recoil';

interface ModalState {
    isVisible?: boolean;
    component?: {
        component: React.JSXElementConstructor<any>;
        props?: Record<string, unknown>
    };
    content?: {
        title?: string
        message?: string | React.JSXElementConstructor<any>
        width?: string
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
    key: 'modalState',
    default: {
        isVisible: false,
        component: undefined,
        content: {
            title: '',
            message: '',
            width: '60vw',
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

const showModalSelector = selector({
    key: 'showModal',
    get: ({ get }) => get(modalState),
    set: ({ set }, newValue) => {
        set(modalState, {
            isVisible: true,
            ...newValue
        } as ModalState);
    }
});

const hideModalSelector = selector({
    key: 'hideModal',
    get: () => { },
    set: ({ set }) => {
        set(modalState, {
            isVisible: false,
            component: undefined,
            content: {}
        });
    }
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


export { modalState, showModalSelector, hideModalSelector };
