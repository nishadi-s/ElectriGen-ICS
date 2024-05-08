import { Link, useNavigate } from 'react-router-dom'
import { useDisLogout } from '../hooks/useDisLogout'
import { useDisDAuthContext } from '../hooks/useDisDAuthContext'

const NavbarStart = () => {
  const { disLogout } = useDisLogout()
  const { distributor } = useDisDAuthContext()
  const navigate = useNavigate();

  const handleClick = () => {
      disLogout()
      navigate('/login');
  }

  return (
    <header className='start-nav-header'>
      <div className="start-nav-container">
          <h2 className='start-nav-h2'>Electrigen</h2>
        <nav className='start-nav-dis'>
          {distributor && (<div>
            <span>{distributor.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!distributor && (<div>
            <Link className='signup-link' to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default NavbarStart