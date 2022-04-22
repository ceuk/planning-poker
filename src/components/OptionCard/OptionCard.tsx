import { FC, HTMLProps } from 'react'
import classNames from 'classnames'
import styles from './OptionCard.module.scss'

interface OptionCardProps extends HTMLProps<HTMLInputElement> {
  label: string
  hint: string
  name: string
  emphasis?: boolean
}

const OptionCard: FC<OptionCardProps> = ({ label, name, value, hint, emphasis, ...rest }) => (
  <>
    <input type="radio" id={name + value} name={name} value={value} className={styles.radio} {...rest} />
    <label className={styles.card} htmlFor={name + value} >
      <h3 className={classNames(styles.heading, { [styles.headingEmphasis]: emphasis })}>{label}</h3>
      <p className={styles.hint}>{hint}</p>
    </label>
  </>
)

export default OptionCard
