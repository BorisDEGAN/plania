import { toast } from "react-toastify";

/**
 * Returns a set of functions for displaying toast messages.
 * @param {Object} newOptions - The options for the toast.
 * @return {object} An object containing functions for
 * displaying toast messages.
 */
export default function useToast(newOptions: object = {}): {
    toastSuccess: Function;
    toastWarning: Function;
    toastError: Function;
    toastInfo: Function;
} {
    const options = {
        ...newOptions,
        position: undefined,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: undefined,
    };

    /**
     * Displays a success toast message with the given message.
     *
     * @param {string} message - The message to be displayed in the toast.
     */
    function toastSuccess(message: string): void {
        toast.success(message, options);
    }

    /**
     * Displays a warning toast message with the given message.
     *
     * @param {string} message - The message to be displayed in the toast.
     */
    function toastWarning(message: string): void {
        toast.warning(message, options);
    }

    /**
     * Displays an error toast message.
     *
     * @param {string} message - The error message to display.
     * @return {undefined} This function does not return a value.
     */
    function toastError(message: string): void {
        toast.error(message, options);
    }

    /**
     * Displays an information toast message.
     *
     * @param {string} message - The message to be displayed in the toast.
     * @return {undefined} This function does not return a value.
     */
    function toastInfo(message: string): void {
        toast.info(message, options);
    }

    return {
        toastSuccess,
        toastWarning,
        toastError,
        toastInfo,
    };
}
