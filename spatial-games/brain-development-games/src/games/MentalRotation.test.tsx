import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MentalRotation from './MentalRotation'

test('renders mental rotation and answers', () => {
  render(<MentalRotation level={1} />)
  // 组件真实标题（MentalRotation.tsx h2）
  expect(screen.getByText(/Shape Matcher/i)).toBeInTheDocument()
  const sameBtns = screen.getAllByText(/Same/i)
  fireEvent.click(sameBtns[0])
  expect(screen.getByText(/Score:/i)).toBeInTheDocument()
})
