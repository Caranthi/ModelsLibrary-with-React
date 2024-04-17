import React, {useState} from "react";
import '../styles/Header.css'

const Header = () => {
    const [inputValue, setInputValue] = useState('');

    const onInput = (species) => {
        setInputValue(species);
        console.log('Input: ', species);
    }

    return (
        <div className="Header">
            <p>
                Models Library
            </p>
            <input type="text" placeholder="Type model species..." onInput={onInput}/>
        </div>
    );
}

export default Header;
