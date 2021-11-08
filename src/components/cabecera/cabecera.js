import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';

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
       this.getCabeceras();
    }

    deleteCabecera(id) {
        axios.delete(`${this.url}cabecera/delete/${id}`)
        .then(response => {
            this.getCabeceras();
        })
        .catch(error => {
            console.log(error);
        })
    }

    getCabeceras() {
        axios.get(`${this.url}cabecera`)
        .then(res => {
            this.setState({
                cabeceras: res.data.cabeceras
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className='cards'>
                <div className='card-grid'>
                    {
                        this.state.cabeceras.map(cabecera => {
                            return (
                                <div className='card' key={cabecera._id}>
                                    <div className='info' >
                                        <div className='info__foto'>
                                        {
                                                cabecera.bg_image != null ? (
                                                    <CloudinaryContext cloudName="djkulk2kk">
                                                        <Image  publicId={cabecera.bg_image} width="150px" height="150px" />
                                                    </CloudinaryContext>
                                                ) : (
                                                    <img src="https://via.placeholder.com/150" />
                                                )
                                            }
                                        </div>

                                        <div className='info__nombre'>
                                            {cabecera.title}
                                        </div>
                                    </div>

                                    <div className='card-acciones'>
                                        <Link to={`/edit/cabecera/${cabecera._id}`} className='action-btn edit-btn' title="Editar cabecera">
                                            <i className='fas fa-pencil-alt'></i>
                                        </Link>

                                        <button className='action-btn delete-btn' title="Borrar cabecera" onClick={() => { this.deleteCabecera(cabecera._id) }}>
                                            <i className='fas fa-trash-alt'></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='float-right-btn'>
                    <Link to={'/create/cabecera'} className='create-btn' title="Crear cabecera" >
                        <i className='fas fa-plus'></i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Cabecera;