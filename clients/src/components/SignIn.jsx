import React, {useState} from 'react'
import axios from 'axios'
import Loading from './Loading'

const Form = () => {
    const [formData, setFormData] = useState([
        {
            name:'',
            password:''
        }
    ]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    let handleChange = (e) =>{
        const { name, value } = e.target;
        setIsLoading(false);
        setError("");
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    let handleSubmit = async (e) =>{
        e.preventDefault();
        if(formData.name == null || formData.password == null){
            setError("Please fill in all credentials!")
        }else{
            try{
                setIsLoading(true);
                const response = await axios.post('http://localhost:5000/login', formData)
                if(response.status === 200){
                    window.location.href = response.data.redirectTo;
                }
            }catch(err){
                setIsLoading(false);
                console.log(err);
                if(err.message === "Network Error"){
                    setError("Network Error");
                }else{
                    setError("Server error")
                }
            }finally{
                setIsLoading(false);
            }
        }


    }

  return (
    <div className='flex flex-col align-center justify-center w-screen h-screen bg-gradient-to-t from-green-200 to-green-300'>

        <form className="flex flex-col justify-center items-center md:w-1/3 h-[300px] m-auto" onSubmit={handleSubmit}>
            <h1 className='text-gray-800 md:text-2xl my-12'>Binary Labs Saturday Session | <span className='text-green-800 font-bold'>Login</span></h1>
            <input type="text" onChange={handleChange} name="name" id="name" placeholder='Enter your name' className='mb-2 md:w-4/5 rounded px-8 py-2 border-2 outline-none focus:border-green-400' autoFocus />
            <input type="password" onChange={handleChange} name="password" id="password" placeholder='Enter your password' className='mb-2 md:w-4/5 rounded px-8 py-2 border-2 outline-none focus:border-green-400' />
            <button type='submit' disabled={isLoading ? true : false} className='mt-8 bg-green-600 w-full md:w-4/5 py-2 rounded text-gray-200 font-bold transition ease-in-out duration-700 hover:opacity-80'>{isLoading? <Loading /> :'Login'}</button>
            <span className='text-red-600 mt-8'>{error}</span>
        </form>
    </div>
  )
}

export default Form