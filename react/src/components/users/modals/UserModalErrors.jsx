
import { useSelector } from "react-redux";
import { getUserError } from "../UserSlice";


export default function UserModalErrors() {
    const errors = useSelector(getUserError);
    let errorMessages = null;

    if (errors !== null) {
        errorMessages = Object.values(errors);
    }


    return (
        <>
            {errorMessages && (
                <div className="bg-red-700 p-2 text-white text-xl rounded-md">
                    {errorMessages.map((err, index) => (
                        <div key={index}>
                            * {err}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
