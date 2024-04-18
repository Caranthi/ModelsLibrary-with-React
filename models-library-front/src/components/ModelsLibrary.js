import React, {useEffect, useState} from "react";
import Header from "./Header";
import Models from "./Models";
import {subscribe} from "../events";

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
            <Header/>
            <Models filteredSpecies={filteredSpecies}/>
        </div>
    )
}

export default ModelsLibrary;
