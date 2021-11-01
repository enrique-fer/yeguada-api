import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../../Global';


class Caballo extends Component {
    url = Global.url_dev;

    constructor() {
        super();

        this.state = {
            caballos: [],
            data: ""
        }

        this.getCaballos = this.getCaballos.bind(this);
    }

    componentDidMount() {
        this.getCaballos();
    }

    deleteCaballo(id) {
        axios.delete(`${this.url}caballo/delete/${id}`)
        .then(response => {
            this.getCaballos();
        })
        .catch(error => {
            console.log(error);
        })
    }

    getCaballos() {
        axios.get(`${this.url}caballo`)
        .then(res => {
            this.setState({
                caballos: res.data.caballos
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className='caballos'>
                <div className='caballos-grid'>
                    {
                        this.state.caballos.map(caballo => {
                            return (
                                <div className='caballo-card' key={caballo._id}>
                                    <div className='caballo' >
                                        <div className='caballo__foto'>
                                            <img src="https://via.placeholder.com/150" />
                                        </div>

                                        <div className='caballo__nombre'>
                                            {caballo.title}
                                        </div>
                                    </div>

                                    <div className='caballo-acciones'>
                                        <Link to={`/edit/caballo/${caballo._id}`} className='action-btn edit-btn' title="Editar caballo">
                                            <i className='fas fa-pencil-alt'></i>
                                        </Link>

                                        <button className='action-btn delete-btn' title="Borrar caballo" onClick={() => { this.deleteCaballo(caballo._id) }}>
                                            <i className='fas fa-trash-alt'></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='float-right-btn'>
                    <Link to={'/create/caballo'} className='create-btn' title="Crear caballo" >
                        <i className='fas fa-plus'></i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Caballo;