const { useState } = require("react")

const DisSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(email,password)
    }

    return (
        <form className = "signup" onSubmit={handleSubmit}>
            <h3>Distributor Sign up</h3>

            <lable>Email:</lable>
            <input
             type="email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             />

            <lable>Password:</lable>
            <input
             type="password"
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             />

             <button>Sign Up</button>
        </form>
    )
}


export default DisSignup