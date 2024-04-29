import React, {useEffect, useState} from "react";
import Header from "./Header";
import Models from "./Models";
import {subscribe} from "../events";
import InitialPopup from "./InitialPopup";
import ErrorForm from "./ErrorForm";

const ModelsLibrary = () => {
    const [filteredSpecies, setFilteredSpecies] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        subscribe('filterSpecies', (data) => {
            setFilteredSpecies(data.detail);
        })
    });
    useEffect(() => {
        subscribe('error', (data) => {
            setError(data.detail);
        });
    });

    return (
        <div>
            <InitialPopup/>
            <Header/>
            <Models filteredSpecies={filteredSpecies}/>
            <ErrorForm error={error}/>
        </div>
    )
}

export default ModelsLibrary;
