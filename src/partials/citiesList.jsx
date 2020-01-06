import React from 'react';
import City from './city';

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
        // fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=city&srsearch=${city}_town_city&format=json&origin=*`)
        fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${city}&format=json&origin=*`)
            .then(res => res.json())
            .then((data) => {
                if(data.parse !== undefined){
                    this.setState({
                        // description: data.query.search[0].snippet
                        description: data.parse.text['*']
                    }, () => {
                        this.createCityInfo();
                    })
                } else {
                    this.setState({
                        // description: data.query.search[0].snippet
                        description: 'City details are unavailable'
                    }, () => {
                        this.createCityInfo();
                    })
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        let cities;

        if (this.props.cities !== undefined) {
            cities = this.props.cities.map((city) => {
                return (
                    <City
                        key={city.location}
                        displayCityInfo={this.displayCityInfo}
                        city={city.city}
                        location={city.location}
                        parametr={city.measurements[0].parameter}
                        value={city.measurements[0].value}
                        unit={city.measurements[0].unit}
                    />
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