
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import SearchButton from './searchButton';
import Country from './country';

class FormField extends React.Component {
    constructor(props) {  
        super(props);      
        this.state = {
            countries: [],
            inputValue: localStorage.getItem('myElement')
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        let country = this.state.inputValue.toUpperCase();
        let alpha2 = '';

        if (country === 'POLAND') {
            alpha2 = 'PL';
        } else if (country === 'GERMANY') {
            alpha2 = 'DE';
        } else if (country === 'FRANCE') {
            alpha2 = 'FR';
        } else if (country === 'SPAIN') {
            alpha2 = 'ES';
        } else if (country === '') {
            alpha2 = '';
        } else {
            alpha2 = '*'
        }        

        if((country === 'POLAND') || (country === 'GERMANY') || (country === 'FRANCE') || (country === 'SPAIN')) {
            document.querySelector('.citiesListBackground').classList.remove('hidden');
            document.querySelector('.no-matches').classList.add('hidden');
        } else if (( country === '')) {
            document.querySelector('.citiesListBackground').classList.add('hidden');
            document.querySelector('.no-matches').classList.add('hidden');
        } else {
            document.querySelector('.no-matches').classList.remove('hidden');
            document.querySelector('.citiesListBackground').classList.add('hidden');
        }

        fetch(`https://api.openaq.org/v1/latest?country=${alpha2}&limit=10&parameter=pm25&order_by=measurements[0].value&sort[]=desc`)
            .then(res => res.json())
            .then((data) => {
                if (typeof this.props.setCities === 'function') {
                    this.props.setCities(data.results);
                }
            })
            .catch(err => console.log(err));

            if (this.localStorageTest()) {
                localStorage.setItem('myElement', document.getElementById('myInput').value);
            }
            document.getElementById('myInput').value = localStorage.getItem('myElement');            
    }

    enterCityName = (event) => {
        event.preventDefault();
        event.target.value = '';
        document.querySelector('.form.form-inline').classList.toggle('extend');
        this.setLocalStorage(event);

        const cityDescription = document.querySelector('.description-wrapper');

        if(cityDescription !== null) {
            cityDescription.parentElement.removeChild(cityDescription);
        }
    }

    shrinkForm = () => {
        document.querySelector('.form.form-inline').classList.toggle('extend');
    }

    localStorageTest = () =>{
        const test = "test" + new Date().valueOf();
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test)
            return true;
        } catch(e) {
            return false;
        }
    }

    setLocalStorage = (event) => {
        this.setState({
            inputValue: event.target.value
        });
        if (this.localStorageTest()) {
            localStorage.setItem('myElement', event.target.value);
        }
    }

    autocomplete = (event) => {
        let text = event.target.value;
        let countries = this.getFilteredCountry(text);
        this.setState({
            countries
        });

        this.setLocalStorage(event);
    }

    getFilteredCountry = (text) => {
        let countries = ['Poland', 'Germany', 'Spain', 'France']
        return countries.filter(country => country.toLowerCase().includes(text.toLowerCase()))
    }

    selectCountry = (event) => {
        this.setState({
            inputValue: event.target.innerText
        })
    }

    render() {
        let country;
        country = this.state.countries.map(country => {
            return (
                <Country key={country} country={country} selectCountry={this.selectCountry} />
            )
        })

        return (
            <div className='form-wrapper'>
                <Form inline onSubmit={this.onSubmit} autoComplete='off' className='col-6 form' >
                    <FormControl value={this.state.inputValue} type="text" placeholder="Enter country name..." className="sm-2" id='myInput' onFocus={this.enterCityName} onBlur={this.shrinkForm} onChange={this.autocomplete} onInput={this.showCountries}/>
                    <SearchButton sendData={this.onSubmit} />
                </Form>
                <div className={`col-6 country-wrapper `}>{country}</div>
            </div>
        )
    }
}

export default FormField;


