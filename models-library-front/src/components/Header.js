import React from "react";
import '../styles/Header.css'
import {publish} from "../events";

const Header = () => {
    const onInput = (e) => {
        if (e.key === 'Enter') {
            publish('filterSpecies', e.target.value);
        }
    };
    const onTitleClick = () => {
        window.location.reload();
    };

    return (
        <div className="Header">
            <p onClick={onTitleClick} className="HeaderTitle">
                Models Library
            </p>
            <input type="text" placeholder="Type model species..." onKeyDown={onInput} className="HeaderInput"/>
        </div>
    );
}

export default Header;
