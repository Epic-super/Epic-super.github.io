import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import NBack from './NBack'

test('renders NBack and starts sequence', () => {
  render(<NBack level={1} />)
  // 组件真实标题（NBack.tsx h2）
  expect(screen.getByText(/Memory Challenge/i)).toBeInTheDocument()
  expect(screen.getByText(/Score:/i)).toBeInTheDocument()
  // Start 按钮存在且可点击（启动后组件进入 running 态，不追加计时副作用断言）
  const start = screen.getByText(/Start/i)
  expect(start).toBeInTheDocument()
  fireEvent.click(start)
})
