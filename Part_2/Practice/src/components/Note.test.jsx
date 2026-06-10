import { render ,screen } from '@testing-library/react'
import Note from './Note'
import { expect } from 'vitest'

test('render content' , () => {
  const note  = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note}/>)
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})