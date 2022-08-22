import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import CardUsers from './components/CardUsers'
import Form from './components/Form'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [themeMode, setThemeMode] = useState('')
  const [icon, setIcon] = useState('bx-moon')
  //console.log(updateInfo)
  
  const getAllUsers = () => {
    const url = `https://users-crud1.herokuapp.com/users/` 
    axios.get(url)
    .then(res => setUsers(res.data) )
    .catch(err=>console.log(err.response.data))
  }
  //console.log(users)

  useEffect(()=>{
    getAllUsers()
  },[])

  const handleOpenForm = () => setIsOpen(true)
   
  const handleCloseForm =() => setIsOpen(false)
  
  const themeModeSwitch = () => {
    if(themeMode === ''){
      setThemeMode('dark')
      setIcon('bx-sun')
    }else{
      setThemeMode('')
      setIcon('bx-moon')
    }
  }
  
  return (
    <div className={`App ${themeMode}`}>
      <div className="header">
        <h1>Users</h1>
        <button onClick={handleOpenForm}> + Create</button>
        <button onClick={themeModeSwitch} className='btn-dark'><i className={`bx ${icon}`}></i></button>
      </div>
      <div className={isOpen ? 'form-container': 'form-none'}>
        <Form 
          getAllUsers={getAllUsers} 
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}/>
      </div>
      <div className="card__container">
      {
        users?.map(user =>(
          <CardUsers
            key={user.id}
            user={user}
            getAllUsers={getAllUsers}
            setUpdateInfo={setUpdateInfo}
            handleOpenForm={handleOpenForm}
          />
        ))
      }
     </div>
    </div>
  )
}

export default App
