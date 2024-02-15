import { useRef, useState, useEffect } from "react"
import { MdOutlineDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaInfo } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";

export default function ToastItem({ type, title, deleteToast, id }) {
    const [closeAnimation, setCloseAnimation] = useState(false);

    const timerRef = useRef(null);
    const duration = 2000;


    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setCloseAnimation(true);
            handleDeleteToast();
        }, duration)

        return () => {
            clearTimeout(timerRef.current)
        }

    }, []);

    handleDeleteToast = () => {
        setTimeout(() => {
            deleteToast(id)
        }, 300)
    }


    const getIcon = (iconType) => {
        const wd = 30;
        const hg = 30;

        const iconTypes = {
            'success': <MdOutlineDone />,
            'error': <RiErrorWarningFill />,
            'info': <FaInfo />
        }

        return iconTypes[iconType];
    }


    return (
        <div className="toast-item" ref={timerRef}>
            <div className="toast-item-content">
                <div className="toast-item-icon">
                    {getIcon(type)}
                </div>
                <div className="toast-item-title">
                    {title}
                </div>
                <div className="toast-item-close" onClick={() => deleteToast(id)}>
                    <IoMdClose />
                </div>
            </div>
        </div>
    )
}
