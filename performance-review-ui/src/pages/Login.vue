<template>
  <div id="login-background-block">
    <div id="login"
         v-on:keyup.enter="logIn">
      <div id="login-title">Login please!</div>
      <div id="login-login">Login: <input v-model="login" id="login-input-field"></div>
      <div id="login-password">Password: <input v-model="password" type="password" id="login-password-field"></div>
      <div id="login-button"><button
          id="login-button-element"
          @click="logIn"
      >Login</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {},
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    logIn() {
      this.$emit('login', {login: this.login, password: this.password});
    }
  }
}
</script>

<style>
#login-background-block {
  margin: auto;
  width: 100%;
  height: 100%;
  position: relative;
}

#login {
  color: var(--polar);
  background-color: var(--bondie-blue);
  width: 250px;
  height: 180px;
  position: absolute;
  top: 20%;
  left: calc(50% - 125px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#login-title {
  font-size: 20px;
}

#login-login {
  font-size: 16px;
  padding-left: 1.7em;
  margin-top: 1em;
}

#login-input-field {
  border-radius: 5px;
  color: var(--pickled-bluewood);
  background-color: var(--polar);
}

#login-password {
  font-size: 16px;
  margin-bottom: 1em;
}

#login-password-field {
  border-radius: 5px;
  color: var(--pickled-bluewood);
  background-color: var(--polar);
}

#login-button-element {
  border-radius: 3px;
  border-style: none;
  background-color: var(--aquamarine);
  color: var(--pickled-bluewood);
  width: 3.5rem;
  cursor: pointer;
}

#login-button-element:hover {
  background-color: var(--polar);
}

#login-button-element:active {
  background-color: var(--aquamarine);
}
</style>