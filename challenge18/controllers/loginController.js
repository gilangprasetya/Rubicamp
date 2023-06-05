const LoginView = require('../views/loginView')
const Login = require('../models/login')

class LoginController {
    constructor(db, rl) {
        this.loginView = new LoginView(rl)
        this.loginModel = new Login(db)
    }

    login(callback) {
        const self = this

        const authenticateUser = function () {
            self.loginView.promptUsername((username) => {
                self.loginModel.authenticate(username, (user) => {
                    if (user) {
                        self.loginView.promptPassword((password) => {
                            if (password === user.password) {
                                callback(user.username, user.role)
                            } else {
                                self.loginView.displayInvalidPasswordMessage()
                                authenticateUser()
                            }
                        })
                    } else {
                        self.loginView.displayInvalidUsernameMessage()
                        authenticateUser()
                    }
                })
            })
        }

        authenticateUser()
    }
}

module.exports = LoginController
