import http from "../../lib/http"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Incorrect data");
      return
    }

    const res = await http.post("/login", {
      email: email,
      password: password,
    })

    localStorage.setItem("token", res.data.token);

    navigate("/")
  }

  return (
    <div className="flex justify-center mt-16">
      <form onSubmit={login}>
        <h1 className="text-2xl mb-2">Login</h1>
        <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="email" className="block border-2 border-green-400 mb-2 px-2"  />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="block border-2 border-green-400 mb-2 px-2" />
        <input type="submit" value="Login" className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors"/>
      </form>
    </div>
  )
}

export default Login