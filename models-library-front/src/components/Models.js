import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../styles/Models.css'

const Models = (props) => {
    const [initialModels, setInitialModels] = useState([{
        'id': 0,
        'species': 'example species',
        'colour': 'black',
        'firstAppearance': 2021,
        'weight': 213
    }]);
    const [currentModels, setCurrentModels] = useState(initialModels);
    const [newSpecies, setNewSpecies] = useState('');
    const [newColour, setNewColour] = useState('');
    const [firstAppearance, setFirstAppearance] = useState(0);
    const [newWeight, setNewWeight] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8080/').then((response) => {
            console.log('Models: ', response.data);
            setInitialModels(response.data);
            // setCurrentModels(initialModels);
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
        console.log('Inside function');
        const searchURL = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(species)}`;
        window.open(searchURL, '_blank');
    }
    const deleteModel = (id) => {

    }
    const add = () => {
        let modelData = {species: newSpecies, colour: newColour, firstAppearance: firstAppearance, weight: newWeight};

        axios.post('http://localhost:8080/', modelData).then((response) => {
            console.log('Added model: ', response.data);

            axios.get('http://localhost:8080/').then((response) => {
                console.log('Models: ', response.data);
                setCurrentModels(response.data);
            });
        }).catch(error => {
            console.error('ERROR: ', error);
        });

        setNewSpecies('');
        setNewColour('');
        setFirstAppearance(0);
        setNewWeight(0);
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
                <tr>
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
                    <input type="text" placeholder="Species..." defaultValue={newSpecies} onInput={onSpeciesInput}/>
                </td>
                <td>
                    <input type="text" placeholder="Colour..." defaultValue={newColour} onInput={onColourInput}/>
                </td>
                <td>
                    <input type="number" defaultValue={firstAppearance} onInput={onAppearanceInput}/>
                </td>
                <td>
                    <input type="number" defaultValue={newWeight} onInput={onWeightInput}/>
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
