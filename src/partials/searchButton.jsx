import React from 'react';
import Button from 'react-bootstrap/Button';
import { showCities } from './citiesList'

class SearchButton extends React.Component {
    sendData = () => {
        if(typeof this.props.sendData === 'function') {
            this.props.sendData();
        }
        showCities();
    }

    render () {
        return (
            <Button variant="outline-dark" onClick={this.sendData}><i className="fas fa-search"></i></Button>
        )
    }
}

export default SearchButton;
