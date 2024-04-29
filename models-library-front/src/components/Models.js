import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import '../styles/Models.css'
import {publish} from "../events";

const Models = (props) => {
    const [initialModels, setInitialModels] = useState([]);
    const [currentModels, setCurrentModels] = useState(initialModels);
    const [newSpecies, setNewSpecies] = useState('');
    const [newColour, setNewColour] = useState('');
    const [firstAppearance, setFirstAppearance] = useState(0);
    const [newWeight, setNewWeight] = useState(0);
    const initialSpecies = ['Blue Whale', 'Tiger Shark', 'Humpback Whale'];
    const initialColours = ['Blue', 'Green', 'Black'];
    const initialAppearances = [2021, 2021, 2022];
    const initialWeights = [172, 86, 242];

    const speciesInput = useRef(null);
    const colourInput = useRef(null);
    const appearanceInput = useRef(null);
    const weightInput = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/').then((response) => {
            console.log('Models: ', response.data);
            setInitialModels(response.data);

            if (response.data.length === 0) {
                for (let i = 0; i < initialSpecies.length; i++) {
                    let modelData = {
                        species: initialSpecies[i], colour: initialColours[i], firstAppearance: initialAppearances[i],
                        weight: initialWeights[i]
                    };

                    axios.post('http://localhost:8080/', modelData).then((response) => {
                        console.log('Added model: ', response.data);
                    }).then(() => {
                        axios.get('http://localhost:8080/').then((response) => {
                            console.log('Initial Models: ', response.data);
                            setInitialModels(response.data);
                        });
                    }).catch(error => {
                        console.error('ERROR: ', error);
                        publish('error', error.response.data);
                    });
                }
            }
        }).catch(error => {
            console.error('ERROR: ', error);
            publish('error', error.response.data);
        });
    }, []);
    useEffect(() => {
        if (props.filteredSpecies !== '') {
            setCurrentModels(initialModels.filter((model) => model.species.toUpperCase().includes(props.filteredSpecies.toUpperCase())));
        } else {
            setCurrentModels(initialModels);
        }
    }, [props.filteredSpecies, initialModels]);

    const browseWikipedia = (species) => {
        const searchURL = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(species)}`;
        window.open(searchURL, '_blank');
    };
    const deleteModel = (id) => {
        axios.delete(`http://localhost:8080/${id}`).then((response) => {
            console.log(response.data);

            axios.get('http://localhost:8080/').then((response) => {
                console.log('Models: ', response.data);
                setCurrentModels(response.data);
            }).catch(error => {
                console.log('ERROR: ', error);
                publish('error', error.response.data);
            });
        }).catch(error => {
            console.log('ERROR: ', error);
            publish('error', error.response.data);
        })
    };
    const add = () => {
        let modelData = {species: newSpecies, colour: newColour, firstAppearance: firstAppearance, weight: newWeight};

        axios.post('http://localhost:8080/', modelData).then((response) => {
            console.log('Added model: ', response.data);

            axios.get('http://localhost:8080/').then((response) => {
                console.log('Models: ', response.data);
                setCurrentModels(response.data);

                clearInputs();
            });
        }).catch(error => {
            console.error('ERROR: ', error);
            publish('error', error.response.data);
        });
    };
    const onSpeciesInput = (e) => {
        setNewSpecies(e.target.value);
    }
    const onColourInput = (e) => {
        setNewColour(e.target.value);
    }
    const onAppearanceInput = (e) => {
        setFirstAppearance(e.target.value);
    }
    const onWeightInput = (e) => {
        setNewWeight(e.target.value);
    }
    const clearInputs = () => {
        speciesInput.current.value = '';
        colourInput.current.value = '';
        appearanceInput.current.value = 0;
        weightInput.current.value = 0;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Species</th>
                <th>Colour</th>
                <th>First Appearance</th>
                <th>Weight [g]</th>
                <th>Context action</th>
            </tr>
            </thead>
            <tbody>
            {currentModels.map((model, index) => (
                <tr key={model.id}>
                    <td onClick={() => browseWikipedia(model.species)} className="hyperLink">{model.species}</td>
                    <td>{model.colour}</td>
                    <td>{model.firstAppearance}</td>
                    <td>{model.weight}</td>
                    <td>
                        <button onClick={() => deleteModel(model.id)}>DELETE</button>
                    </td>
                </tr>
            ))}
            <tr>
                <td>
                    <input type="text" placeholder="Species..." defaultValue={newSpecies} onInput={onSpeciesInput} ref={speciesInput}/>
                </td>
                <td>
                    <input type="text" placeholder="Colour..." defaultValue={newColour} onInput={onColourInput} ref={colourInput}/>
                </td>
                <td>
                    <input type="number" defaultValue={firstAppearance} onInput={onAppearanceInput} ref={appearanceInput}/>
                </td>
                <td>
                    <input type="number" defaultValue={newWeight} onInput={onWeightInput} ref={weightInput}/>
                </td>
                <td>
                    <button onClick={() => add()}>ADD</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Models;
