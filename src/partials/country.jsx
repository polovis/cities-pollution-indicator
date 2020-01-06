import React from 'react';

class Country extends React.Component {
    setInputValue = (event) => {
        if(typeof this.props.selectCountry === 'function') {
            this.props.selectCountry(event);
        }
    }

    render(){
        return (
            <div onClick={this.setInputValue}>{this.props.country}</div>
        )
    }

    
}

export default Country;

