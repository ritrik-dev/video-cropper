import Button from './Button'
import Select from './Select'
import Slider from './Slider'

const index = (theme) => {
  return Object.assign(
    Button(theme),
    Select(theme),
    Slider(theme),
  )
}

export default index