import React from 'react';

export const showCities = function () {
    const cities = document.querySelectorAll('.single-city')
    for (let city of cities) {
        city.classList.remove('hidden');
    }
    if(document.querySelector('.description-wrapper') !== null) {
        document.querySelector('.description-wrapper').parentElement.removeChild(document.querySelector('.description-wrapper'));
    }    
}

class CitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
    }

    switchCities = () => {
        const cities = document.querySelectorAll('.single-city')
        for (let city of cities) {
            city.classList.toggle('hidden');
        }
    }

    createCityInfo = () => {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('description-wrapper');

        const description = document.createElement('p');
        const close = document.createElement('div');
        close.classList.add('close-window');

        const gyphicon = document.createElement('i');
        gyphicon.classList.add('fas');
        gyphicon.classList.add('fa-times');

        close.appendChild(gyphicon);

        descriptionWrapper.appendChild(close);
        descriptionWrapper.appendChild(description);
        description.innerHTML = this.state.description;

        document.querySelector('.citiesListBackground div').appendChild(descriptionWrapper);

        close.addEventListener('click', () => {
            descriptionWrapper.parentElement.removeChild(descriptionWrapper);
            this.switchCities();

        })

        this.switchCities();
    }

    displayCityInfo = (event) => {
        const city = event.currentTarget.firstElementChild.firstElementChild.innerText;
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=city&srsearch=${city}_town_city&format=json&origin=*`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    description: data.query.search[0].snippet
                }, () => {
                    this.createCityInfo();
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let cities;

        if (this.props.cities !== undefined) {
            cities = this.props.cities.map((city) => {
                return (
                    <div className='single-city col-3' key={city.location} onClick={this.displayCityInfo}>
                        <div>
                            <p>{city.city}</p>
                            <p>{city.location}</p>
                            <p>air condition:</p>
                            <p>
                                {city.measurements[0].parameter} ({city.measurements[0].value} {city.measurements[0].unit})
                                </p>
                        </div>
                    </div>
                )
            });
        }

        return (
            <div className="citiesListBackground col-6 hidden">
                <div className='row'>
                    {cities}
                </div>
            </div>
        )
    }
}

export default CitiesList;