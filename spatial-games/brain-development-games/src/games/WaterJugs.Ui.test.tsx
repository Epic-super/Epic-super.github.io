import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import WaterJugs from './WaterJugs'

test('fill a jug and see the level update', async () => {
  render(<WaterJugs level={1} />)
  // 组件真实标题
  expect(screen.getByText(/Water Jugs Challenge/i)).toBeInTheDocument()

  // Jug 1 容量 3L、Jug 2 容量 5L；初始都为 0L
  // fill 是异步（setTimeout 600ms），用 waitFor 断言水位更新
  const fillButtons = screen.getAllByText(/Fill/i)
  // fillButtons[0] = Jug1, [1] = Jug2；填充 Jug2（容量 5L）
  fireEvent.click(fillButtons[1])

  // 填充后 Jug2 显示 5L / of 5L（current 与 capacity 是两个独立文本节点）
  await waitFor(() => {
    expect(screen.getAllByText('5L').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('of 5L').length).toBeGreaterThanOrEqual(1)
  })
})
