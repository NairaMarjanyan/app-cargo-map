import { toast } from "react-toastify";

export function showSuccessNotification(text) {
    return toast.success(text);
}

export function showErrorNotification(text) {
    return toast.error(text);
}

export function clearToasts() {
    toast.clearWaitingQueue();
}
