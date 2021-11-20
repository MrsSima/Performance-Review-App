<template>
  <div id="header-background-block">
    <div id="header">
      <div id="title" class="header-title">Performance Review Input App</div>
      <div id="header-options">
        <div id="header-name">{{ name }}</div>
        <div
            id="logout"
            class="header-title"
            @click="logout"
        >Logout
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    name: String
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$emit('logout');
    }
  }
}
</script>

<style>
#header-background-block {
  background-color: var(--pickled-bluewood);
  width: 80%;
  height: 120px;
  margin: 0 auto;
  border-radius: 0 0 20px 20px;
}

#header {
  width: 100%;
  height: 120px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--aquamarine);
}

#title {
  padding-left: 1em;
  font-size: 30px;

}

#header-options {
  display: flex;
  flex-direction: column;
  padding-right: 1em;
  align-items: flex-end;
}

#header-name {
  padding-left: 0.2em;
}

#logout {
  cursor: pointer;
  border-radius: 5px;
  padding: 0 0.2em;
}

#logout:hover {
  background-color: var(--ming);
}
</style>
