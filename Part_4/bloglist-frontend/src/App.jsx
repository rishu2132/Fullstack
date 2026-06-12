import { useState, useEffect, } from 'react'
import { BrowserRouter as Router, Routes , Route , Link , useNavigate, useMatch } from 'react-router-dom'
import { Container,Toolbar,AppBar,Button, Typography } from '@mui/material'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [messageStatus, setMessageStatus] = useState('greenError')
  // const [blogFormVisible, setBlogFormVisible] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])


  const handleLogin = async (username, password) => {
    console.log('logging in ', username)

    try {
      const user = await loginService.login({ username,password })
      window.localStorage.setItem('LoggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      //navigate('/')
    } catch {
      //setMessageStatus('redError')
      //setErrorMessage('wrong username or password')
      //setTimeout(() => {
      //setErrorMessage(null)
      //},3000)
      //console.log('invalid or wrong user')
    }
  }

  const handleLogout = () => {
    if(user !== null){
      window.localStorage.removeItem('LoggedBlogUser')
      setUser(null)
      console.log('logged out')
      blogService.setToken(null)
      navigate('/')
    }
  }

  const match = useMatch('/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null


  const addNewBlog = async (blogObject) => {
    console.log(blogObject)

    const returnedData = await blogService.create(blogObject)
    setBlogs(prev => prev.concat({ ...returnedData, user:user }))
    // setMessageStatus('greenError')
    // setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    // setTimeout(() => {
    //   setErrorMessage(null)
    // },5000)
  }


  const updateLikes = async (blogObject) => {

    await blogService.updateLike(blogObject)
    const updatedblogs = await blogService.getAll()
    const sortedBlogs = updatedblogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlog = await blogService.getAll()
    setBlogs(updatedBlog)
  }

  // const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  // const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <div>
      <Container>
        <AppBar position='static' style={{ display:'flex' }}>
          <Toolbar>
            <Typography variant='h6' style={{ flexGrow:1 }}>
              Blog App
            </Typography>
            <Button color='inherit' component={Link} to='/' sx={style}>Blogs</Button>
            {user
              ? <Button color='inherit' component={Link} to='/create' sx={style}>new Blog</Button>
              : null
            }
            {user
              ? <Button color='inherit' sx={style} onClick={handleLogout}>logout</Button>
              :<Button color='inherit' component={Link} to='/login' sx={style}>login</Button>
            }
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path='/create' element={<BlogForm createBlog={addNewBlog}/>}/>
          <Route path='/:id' element={<Blog blog={blog} user={user} updateLikes={updateLikes} removeBlog={removeBlog}/>}/>
          <Route path='/' element={<BlogList blogs={blogs} />}/>
          <Route path='/login' element={<LoginForm handleLogin={handleLogin}/>}/>
        </Routes>
      </Container>
    </div>
  )



}

export default App