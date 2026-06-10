import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'always learning',
  author: 'jobs',
  url: 'https://amazon',
}

test('recieved right details when blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)

  const title = screen.getByLabelText('title:')
  const author = screen.getByLabelText('author:')
  const url = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(title,blog.title)
  await user.type(author,blog.author)
  await user.type(url,blog.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(blog)
})
