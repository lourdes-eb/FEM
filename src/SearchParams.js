import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class SearchParams extends React.Component {
    state = {
        location: "Seatle, WA",
        animal: "",
        breed: "",
        breeds: []
    };

    handleLocationChange = (event) => {
        this.setState({
            location: event.target.value
        });
    };

    handleAnimalChange = (event) => {
        this.setState({
            animal: event.target.value,
            breed: ""
        }, this.getBreeds); // After state is updated then call this function
    };

    getBreeds() {
        if(this.state.animal) {
            petfinder.breed.list({animal: this.state.animal})
            .then(data => {
                if(
                    data.petfinder &&
                    data.petfinder.breeds &&
                    Array.isArray(data.petfinder.breeds.breed)
                ) {
                    this.setState({breeds: data.petfinder.breeds.breed})
                } else {
                    this.setState(({breeds: []}))
                }
            })
        } else {
            this.setState(({breeds: []}))
        }
    }

    handleBreedChange = (event) => {
        this.setState({
            breed: event.target.value
        });
    }

    render() {
        return (
            <div className="search-params">
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={this.state.location}
                        placeholder="Location"
                        onChange={this.handleLocationChange}
                     >
                    </input>
                </label>

                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={this.state.animal}
                        onChange={this.handleAnimalChange}
                        onBlur={this.handleAnimalChange}
                    >
                        <option />
                        {
                            ANIMALS.map(animal => (
                                <option key={animal} value={animal}>
                                    {animal}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={this.state.breed}
                        onChange={this.handleBreedChange}
                        onBlur={this.handleBreedChange}
                        disabled={!this.state.breeds.length}
                    >
                        <option />
                        {
                            this.state.breeds.map(breed => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <button>Submit</button>
            </div>
        )
    }
}

export default SearchParams;

//export const SearchOtherParams = SearchParams; To export as a module
//Then how to import from outside
// import {SearchOtherParams} from './SearchParams'
// DO NOT DO: this.handleBreedChange.bind(this) .bind(this) gets called every render function
//you're creating and destroying the function in every call render