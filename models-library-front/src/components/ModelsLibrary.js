import React, {useEffect, useState} from "react";
import Header from "./Header";
import Models from "./Models";
import {subscribe} from "../events";
import InitialPopup from "./InitialPopup";

const ModelsLibrary = () =>
{
    const [filteredSpecies, setFilteredSpecies] = useState('');

    useEffect(() =>
    {
        subscribe('filterSpecies', (data) => {
            setFilteredSpecies(data.detail);
        })
    });

    return(
        <div>
            <InitialPopup/>
            <Header/>
            <Models filteredSpecies={filteredSpecies}/>
        </div>
    )
}

export default ModelsLibrary;
