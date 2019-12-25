import React from 'react';
import Nav from 'react-bootstrap/Nav'

class Header extends React.Component {
    render() {
        return (
            <Nav className='row'>
                <Nav.Item>
                    <Nav.Link href="/home">Poluttion App...</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='https://airly.eu/en/everything-you-should-know-about-air-pollution' onSelect>
                    About Pollution
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

}

export default Header;