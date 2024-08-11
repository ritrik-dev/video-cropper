import Button from './Button'
import IconButton from './IconButton'
import Select from './Select'
import Slider from './Slider'

const index = (theme) => {
  return Object.assign(
    Button(theme),
    Select(theme),
    Slider(theme),
    IconButton(theme)
  )
}

export default index