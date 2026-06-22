import { render , screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'


const blog = {
  title: 'a new day',
  author: 'rowling',
  url: 'https dfdak as there is of',
  likes:56,
  user: {
    username: 'mluukkai',
    name: 'root',
    password: 'salainen'
  }
}

const user = {
  username: 'mluukkai',
  name: 'root',
  password: 'salainen'
}

test('blog info and likes are shown to unauthenticated users' , () => {

  render(<MemoryRouter><Blog blog={blog}/></MemoryRouter>)
  const title = screen.queryByText('rowling: a new day')
  expect(title).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeVisible()
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeVisible()
  expect(screen.queryByText('like')).toBeNull()
})

test('Authenticated user are shown like button', () => {
  render(<MemoryRouter><Blog  blog={blog} user={user}/></MemoryRouter>)
  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByRole('button',{ name:'like' })).toBeDefined()

})

test('blog creater is shown remove button', () => {
  render(<MemoryRouter><Blog blog={blog} user={user}/></MemoryRouter>)
  expect(screen.getByRole('button',{ name:'remove' })).toBeVisible()
})
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