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
      const profile = response.data.result
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {
          name: profile.firstName === null ? 'Tickitzer' : profile.firstName,
          lastName: profile.lastName === null ? '' : profile.lastName,
          image: profile.image === null ? 'uploads/profile/profile-default.jpg' : profile.image,
          phone: profile.phone === null ? '' : profile.phone
        }
      })
      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: response.data.message
      })
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data
        dispatch({
          type: 'SET_LOGIN_MESSAGE',
          payload: message
        })
      } else {
        dispatch({
          type: 'SET_LOGIN_MESSAGE',
          payload: 'Cant connect with server'
        })
      }
    }
  }
}

export const deleteImage = (token) => {
  return async dispatch => {
    try {
      const response = await http(token).delete('profile/image')
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {
          image: 'uploads/profile/profile-default.jpg'
        }
      })
      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: response.data.message
      })
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data
        dispatch({
          type: 'SET_LOGIN_MESSAGE',
          payload: message
        })
      } else {
        dispatch({
          type: 'SET_LOGIN_MESSAGE',
          payload: 'Cant connect with server'
        })
      }
    }
  }
}
