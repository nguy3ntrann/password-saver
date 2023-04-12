import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs } from 'firebase/firestore'

export default function User() {

  const [newSite, setNewSite] = useState("")
  const [newSitePassword, setNewSitePassWord] = useState("")
  const [sites, setSites] = useState([]);
  const [userID, setUserID] = useState(null)
  // var userID  

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setUserID(user.uid);
        const sitesCollectionRef = collection(db, user.uid);
        getDocs(sitesCollectionRef).then(data => {
          setSites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      }
    });
  }, []);
  
  //const userID = auth.currentUser.uid;

  const createSite = async () => {
    if (userID == null) return;
    const sitesCollectionRef = collection(db,userID);
    await addDoc(sitesCollectionRef, {site:newSite, pass: newSitePassword})
  }

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try{
      signOut(auth)
    } catch(e){
      console.log(e);
    }
  }

  onAuthStateChanged(auth, currentUser => {
    if(!currentUser){
      navigate("/signin")
    }
  })

  return (
    <div className="container">
        <h1 className = "text-center font-bold text-3xl mt-[50px] mb-5">Welcome to password saver</h1>
        <h1 className = "text-center font-bold text-3xl mt-[50px] ">Hello {userID != null ? auth.currentUser.email : "guest"}</h1>
        <div className = "max-w-[700px] mx-auto my-16 p-4">
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Site</label>
                <input className='border p-3' type='text' onChange = {(e) => {setNewSite(e.target.value)}}/>
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Password</label>
                <input className='border p-3' type='text' onChange = {(e) => {setNewSitePassWord(e.target.value)}}/>
            </div>
            <button onClick = {createSite} className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                Submit
            </button>
        </div>

        <div className = "text-center text-2xl mt[50px] mb-10">
          {sites.map((site) => {
            return (
              <div>
                {" "}
                <h1>Site: {site.site} Pass: {site.pass}</h1>
              </div>
            )
          })}
        </div>
        
        <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
          <button onClick={handleSignOut} className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white max-w-[700px]'>
                Sign Out
          </button>
        </div>
    </div>
  )
}
