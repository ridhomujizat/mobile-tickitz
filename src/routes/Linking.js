
const config = {
  screens: {
    SignIn: {
      path: 'activate/:activate',
      parse: {
        activate: activate => `${activate}`
      }
    },
    ChangePassword: {
      path: 'forgetPassword/:token',
      parse: {
        token: token => `${token}`
      }
    }
  }
}

const linking = {
  prefixes: ['tickitz://'],
  config
}

export default linking
