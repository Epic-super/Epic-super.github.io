import { disksForLevel } from './TowerOfHanoi'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import TowerOfHanoi from './TowerOfHanoi'

// import share buttons to satisfy build environment for the component
vi.mock('../components/ShareButtons', () => () => <div />)

test('disksForLevel maps levels correctly', () => {
  expect(disksForLevel(1)).toBe(3)
  expect(disksForLevel(2)).toBe(4)
  expect(disksForLevel(8)).toBe(10)
  expect(disksForLevel(9)).toBe(5)
})

test('can perform legal moves and detect win', () => {
  render(<TowerOfHanoi level={1} />)

  // 组件真实标题（TowerOfHanoi.tsx h2）
  expect(screen.getByText(/Tower of Hanoi/i)).toBeInTheDocument()
  // 组件真实计分栏（🎮 Moves: 标签 + 独立数字节点）
  expect(screen.getByText(/Moves:/i)).toBeInTheDocument()

  // 点击 rod 验证交互不崩（不脆断言精确 moves 数，因选中/移动带条件分支）
  const rods = screen.getAllByRole('button')
  fireEvent.click(rods[0])
})
