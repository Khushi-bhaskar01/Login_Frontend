import React ,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser') || '');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])

    const handleLogout = (e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged Out');
        setTimeout(() =>{
            navigate('/login');
        },1000)
    }
  
    const fetchProducts = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/product`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        }catch (err){
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    },[])
  return (
    <div>
        <h1>WELCOME!!!😊{loggedInUser}</h1>
        <button className='btn' onClick={handleLogout}>Logout</button>
        <ToastContainer />
    </div>
  )
}

export default Home