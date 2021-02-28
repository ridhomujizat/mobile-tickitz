import http from '../../helper/http'

export const updateProfile = (token, data) => {
  return async dispatch => {
    const {
      name,
      phone,
      email,
      image,
      password
    } = data
    const form = new FormData()

    const fullName = name.split(' ')
    if (name) {
      if (fullName.length > 1) {
        form.append('firstName', fullName[0])
        form.append('lastName', fullName.splice(1, fullName.length).join(' '))
      } else {
        form.append('firstName', fullName[0])
        form.append('lastName', ' ')
      }
    }
    if (phone) {
      form.append('phone', String(phone))
    }
    if (email) {
      form.append('email', email)
    }
    if (password) {
      form.append('password', password)
    }
    if (image) {
      form.append('image', image)
    }
    try {
      const response = await http(token).post('profile', form)
      console.log(response.data)
      dispatch({
        name: response.data.result.firstName,
        lastName: response.data.result.lastName,
        image: response.data.result.image,
        phone: response.data.result.phone
      })
      dispatch({
        type: 'SUCCESS_MESSAG',
        payload: response.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: message
      })
    }
  }
}
