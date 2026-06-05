import { useState } from 'react'
import FormEventHandler from 'react'
import Logotipo from './assets/logotipo.png'

function App() {
  //Elementos DOM
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmiting, setSubmiting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    setError(null);
    try {
    const response = await fetch('localhost:6050/auth/login', {
      method: 'POST',
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response;

    if (response.ok) {
      
    }

    localStorage.setItem('acessToken', data.acesstoken);
    localStorage.setItem('refreshToken', data.refreshToken);
    } catch(err) {
      setError(err);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div>
      <div className='w-full h-20 flex justify-around align-middle p-2 bg-linear-135 from-black to-purple-400'>
        <div className='text-center border-white w-50% flex justify-around text-white font-bold text-lg hover:scale-110 transition duration-200'>
          <img src={Logotipo} alt="Logotipo principal da pagina" />
        </div>
        <div className='w-30 h-15 text-center border-white flex justify-around items-center shadow-md text-white font-bold text-lg hover:scale-110 transition'>
          <a href="home.html">Home</a>
        </div>
        <div className='w-30 radius-20 text-center flex justify-around items-center text-white font-bold text-lg hover:scale-110 transition'>
          <a href="home.html">Registre-se</a>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default App
