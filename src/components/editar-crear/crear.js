import axios from 'axios';
import React, { Component } from 'react';

import history from '../../history';
import Global from '../../Global';
import CaballoForm from './edit-createForms';

class Crear extends Component {
    url = Global.url_dev;

    constructor(props) {
        super(props);

        this.state = {
            type: "",
            item: {},
            foto: {
                url: "https://via.placeholder.com/800x450"
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.buildForm = this.buildForm.bind(this);
    }

    componentDidMount() {
        const { type } = this.props.match.params;
        var item = {};
        switch(type) {
            case "caballo":
                item = {
                    title: "",
                    info: {
                        padre: "",
                        madre: "",
                        color: "",
                        raza: "",
                        edad: ""
                    }
                }

                this.setState({
                    type,
                    item
                })
            case "cabecera":
                this.setState({
                    type,
                    item
                })
            case "actividad":
                this.setState({
                    type,
                    item
                })
            default:
                break;
        }
    }

    buildForm() {
        var formData = new FormData();
        let item = this.state.item;

        formData.append("title", item.title);
        formData.append("info[padre]", item.info.padre);
        formData.append("info[madre]", item.info.madre);
        formData.append("info[color]", item.info.color);
        formData.append("info[raza]", item.info.raza);
        formData.append("info[edad]", item.info.edad);

        return formData;
    }
    
    onSubmit(event) {    
        event.preventDefault();    
        
        axios.post(`${this.url}${this.state.type}/save`, this.buildForm())
        .then(response => {
            let caballo = response.data.caballo;

            this.uploadImage(caballo._id)
            .then(res => {
                history.goBack();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    onChange(event) {
        let item = this.state.item;
        let foto = this.state.foto;

        if (event.target.name === 'title') {
            item[event.target.name] = event.target.value;
        } else {
            if (event.target.name === 'foto') {
                foto = event.target.files[0]
                foto.url = URL.createObjectURL(event.target.files[0]);
            } else {
                item.info[event.target.name] = event.target.value;
            }
        }

        this.setState({
            ...this.state,
            item,
            foto
        });
    }

    uploadImage(id) {
        var formData = new FormData();
        formData.append("file0", this.state.foto);

        return axios.post(`${this.url}${this.state.type}/upload-image/${id}`, formData);
    }

    renderContent() {
        switch(this.state.type) {
            case "caballo":
                return <CaballoForm 
                            item={this.state.item} 
                            type={this.state.type}
                            foto={this.state.foto}
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                            showUploadWidget={this.showUploadWidget}
                        />
            case "cabecera":
                return this.renderCabecera();
            case "actividad":
                return this.renderActividad();
            default:
                break;
        }
    }

    renderCabecera() {
        const item = this.state.item;

        return (
            <div className='item'>
            <div className='item__foto'>
                <img src="https://via.placeholder.com/800x450" />
            </div>

            <div className='item__content'>
                <h2>{item.title}</h2>
            </div>
        </div>
        )
    }

    renderActividad() {
        const item = this.state.item;

        return (
            <div className='item'>
            <div className='item__foto'>
                <img src="https://via.placeholder.com/800x450" />
            </div>

            <div className='item__content'>
                <h2>{item.title}</h2>
            </div>
        </div>
        )
    }

    render() {
        return (
            <div className='crear'>
               {
                   this.renderContent()
               }
            </div>
        );
    }
}

export default Crear;