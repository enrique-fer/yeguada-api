import axios from 'axios';
import React, { Component } from 'react';
import Global from '../../Global';

class Actividad extends Component {
    url = Global.url_dev;

    constructor() {
        super();

        this.state = {
            actividad: []
        }
    }

    componentDidMount() {
        axios.get(`${this.url}/actividad`)
        .then(res => {
            console.log(res);
            // this.setState()
        })
    }

    render() {
        return (
            <div>
                caballo
            </div>
        );
    }
}

export default Actividad;