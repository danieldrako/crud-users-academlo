import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const URL = 'https://users-crud1.herokuapp.com/users/'
  const getAllUsers = () => {
    axios.get(URL)
      .then(res=>setUsers(res.data))
      .catch(err=>console.log(err.response.data))
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  
  const handleOpenForm = () => setIsFormOpen(true)

  const handleCloseForm = () => setIsFormOpen(false)
  console.log(users)
  return (
    <div className="App">
      <h1>USERS CRUD</h1>
      <button onClick={handleOpenForm} className='btn__add'>Add New User</button>

      <div className={isFormOpen ? 'form-container':'form-none'}>
        <UsersForm
          getAllUsers={getAllUsers}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm = {handleCloseForm}
        />
      </div>

      <div className='list-container'>
        {
          users?.map(user =>(
            <UsersList
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
