import { render , screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author only' , () => {
  const blog = {
    title: 'a new day',
    author: 'rowling',
    url: 'https dfdak as there is of',
    likes:56
  }

  render(<Blog blog={blog}/>)
  const title = screen.getByText('a new day rowling')
  expect(title).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
})