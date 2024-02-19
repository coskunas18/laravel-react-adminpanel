import { useRef, useState, useEffect } from "react"
import { MdOutlineDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaInfo } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";

export default function ToastItem({ type, title, deleteToast, id }) {
    const [closeAnimation, setCloseAnimation] = useState(false);
    const [isMouseHover, setIsMouseHover] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const timerRef = useRef(null);
    const duration = 4500;


    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setCloseAnimation(true);
            handleDeleteToast();
        }, duration)

        return () => {
            clearTimeout(timerRef.current)
        }

    }, []);

    const handlePauseTimer = () => {
        setRemainingTime(timerRef.current);
        setIsMouseHover(!isMouseHover);
        clearTimeout(timerRef.current);
    }

    const handleResumeTimer = () => {
        const remaining = Math.abs(remainingTime - duration);
        timerRef.current = setTimeout(() => {
            handleDeleteToast();
            setCloseAnimation(true);
        }, remaining)
    }


    const handleDeleteToast = () => {
        setTimeout(() => {
            deleteToast(id)
        }, 300)
    }


    const getIcon = (iconType) => {
        const size = 30;

        const iconTypes = {
            'success': <MdOutlineDone size={size} />,
            'error': <RiErrorWarningFill size={size} />,
            'info': <FaInfo size={size} />
        }

        return iconTypes[iconType] ?? "bok";
    }


    return (
        <>
            <div className={`toast-item toast-item-${type} ${closeAnimation ? 'close-animation' : ''} `} ref={timerRef}
                onMouseEnter={handlePauseTimer} onMouseLeave={handleResumeTimer}>
                <div className="toast-item-content">
                    <div className="toast-item-icon">
                        {getIcon(type)}
                    </div>
                    <div className="toast-item-title">
                        {title}
                    </div>
                    <div className="toast-item-close" onClick={() => deleteToast(id)}>
                        <IoMdClose size={18} />
                    </div>
                </div>
            </div>
        </>
    )
}
