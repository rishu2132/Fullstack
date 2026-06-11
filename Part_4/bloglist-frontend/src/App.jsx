import { useState, useEffect, } from 'react'
import { BrowserRouter as Router, Routes , Route , Link } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
//import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [messageStatus, setMessageStatus] = useState('greenError')
  // const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])


  // if(user === null ){
  //   const loggedUserJSON = window.localStorage.getItem('LoggedBlogUser')
  //   if(loggedUserJSON){
  //     console.log('logged in again')
  //     const user = JSON.parse(loggedUserJSON)
  //     blogService.setToken(user.token)
  //     setUser(user)
  //   }
  // }


  // const addNewBlog = async (blogObject) => {
  //   console.log(blogObject)

  //   const returnedData = await blogService.create(blogObject)
  //   setBlogs(prev => prev.concat({ ...returnedData, user:user }))
  //   setMessageStatus('greenError')
  //   setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
  //   setTimeout(() => {
  //     setErrorMessage(null)
  //   },5000)
  // }


  // const updateLikes = async (blogObject) => {

  //   await blogService.updateLike(blogObject)
  //   const updatedblogs = await blogService.getAll()
  //   const sortedBlogs = updatedblogs.sort((a,b) => b.likes - a.likes)
  //   setBlogs(sortedBlogs)
  // }

  // const removeBlog = async (id) => {
  //   await blogService.remove(id)
  //   const updatedBlog = await blogService.getAll()
  //   setBlogs(updatedBlog)
  // }

  // const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  // const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const padding = {
    padding:5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/login">login</Link>
      </div>
      <Routes>
        <Route path='/' element={<BlogList/>}/>
        <Route path='/login' element={<LoginForm/>}/>
      </Routes>
    </Router>
  )



}

export default App