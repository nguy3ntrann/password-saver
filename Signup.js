import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

export default function Signup() {
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSignUp = async () => {
    try{
        await createUserWithEmailAndPassword(auth,email,password)
    } catch(error){
        console.log(error)
    }
  };

  onAuthStateChanged(auth, (user) => {
    if(user){
        console.log(user.email)
        navigate("/")
    }
  })

  return (
    <div className = "max-w-[700px] mx-auto my-16 p-4">
        <h1 className = "text-2xl font-bold py-2 text-center">Sign up</h1>
        <p className = "py-2 text-center">Already have an account? <Link to="/signin" className = "underline">Sign in</Link></p>

        <form>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' value={email}/>
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' value = {password}/>
            </div>
            <button onClick={handleSignUp} className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                Sign Up
            </button>
        </form>

    </div>
  )
}
