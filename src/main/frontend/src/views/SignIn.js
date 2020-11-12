import React from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../store/actions'
import './SignIn.styl'
import logo from '../assets/img/logo.png'

const SignIn = ({ loginUser }) => {
  return (
    <div className="container_center signin-container">
      SignIn
      <div className="logo"><img src={logo} alt="Logo"/></div>
      <button onClick={loginUser}>Click me</button>
      {/* <div className="logo"><img src="./src/main/resources/src/img/logo.png" alt="Logo"/></div> */}
      {/* <div className="signin">
        <div className="title signin-title">Вход</div>
        <form className="form signin-form" action="#" @submit.prevent="checkForm()">
          <div className="form-block" :className="{'form-block_error': emailError != ''}">
            <label className="form-label" for="signin-email">Корпоративная почта SmartWorld</label>
            <input className="form-input" type="text" id="signin-email" placeholder="@smartworld.team" v-model.trim="email" @focusout="checkEmail()"/>
            <div className="form-error" v-if="emailError != ''">{{ emailError }}</div>
          </div>
          <div className="form-block" :className="{'form-block_error': passwordError != '' || authError != ''}">
            <label className="form-label" for="signin-password">Пароль</label>
            <div className="form-password">
              <input className="form-input" type="password" id="signin-password" v-model.trim="password" @focusout="checkPassword()"/>
              <button className="form-password__eye" v-if="passwordFocus &amp;&amp; !passwordShow" @click.prevent="togglePasswordShow()"><img src="../assets/img/eye.svg" alt="Eye"/></button>
              <button className="form-password__eye" v-if="passwordFocus &amp;&amp; passwordShow" @click.prevent="togglePasswordShow()"><img src="../assets/img/eye-closed.svg" alt="Closed eye"/></button>
            </div>
            <button className="signin-form__forget" @click.prevent="goToPassword()">Забыли пароль?</button>
            <div className="form-error" v-if="passwordError != ''">{{ passwordError }}</div>
            <div className="form-error" v-if="authError != ''">{{ authError }}</div>
          </div>
          <button className="form-submit" type="submit" :disabled="errors">Войти</button>
          <button className="signin-form__signup" @click.prevent="goToSignup()">Еще нет аккаунта?</button>
        </form>
      </div>
      <div className="notification-popup" v-if="notification.msg != ''">
        <div className="notification-info">{{ notification.msg }}</div>
        <div className="notification-img" v-if="notification.err"><img src="../assets/img/cross.svg" alt="Cross"/></div>
        <div className="notification-img" v-else="v-else"><img src="../assets/img/tick-success.svg" alt="Tick"/></div>
        <button className="notification-close" @click.prevent="closeNotification()">&times;</button>
      </div>
      <div className="processing-overlay" v-if="processing">
        <div className="processing-indicator"></div>
      </div> */}
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// export default connect(mapStateToProps, null)(SignIn)

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(SignIn)

// export default SignIn