class LoginView {
  constructor(rl) {
    this.rl = rl
  }

  promptUsername(callback) {
    this.rl.question('Username: ', (username) => {
      callback(username)
    })
  }

  promptPassword(callback) {
    this.rl.question('Password: ', (password) => {
      callback(password)
    })
  }

  displayInvalidUsernameMessage() {
    console.log('Username tidak ditemukan')
  }

  displayInvalidPasswordMessage() {
    console.log('Password salah')
  }
}

module.exports = LoginView
