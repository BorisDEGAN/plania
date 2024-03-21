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
    const { isOpen, content, component, hideModal } = useModalStore()

    const Component = () => {
        if (component) {
            return React.createElement(component.component, component.props);
        }
        return <div>
            {content.message}
        </div>;
    };

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">{content.title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{content.title}</DialogTitle>
                        <DialogDescription>
                            {content.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="h-full w-full">
                        <Component />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { content.onClose; hideModal }}>
                            {content.cancelText}
                        </Button>
                        <Button onClick={() => { content.onAccept; hideModal }}>{content.acceptText}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
