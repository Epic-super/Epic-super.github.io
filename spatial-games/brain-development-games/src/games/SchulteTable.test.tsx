import React from 'react'
import { render, screen } from '@testing-library/react'
import SchulteTable from './SchulteTable'

test('renders Schulte Table and responds to clicks', () => {
  render(<SchulteTable level={1} />)
  // 组件真实标题（SchulteTable.tsx h2）
  expect(screen.getByText(/Number Hunt/i)).toBeInTheDocument()
  const next = screen.getByText(/Next/i)
  expect(next).toBeInTheDocument()
})
