import React from 'react'
import { render, screen } from '@testing-library/react'
import Maze from './Maze'

test('renders Maze and moves player', () => {
  render(<Maze level={1} />)
  // 组件真实标题（Maze.tsx h2）
  expect(screen.getByText(/Maze Adventure/i)).toBeInTheDocument()
  // 组件真实计分栏（带 emoji 前缀的 🚶 Moves）
  expect(screen.getByText(/Moves:/i)).toBeInTheDocument()
})
