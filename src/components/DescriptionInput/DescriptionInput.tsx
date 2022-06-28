/* eslint-disable xss/no-mixed-html */
import { FocusEventHandler } from 'react'
import { useAppDispatch } from '@/state/hooks'
import { updateDescription } from '@/state/slices/round'
import styles from './DescriptionInput.module.scss'

const URL_REGEX = /([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))|\[([_\-.,A-Za-z0-9\s]*)\]\((https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))\)/g
const escapeHtml = (unsafe: string) => {
  return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

const DescriptionInput = () => {
  const dispatch = useAppDispatch()
  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const text = escapeHtml(e.target.innerText)
    const html = text
      .replace(URL_REGEX, (_, $1, __, $3, $4) => {
        if ($3 && $4) {
          return `<a target="blank" rel="noopener noreferrer" href="${$4}">${$3}</a>`
        } else {
          return `<a target="blank" rel="noopener noreferrer" href="https://${$1}">${$1}</a>`
        }
      })
    dispatch(updateDescription(html))
  }
  return (
    <>
      <div
        contentEditable
        className={styles.input}
        aria-label="Enter a subject for the current vote"
        placeholder="What is being voted on?"
        onBlur={handleBlur}
      />
      <p className={styles.tip}><sup>Tip:</sup> You can write links like this:<pre>[link text](https://link-url)</pre></p>
    </>
  )
}

export default DescriptionInput
