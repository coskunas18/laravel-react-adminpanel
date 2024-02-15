import ReactDOM from "react-dom";
import ToastItem from "./ToastItem";


export default function Toast({ toastArray, setToastArray }) {

    const deleteToast = (id) => {
        setToastArray((prev) => prev.filter((item) => item.id !== id))
    }


    return ReactDOM.createPortal(
        <div className="toast">
            {
                toastArray.map((toast, key) => (
                    <ToastItem
                        key={key}
                        id={toast.id}
                        type={toast.type}
                        title={toast.title}
                        deleteToast={deleteToast}
                        toastArray={toastArray}
                    />
                ))
            }
        </div>,
        document.getElementById('toast')
    )
}
