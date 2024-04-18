import React, {useState} from "react";
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

    const browseWikipedia = (species) => {
        console.log('Inside function');
        const searchURL = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(species)}`;
        window.open(searchURL, '_blank');
    }
    const deleteModel = (id) => {

    }
    const add = () => {

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
                    <input type="text" placeholder="Species..." defaultValue={newSpecies}/>
                </td>
                <td>
                    <input type="text" placeholder="Colour..." defaultValue={newColour}/>
                </td>
                <td>
                    <input type="number" defaultValue={firstAppearance}/>
                </td>
                <td>
                    <input type="number" defaultValue={newWeight}/>
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
