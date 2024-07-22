import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useModalStore from "@/stores/useModalStore"
import React from "react"

export function Modal() {
    const { modalStore, hideModal } = useModalStore()

    const Component = () => {
        if (modalStore?.component) {
            return React.createElement(modalStore?.component.component, modalStore?.content);
        }
        return (
            <div>
                {typeof modalStore?.content?.message === 'string' && <div>{modalStore?.content?.message}</div>}
            </div>
        );
    };

    return (
        <Dialog open={modalStore?.isVisible}>
            <DialogTrigger asChild>
                <Button variant="outline">{modalStore?.content?.title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{modalStore?.content?.title}</DialogTitle>
                </DialogHeader>
                <div className="h-full w-full">
                    <Component />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { modalStore?.content?.onClose; hideModal }}>
                        {modalStore?.content?.cancelText}
                    </Button>
                    <Button onClick={() => { modalStore?.content?.onAccept; hideModal }}>{modalStore?.content?.acceptText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
