import React from 'react'
import './styles.css'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/userActions'

const LoginPage = props => {
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    const username = form.username.value
    const password = form.password.value
    const isAdUser = form.isAdCheck.checked
    debugger;
    props.login({ username, password, isAdUser }).then(e => {
      props.history.replace('/')
    })
  }

  return (
    <React.Fragment>
      <div className="loginPageContainerWithImage">
        <div className="loginImageSide">
          <img src="loginPageCover.jpg" alt="coverImage" />
        </div>
        <div className="loginContainer">
          <div className="loginFormContainer">
            <div className="loginForm">
              <form onSubmit={handleSubmit} className="loginFormModified">
                <FormControl>
                  <InputLabel htmlFor="component-simple">Username</InputLabel>
                  <Input id="username" />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="component-simple">Password</InputLabel>
                  <Input id="password" type="password" />
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="isAdCheck"
                      color="primary"
                    />
                  }
                  label="Is AD user"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="loginButton"
                  // disabled={password.length > 0 && username.length > 0}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default connect(null, { login })(LoginPage)
