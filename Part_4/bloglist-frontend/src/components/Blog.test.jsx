import { render , screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

const blog = {
  title: 'a new day',
  author: 'rowling',
  url: 'https dfdak as there is of',
  likes:56
}

test('renders title and author only' , () => {

  render(<MemoryRouter><Blog blog={blog}/></MemoryRouter>)
  const title = screen.queryByText('rowling: a new day')
  expect(title).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeVisible()
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeVisible()
  expect(screen.queryByText('like')).toBeNull()
})

// test('blog url and likes are shown when button is clicked', async () => {
//   const user = userEvent.setup()

//   render(<Blog  blog={blog}/>)
//   const button = screen.getByText('view')
//   await user.click(button)
//   expect(screen.getByText(blog.url)).toBeDefined()
//   expect(screen.queryByText(`Likes ${blog.likes}`)).toBeDefined()

// })

// test('like button is cliked twice', async () => {
//   const mockHandler = vi.fn()

//   render(<Blog blog={blog} updateLike={mockHandler}/>)
//   const user = userEvent.setup()
//   const viewButton = screen.getByText('view')
//   await user.click(viewButton)
//   const likeButton = screen.getByText('like')
//   await user.dblClick(likeButton)
//   expect(mockHandler.mock.calls).toHaveLength(2)
// })