import React from 'react';

function Alert() {
    const text = 'Sorry, dates are available only for Poland, Germany, France and Spain';

    return <span className='no-matches hidden'>{text}</span>
}

export default Alert;