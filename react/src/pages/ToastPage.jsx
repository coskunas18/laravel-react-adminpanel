import { useState } from "react"
import Toast from "../components/Toast/Toast";


export default function ToastPage() {
    const [toastArray, setToastArray] = useState([]);

    const handleCreateToast = (type, title) => {
        setToastArray((prev) => [
            {
                id: new Date().getUTCMilliseconds(),
                type,
                title
            },
            ...prev
        ])
    }

    return (
        <div>
            <Toast toastArray={toastArray} setToastArray={setToastArray} />
            <button onClick={() => handleCreateToast('success', 'Success Toast')}>
                Create Success Toast
            </button>
        </div>
    )
}
