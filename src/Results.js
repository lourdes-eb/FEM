
import Pet from './Pet';
import pf from 'petfinder-client';
import React from 'react';

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
});

class Results extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            pets: [],
        };
    }

    componentDidMount() {



        petfinder.pet.find({output: 'full', location:'CA'}).then(({petfinder}) => {
                let pets = [];

                if (petfinder.pets && petfinder.pets.pet) {
                    if (Array.isArray(petfinder.pets.pet)) {
                        pets = petfinder.pets.pet;
                    } else {
                        pets = [petfinder.pets.pet];
                    }
                }

                this.setState({
                    pets,
                });
            }
        );
    }

    handleTitleClick() {
        alert('You clicked the title');
    }

    render() {
        return (
            <div>
                {this.state.pets.map((pet) => {
                    let breed;

                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(', ');
                    } else {
                        breed = pet.breeds.breed;
                    }

                    return (
                        <div>
                            <Pet
                                key={pet.id}
                                name={pet.name}
                                animal={pet.animal}
                                breed={breed}
                                location={`${pet.contact.city}, ${pet.contact.state}`}
                                media={pet.media}
                                id={pet.id}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default Results;
