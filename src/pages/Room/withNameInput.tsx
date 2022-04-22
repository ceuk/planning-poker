import NameInput from '@/components/NameInput/NameInput'
import { useAppSelector } from '@/state/hooks'
import { FC } from 'react'

const withNameInput = (Component: FC) => function WrappedComponent() {
  const userName = useAppSelector(state => state.user.name)

  if (!userName) {
    return <NameInput />
  }

  return <Component />
}

export default withNameInput
