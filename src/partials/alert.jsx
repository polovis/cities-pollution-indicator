import React from 'react';

class Alert extends React.Component {
    render() {
        return <span className='no-matches hidden'>Sorry, dates are available only for Poland, Germany, France and Spain</span>
    }
}

export default Alert;