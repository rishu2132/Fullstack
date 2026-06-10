import { render , screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'a new day',
  author: 'rowling',
  url: 'https dfdak as there is of',
  likes:56
}

test('renders title and author only' , () => {

  render(<Blog blog={blog}/>)
  const title = screen.getByText('a new day rowling')
  expect(title).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
})

test('blog url and likes are shown when button is clicked', async () => {
  const user = userEvent.setup()

  render(<Blog  blog={blog}/>)
  const button = screen.getByText('view')
  await user.click(button)
  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.queryByText(`Likes ${blog.likes}`)).toBeDefined()

})