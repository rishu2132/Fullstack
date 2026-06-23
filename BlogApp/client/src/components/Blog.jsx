import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
  Typography,
} from '@mui/material'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const increaseLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(updatedBlog)
  }

  const navigate = useNavigate()
  const handleRemove = (blog) => {
    if (blog.user?.username === user?.username) {
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
        removeBlog(blog.id)
        navigate('/')
      }
    } else {
      console.log('not the user who created')
    }
  }

  if (!blog) {
    return <h2>404 - Page Not Found</h2>
  }

  return (
    <div className="blog">
      <Box>
        <Card sx={{ minWidth: 275, marginTop: 5 }} variant="outlined">
          <CardContent>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography>{`by ${blog.author}`}</Typography>
            <a href={blog.url}>{blog.url}</a>
            <Typography>{`Added by ${blog.user?.username}`}</Typography>
            <Typography>
              <span>{`${blog.likes} likes`}</span>
              {user ? (
                <Button
                  onClick={() => {
                    increaseLike(blog)
                  }}
                  variant="outlined"
                  style={{ marginLeft: 10, borderRadius: 5 }}
                >
                  like
                </Button>
              ) : null}
              {blog.user?.username === user?.username ? (
                <Button
                  color="error"
                  onClick={() => {
                    handleRemove(blog)
                  }}
                  variant="outlined"
                  style={{ marginLeft: 10, borderRadius: 5 }}
                >
                  remove
                </Button>
              ) : null}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default Blog
