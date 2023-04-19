import http from "../../lib/http"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  async function register(e) {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation || !(password === passwordConfirmation)) {
      alert("Incorrect data");
      return
    }

    const res = await http.post("/register", {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    })

    localStorage.setItem("token", res.data.token);

    navigate("/")
  }

  return (
    <div className="flex justify-center mt-16">
      <form onSubmit={register}>
        <h1 className="text-2xl mb-2">Register</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" className="block border-2 border-green-400 mb-2 px-2" />
        <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="email" className="block border-2 border-green-400 mb-2 px-2"  />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="block border-2 border-green-400 mb-2 px-2" />
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="confirm password" className="block border-2 border-green-400 mb-2 px-2" />
        <input type="submit" value="Register" className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors"/>
      </form>
    </div>
  )
}

export default Register