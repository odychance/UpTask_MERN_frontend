import {useState} from 'react'
import {Link} from 'react-router-dom'

import Alerta from '../components/Alerta'

import clienteAxios from '../config/clienteAxios'

const Registrar = () => {

  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: 'Los passwords son diferentes',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'el password es muy corto, agrega minimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    //Creando usuario en la api
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, password, email})

      setAlerta({
        msg: data.msg,
        error: false
      })
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y administra tus {''}
          <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
      <div className="my-5">
          <label
              className="uppercase block text-gray-600 text-xl font-bold"
              htmlFor="nombre"  
          >Nombre</label>
          <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
              className="uppercase block text-gray-600 text-xl font-bold"
              htmlFor="email"  
          >Email</label>
          <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
              className="uppercase block text-gray-600 text-xl font-bold"
              htmlFor="password"  
          >Password</label>
          <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
              className="uppercase block text-gray-600 text-xl font-bold"
              htmlFor="password2"  
          >Confirmar Password</label>
          <input
              id="password2"
              type="password"
              placeholder="Confirmar Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>


        <input
          type="submit"
          value="Crear Cuenta"
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
        >Ya tienes una cuenta? Inicia sesión aquí.</Link>
      </nav>

    </>
)
}

export default Registrar