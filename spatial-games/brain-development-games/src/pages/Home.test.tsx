import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

test('renders home and game list', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  // 组件真实页头（Home.tsx h1，非臆想的 "The Mind Arcade"）
  expect(screen.getByText(/Brain Development Games/i)).toBeInTheDocument()
  // 注册表里真实存在的游戏（卡片名可能出现多处）
  expect(screen.getAllByText(/Water Jugs/i).length).toBeGreaterThan(0)
  // 每个游戏卡片上的 Play 按钮
  expect(screen.getAllByRole('button', { name: /Play/i }).length).toBeGreaterThan(0)
  expect(screen.getByText(/Reset Progress/i)).toBeInTheDocument()
})