import React from 'react';

class City extends React.Component {
    displayCityInfo = (event) => {
        if(typeof this.props.displayCityInfo === 'function'){
            this.props.displayCityInfo(event);
        }
    }
    

    render() {
        return (
            <div className='single-city col-3' onClick={this.displayCityInfo}>
                <div>
                    <p>{this.props.city}</p>
                    <p>{this.props.location}</p>
                    <p>air condition:</p>
                    <p>
                        {this.props.parameter} ({this.props.value} {this.props.unit})
            </p>
                </div>
            </div>
        )
    }
}

export default City;