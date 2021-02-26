import { showMessage } from 'react-native-flash-message'

const showingMessage = (message, description, type) => {
  showMessage({
    message: message,
    description: description,
    type: type || 'danger'
  })
}

export { showingMessage }
