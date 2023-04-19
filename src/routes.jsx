import Posts from "./views/Posts"
import Post from "./views/Posts/Post"
import Register from "./views/Auth/Register"
import Login from "./views/Auth/Login"

const routes = [
  {
    path: "/",
    element: <Posts />
  },
  {
    path: "/:id",
    element: <Post />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
]

export default routes