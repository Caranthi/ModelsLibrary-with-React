import React, {useState} from "react";
import '../styles/Header.css'

const Header = () => {
    const [inputValue, setInputValue] = useState('');

    const onInput = (e) => {
        setInputValue(e.target.value);
    };

    const onTitleClick = () => {
        window.location.reload();
    };

    return (
        <div className="Header">
            <p onClick={onTitleClick} className="HeaderTitle">
                Models Library
            </p>
            <input type="text" placeholder="Type model species..." value={inputValue} onChange={onInput} className="HeaderInput"/>
        </div>
    );
}

export default Header;
