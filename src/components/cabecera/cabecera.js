import axios from 'axios';
import React, { Component } from 'react';
import Global from '../../Global';

class Cabecera extends Component {
    url = Global.url_dev;

    constructor() {
        super();

        this.state = {
            cabeceras: []
        }
    }

    componentDidMount() {
        axios.get(`${this.url}/cabecera`)
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

export default Cabecera;