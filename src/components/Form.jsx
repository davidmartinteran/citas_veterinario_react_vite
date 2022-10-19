import { useState, useEffect } from 'react';
import Error from './Error';

function Form({ pacientes, setPacientes, paciente, setPaciente }) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    setNombre(paciente.nombre);
    setPropietario(paciente.propietario);
    setEmail(paciente.email);
    setFecha(paciente.fecha);
    setSintomas(paciente.sintomas);
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    const objetoPaciente = {
      nombre, propietario, email, fecha, sintomas
    }

    if(paciente.id){
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else{
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold text-lg">
          Administralos
        </span>
      </p>

      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        onSubmit={handleSubmit}
      >
        {error &&
          <Error>Todos los campos son obligatorios</Error>
        }
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(event) => { setNombre(event.target.value) }}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(event) => { setPropietario(event.target.value) }}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Correo propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Correo contacto del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="block text-gray-700 uppercase font-bold">
            Fecha
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(event) => { setFecha(event.target.value) }}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Síntomas mascota
          </label>
          <textarea
            id="sintomas"
            type="text"
            placeholder="Síntomas de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(event) => { setSintomas(event.target.value) }}
          />

        </div>

        <input type="submit"
          className="bg-indigo-600 w-full hover:bg-indigo-800 text-white uppercase font-bold p-3 cursor-pointer transition-colors"
          value={paciente.id ? "Editar paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
}

export default Form;
