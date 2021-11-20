<template>
    <Login
        v-if="!logged"
        @login="logIn"
    />
  <div class="fullscreen" v-else>
    <Header :name="userName" @logout="logOut"/>
    <Admin v-if="isAdmin"/>
    <Employee :id="currentUserId" v-else/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Admin from './pages/Admin.vue'
import Employee from './pages/Employee.vue'
import Login from './pages/Login.vue'
import {routes, serverAddress} from "./constants";

export default {
  name: 'App',
  components: {
    Header,
    Admin,
    Employee,
    Login
  },
  data() {
    return {
      isAdmin: false,
      logged: false,
      currentUserId: '',
      currentUserName: ''
    }
  },
  computed: {
    userName() {
      if (this.isAdmin) {
        return 'Admin';
      } else {
        return this.currentUserName;
      }
    }
  },
  methods: {
    logIn(event) {
      if (event.login === 'admin' && event.password === '123456') {
        this.isAdmin = true;
        this.logged = true;
      } else {
        fetch(serverAddress + routes.employees).then((response) => {
          return response.json();
        }).then((data) => {
          let currentUser = data.find(employee => employee.name === event.login);
          if (event.password === '123456' && currentUser) {
            this.logged = true;
            this.currentUserName = currentUser.name;
            this.currentUserId = currentUser.id;
          }
        })
      }
    },
    logOut() {
      this.logged = false;
      this.isAdmin = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
