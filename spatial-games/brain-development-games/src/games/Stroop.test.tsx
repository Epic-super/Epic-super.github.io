import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Stroop from './Stroop'

test('renders Stroop and can press buttons', () => {
  render(<Stroop level={1} />)
  // 组件真实标题（Stroop.tsx h2）
  expect(screen.getByText(/Color Challenge/i)).toBeInTheDocument()
  // 颜色按钮有 4 个，取第一个
  const btns = screen.getAllByText(/Red|Blue|Green|Yellow/i)
  fireEvent.click(btns[0])
  expect(screen.getByText(/Score:/i)).toBeInTheDocument()
})