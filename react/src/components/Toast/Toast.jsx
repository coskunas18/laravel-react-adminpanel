import ReactDOM from "react-dom";
import ToastItem from "./ToastItem";
import "./ToastStyle.css"
import { useState, useEffect } from "react";
import { toastChange } from "./ToastSlice";
import { useDispatch } from "react-redux";

export default function Toast({ type, title }) {

    const [toastArray, setToastArray] = useState([]);
    const dispatch = useDispatch();


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


    useEffect(() => {
        handleCreateToast();
    }, []);


    const deleteToast = (id) => {

        setToastArray((prev) => prev.filter((item) => item.id !== id))
        dispatch(toastChange({
            type: '',
            title: '',
            status: false,
        }))
    }


    return ReactDOM.createPortal(
        <div className="toast">
            {
                toastArray.map(toast => (
                    <ToastItem
                        key={toast.id}
                        id={toast.id}
                        type={type}
                        title={title}
                        deleteToast={deleteToast}
                        toastArray={toastArray}
                    />
                ))
            }
        </div>,
        document.getElementById('toast')
    )
}
