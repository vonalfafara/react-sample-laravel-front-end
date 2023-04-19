import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import http from "../../lib/http"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  async function getPosts() {
    const res = await http.get("/posts")
    setPosts(res.data)
  }

  async function createPost(e) {
    e.preventDefault()
    if (!title || !body) {
      alert("Please fill the required fields")
      return
    }
    await http.post("/posts", {
      title,
      body
    },
    {
      headers: {
        'Authorization' : `Bearer ${loggedIn}`
      }
    }
    )

    getPosts()
  }

  async function logout() {
    await http.post("/logout", null, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })

    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  useEffect(() => {
    getPosts();
    return
  }, [])

  return (
    <div>
      <div className="flex gap-2 items-center mb-2">
        <Link to="/register" className="text-green-400 hover:text-green-800 transition-colors">Register</Link>
        {
          loggedIn
          ?
          (
            <button className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors" onClick={logout}>Logout</button>
          )
          :
          (
            <Link className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors" to="/login">Login</Link>
          )
        }
      </div>
      {loggedIn && (
        <div className="flex justify-center">
          <form onSubmit={createPost} className="my-16">
            <h1 className="text-xl">Create Post</h1>
            <input type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} className="block border-2 border-green-400 mb-2 px-2" />
            <input type="text" value={body} placeholder="body" onChange={(e) => setBody(e.target.value)} className="block border-2 border-green-400 mb-2 px-2" />
            <input type="submit" value="Create Post" className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors"/>
          </form>
        </div>
      )}
      {posts.map((post, index) => {
        return (
          <div key={index} className="border-2 border-green-400 rounded-md mb-2 p-2">
            <Link to={`/${post.id}`}>{post.title}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Posts