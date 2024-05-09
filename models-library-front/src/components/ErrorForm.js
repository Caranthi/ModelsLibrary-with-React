import React, {useEffect, useState} from "react";
import '../styles/ErrorForm.css';
import {publish} from "../events";
const ErrorForm = (props) => {
    const [isShown, setIsShown] = useState(false);

    const closeError = () => {
        console.log('Error closed');
        publish('error', '');
        setIsShown(false);
    }

    useEffect(() => {
        if (props.error !== '') {
            setIsShown(true);
            setTimeout(closeError, 5000);
        }
    }, [props.error])

    return (
        <div>
            {isShown && (
                <div className="background">
                    <div className="error" onClick={() => closeError()}>
                        <p>{props.error}</p>
                    </div>
                </div>)}
        </div>
    )
}

export default ErrorForm;
