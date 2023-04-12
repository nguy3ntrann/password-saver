import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default function Signin() {

  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try{
        signInWithEmailAndPassword(auth,email,password);
    } catch(e){
        console.log(e);
    }
  }

  onAuthStateChanged(auth,currentUser => {
    if(currentUser){
        navigate("/");
    }
  })

  return (
    <div className = "max-w-[700px] mx-auto my-16 p-4">
        <h1 className = "text-2xl font-bold py-2 text-center">Sign in</h1>
        <p className = "py-2 text-center">Need an account? <Link to="/signup" className = "underline">Sign up</Link></p>

        <form>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' value = {email}/>
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' value = {password}/>
            </div>
            <button onClick = {handleSignIn} className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                Sign In
            </button>
        </form>

    </div>
  )
}
