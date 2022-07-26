import { useState } from "react"
import MensajeValidacion from "./Mensaje"

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {
    const [mensaje, setMensaje] = useState("")

    const handlePresupuesto = (e) => {
        e.preventDefault()
        // validamos el presupuesto
        if (!presupuesto || presupuesto < 0){
            setMensaje('Ingresa un presupuesto válido')

            setTimeout(() => {
                setMensaje('')
            }, 2500)
            return
        } 
        // reseteamos la alerta
        setMensaje('')
        setIsValidPresupuesto(true)
    }

  return (
      <div className="contenedor-presupuesto contenedor sombra">
          <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir Presupuesto</label>
                <input
                    className="nuevo-presupuesto"
                    type="number"
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input type="submit" value="Añadir"/>

            {mensaje && <MensajeValidacion tipo="error">{mensaje}</MensajeValidacion>}
          </form>
      </div>
  )
}

export default NuevoPresupuesto