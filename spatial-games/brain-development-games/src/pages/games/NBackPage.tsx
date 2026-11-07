import React from 'react'
import { useSearchParams } from 'react-router-dom'
import LevelSelector from '../../components/LevelSelector'
import HowToPlay from '../../components/HowToPlay'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import NBack from '../../games/NBack'

export default function NBackPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['n-back']

  return (
    <div className="space-y-4">
      <LevelSelector />
      <HowToPlay
        title={instructions.title}
        instructions={instructions.instructions}
        tips={instructions.tips}
      />
      <NBack level={level} />
    </div>
  )
}
