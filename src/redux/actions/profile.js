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
    if (name) {
      const fullName = name.split(' ')
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
      const response = await http(token).patch('profile', form)
      console.log(response.data)
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {
          name: response.data.result.firstName,
          lastName: response.data.result.lastName,
          image: response.data.result.image,
          phone: response.data.result.phone
        }
      })
      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: response.data.message
      })
    } catch (err) {
      const { message } = err.response.data
      console.log(err)
      dispatch({
        type: 'SET_LOGIN_MESSAGE',
        payload: message
      })
    }
  }
}
