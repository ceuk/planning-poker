import { FC, ReactNode } from 'react'
import CreateRoomButton from '@/components/CreateRoomButton/CreateRoomButton'

interface HideableFormSectionProps {
  show: boolean
  classes: string
  render: ReactNode,
  button?: boolean
}

const HideableFormSection: FC<HideableFormSectionProps> = ({ show, classes, render, button = true }) => show
  ? (
    <section className={classes}>
      {render}
      {button && <CreateRoomButton />}
    </section>
  )
  : null

export default HideableFormSection
