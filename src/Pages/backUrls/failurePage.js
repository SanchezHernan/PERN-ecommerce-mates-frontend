import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useUser from '../../hook/useUser'
import failure from '../../images/failure.jpg'

import './failurePage.css'




const FailurePage = () => {

    const { isLogged } = useUser()
    const history = useHistory()

    useEffect(() => {
        if (!isLogged) {
          history.push('/');
        }
    }, [isLogged, history])

    return(
        <div className="failureContainer">
            <h1>OH OH!</h1>
            <h2>Algo salio mal</h2>
            <img className="failureImg" src={failure} alt='...'></img>
            <div className="buttonContainer">
                <Link to='/home' className='btn btn-primary'>Seguir Comprando</Link>
            </div>
        </div>
    )
}

export default FailurePage