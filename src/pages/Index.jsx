import { logInWithEmailAndPassword, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Index() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
    if (error) {
      return <div>Reload Page</div>
    }
  }, [user, loading]);


  return (
    <div className='index-page'>
      <form onSubmit={handleSubmit}>

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>

      <button type="submit">Submit</button>
      </form>
      <div className='button-pair'>
        <button onClick={logInWithEmailAndPassword} className='button'>
          <span>Login</span>
        </button>
      </div>
    </div >
  )
}

export default Index
