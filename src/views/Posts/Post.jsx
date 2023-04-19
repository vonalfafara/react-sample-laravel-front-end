import http from "../../lib/http"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [post, setPost] = useState({})
  const [onEdit, setOnEdit] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"))

  async function getPost() {
    const res = await http.get(`/posts/${id}`)
    setPost(res.data)
  }

  async function updatePost(e) {
    e.preventDefault()

    const res = await http.put(`/posts/${id}`, {
      title: title ? title : post.title,
      body: body ? body : post.body
    },
    {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    }
    )

    setPost(res.data)
    setOnEdit(false)
  }

  async function deletePost() {
    await http.delete(`/posts/${id}`,
    {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    }
    )
    navigate("/")
  }

  useEffect(() => {
    getPost();
    return
  }, [])
  return (
    <div>
      <div className="flex gap-2 items-center mb-2">
        <Link to="/" className="text-green-400 hover:text-green-800 transition-colors">Go Back</Link>
        {
          loggedIn &&
          (
            <>
              <button className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors" onClick={() => setOnEdit(!onEdit)}>Edit Post</button>
              <button className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors" onClick={deletePost}>Delete Post</button>
            </>
          )
        }
      </div>
      {
        onEdit &&
        (
          <div className="flex justify-center">
          <form onSubmit={updatePost} className="my-16">
            <h1 className="text-xl">Update Post</h1>
            <input type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} className="block border-2 border-green-400 mb-2 px-2" />
            <input type="text" value={body} placeholder="body" onChange={(e) => setBody(e.target.value)} className="block border-2 border-green-400 mb-2 px-2" />
            <input type="submit" value="Update Post" className="p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-800 transition-colors"/>
          </form>
          </div>
        )
      }
      <h1 className="text-2xl">{post.title}</h1>
      <h3 className="text-md mb-8">{post.created_at}</h3>
      <p>
        {post.body}
      </p>
    </div>
  )
}

export default Post