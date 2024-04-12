import { Link } from 'react-router-dom'
import { useDisLogout } from '../hooks/useDisLogout'
import { useDisDAuthContext } from '../hooks/useDisDAuthContext'

const NavbarStart = () => {
  const { disLogout } = useDisLogout()
  const { distributor } = useDisDAuthContext()

  const handleClick = () => {
      disLogout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Electrigen</h1>
        </Link>
        <nav>
          {distributor && (<div>
            <span>{distributor.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!distributor && (<div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default NavbarStart