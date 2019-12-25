import React from 'react';
import FormField from './form';
import CitiesList from './citiesList';
import Alert from './alert';

import { autocomplete } from "./autocompleteSearch";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: ['Poland', 'Germany', 'Spain', 'France'],
            cities: []
        }

    }

    componentDidMount() {
        autocomplete(document.getElementById("myInput"), this.state.countries);
        document.getElementById('myInput').value = localStorage.getItem('myElement')
    }

    setCities = (data) => {
        this.setState({
            cities: data
        })
    }

    render() {
        return (
            <div className='row search-wrapper'>
                <FormField setCities={this.setCities} />
                <Alert />
                <CitiesList cities={this.state.cities} />
            </div>

        )
    }
}

export default Main;
