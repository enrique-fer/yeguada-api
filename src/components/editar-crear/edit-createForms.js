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

const CabeceraForm = (props) => {
    return (
        <div className='item'>
            {
                props.item.bg_image != null ? (
                    <div>
                        {
                            props.foto.url == null ? (
                                <CloudinaryContext className='item__foto' cloudName="djkulk2kk">
                                    <Image className="cab-image" publicId={props.item.bg_image} width="800px" height="450px" />
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
                <form className="form cabecera-form" onSubmit={props.onSubmit}>
                    <div className="form-group cabecera-form__titulo">
                        <input 
                            type="text" 
                            id="title" 
                            name="title"
                            placeholder="Titulo" 
                            value={props.item.title} 
                            onChange={props.onChange} />
                        <label htmlFor="title">Titulo</label>
                    </div>

                    <div className="form-group cabecera-form__path">
                        <input 
                            type="text" 
                            id="path" 
                            name="path"
                            placeholder="Ruta" 
                            value={props.item.path} 
                            onChange={props.onChange} />
                        <label htmlFor="path">Ruta</label>
                    </div>

                    <div className="form-group cabecera-form__main-page">
                        <select name="isMainPage" value={props.item.isMainPage} onChange={props.onChange}>
                            <option value="" disabled>Seleccione una opcion</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        <label htmlFor="isMainPage">Pagina Principal</label>
                    </div>

                    <div className="centered-btn-wrapper cabecera-form__btn">
                        <button type="submit" className="btn">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ActividadForm = (props) => {
    return (
        <div className='item'>
            {
                props.item.image != null ? (
                    <div>
                        {
                            props.foto.url == null ? (
                                <CloudinaryContext className='item__foto' cloudName="djkulk2kk">
                                    <Image publicId={props.item.image} width="450px" height="450px" />
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
                <form className="form actividad-form" onSubmit={props.onSubmit}>
                    <div className="form-group actividad-form__titulo">
                        <input 
                            type="text" 
                            id="title" 
                            name="title"
                            placeholder="Titulo" 
                            value={props.item.title} 
                            onChange={props.onChange} />
                        <label htmlFor="title">Titulo</label>
                    </div>

                    <div className="form-group actividad-form__description">
                        <input 
                            type="text" 
                            id="description" 
                            name="description"
                            placeholder="Descripcion" 
                            value={props.item.description} 
                            onChange={props.onChange} />
                        <label htmlFor="description">Descripcion</label>
                    </div>

                    <div className="form-group actividad-form__icon">
                        <input 
                            type="text" 
                            id="icon" 
                            name="icon"
                            placeholder="Icono" 
                            value={props.item.icon} 
                            onChange={props.onChange} />
                        <label htmlFor="icon">Icono</label>
                    </div>

                    <div className="form-group">
                        <textarea 
                            name="content" 
                            id="content" 
                            placeholder="Contenido" 
                            value={props.content} 
                            onChange={props.onChange}>
                        </textarea>
                        <label htmlFor="content">Contenido</label>
                    </div>

                    <div className="centered-btn-wrapper actividad-form__btn">
                        <button type="submit" className="btn">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { CaballoForm, CabeceraForm, ActividadForm } ;