import React, { Component } from 'react';

import Navbar from './navbar';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <div className='header__title'>
                    Yeguada API
                </div>

                <div className="links">
                    <Navbar className="links__wrapper" loggedInStatus={this.props.loggedInStatus}/>
                </div>
            </div>
        );
    }
}
            
export default Header;