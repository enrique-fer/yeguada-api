import React from "react";
import { CloudinaryContext, Image } from 'cloudinary-react'; 

const CaballoForm = (props) => {
    return (
        <div className='item'>
            {
                props.item.image != null ? (
                    <div>
                        {
                            props.foto.url == null ? (
                                <CloudinaryContext className='item__foto' cloudName="djkulk2kk">
                                    <Image className="cab-image" publicId={props.item.image} width="800px" height="450px" />
                                    <input type="file" name="foto" onChange={props.onChange} />
                                </CloudinaryContext> 
                            ) : (
                                <div className='item__foto'>
                                    <img className="cab-image" src={props.foto.url} />
                                    <input type="file" name="foto" onChange={props.onChange} />
                                </div>
                            )
                        }                        
                    </div>
                ) : (
                    <div className='item__foto'>
                        <img className="cab-image" src={props.foto.url} />
                        <input type="file" name="foto" onChange={props.onChange} />
                    </div>
                )
            }
        

            <div className='item__content'>
                <form className="form caballo-form" onSubmit={props.onSubmit}>
                    <div className="form-group caballo-form__nombre">
                        <input 
                            type="text" 
                            id="nombre" 
                            name="title"
                            placeholder="Nombre" 
                            value={props.item.title} 
                            onChange={props.onChange} />
                        <label htmlFor="nombre">Nombre</label>
                    </div>

                    <div className="form-group caballo-form__padre">
                        <input 
                            type="text" 
                            id="padre" 
                            name="padre"
                            placeholder="Padre" 
                            value={props.item.info.padre} 
                            onChange={props.onChange} />
                        <label htmlFor="padre">Padre</label>
                    </div>

                    <div className="form-group caballo-form__madre">
                        <input 
                            type="text" 
                            id="madre" 
                            name="madre"
                            placeholder="Madre" 
                            value={props.item.info.madre} 
                            onChange={props.onChange} />
                        <label htmlFor="madre">Madre</label>
                    </div>

                    <div className="form-group caballo-form__raza">
                        <input 
                            type="text" 
                            id="raza" 
                            name="raza"
                            placeholder="Raza" 
                            value={props.item.info.raza} 
                            onChange={props.onChange} />
                        <label htmlFor="raza">Raza</label>
                    </div>

                    <div className="form-group caballo-form__color">
                        <input 
                            type="text" 
                            id="color" 
                            name="color"
                            placeholder="Color" 
                            value={props.item.info.color} 
                            onChange={props.onChange} />
                        <label htmlFor="color">Color</label>
                    </div>

                    <div className="form-group  caballo-form__edad">
                        <input 
                            type="text" 
                            id="edad" 
                            name="edad"
                            placeholder="Edad" 
                            value={props.item.info.edad} 
                            onChange={props.onChange} />
                        <label htmlFor="edad">Edad</label>
                    </div>

                    <div className="centered-btn-wrapper caballo-form__btn">
                        <button type="submit" className="btn">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CaballoForm;