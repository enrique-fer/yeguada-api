import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';
import Global from '../../Global';

class Actividad extends Component {
    url = Global.url_dev;

    constructor() {
        super();

        this.state = {
            actividades: []
        }
    }

    componentDidMount() {
        this.getActividades();
    }

    deleteActividad(id) {
        axios.delete(`${this.url}actividad/delete/${id}`)
        .then(response => {
            this.getActividades();
        })
        .catch(error => {
            console.log(error);
        })
    }
 
    getActividades() {
        axios.get(`${this.url}actividad`)
        .then(res => {
            this.setState({
                actividades: res.data.actividades
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
                        this.state.actividades.map(actividad => {
                            return (
                                <div className='card' key={actividad._id}>
                                    <div className='info' >
                                        <div className='info__foto'>
                                        {
                                                actividad.image != null ? (
                                                    <CloudinaryContext cloudName="djkulk2kk">
                                                        <Image  publicId={actividad.image} width="150px" height="150px" />
                                                    </CloudinaryContext>
                                                ) : (
                                                    <img src="https://via.placeholder.com/150" />
                                                )
                                            }
                                        </div>

                                        <div className='info__nombre'>
                                            {actividad.title}
                                        </div>
                                    </div>

                                    <div className='card-acciones'>
                                        <Link to={`/edit/actividad/${actividad._id}`} className='action-btn edit-btn' title="Editar actividad">
                                            <i className='fas fa-pencil-alt'></i>
                                        </Link>

                                        <button className='action-btn delete-btn' title="Borrar actividad" onClick={() => { this.deleteActividad(actividad._id) }}>
                                            <i className='fas fa-trash-alt'></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='float-right-btn'>
                    <Link to={'/create/actividad'} className='create-btn' title="Crear actividad" >
                        <i className='fas fa-plus'></i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Actividad;