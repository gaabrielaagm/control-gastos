import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import MensajeValidacion from './Mensaje'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [gastoEditar])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 400)

        setNombre('')
        setCantidad('')
        setCategoria('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(nombre, cantidad, categoria)
        // validacion campos obligatorios
        if([nombre, cantidad, categoria].includes('')){
            console.log('entree');
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 2500)
            
            return
        } 

        guardarGasto({nombre, cantidad, categoria, fecha, id})
        ocultarModal()
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                className={`formulario ${animarModal ? 'animar': 'cerrar'}`}
                onSubmit={handleSubmit}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto': 'Nuevo Gasto'}</legend>

                {mensaje && 
                    <MensajeValidacion tipo="error">{mensaje}</MensajeValidacion>
                }

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={e => {setNombre(e.target.value)}}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la Cantidad del Gasto"
                        value={cantidad}
                        onChange={e => {setCantidad(Number(e.target.value))}}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoría</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => {setCategoria(e.target.value)}}>
                            <option value="">-- Seleccione --</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos Varios</option>
                            <option value="ocio">Ocio</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" :"Añadir Gasto"}
                />
                
            </form>            
        </div>
    )
}

export default Modal