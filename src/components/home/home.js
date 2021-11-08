import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Global from '../../Global';

class Home extends Component {
    url = Global.url;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                Bienvenido al home
            </div>
        );
    }
}

Home = connect(null, actions)(Home);

export default Home;