<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/reset.css";
@import "./assets/typo.css";
@import "./assets/atoms.css";
@import "./assets/form.scss";
@import "./assets/variables.scss";
body {
  color: $black;
}
.form--auth--home {
  width: 100%;
  max-width: 680px;
}
.header {
  padding: 1em 0 2em;
}
.main {
  width: 100%;
  margin: 0 auto;
}
.logo {
  max-height: 2.6em;
  display: inline-block;
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  pointer-events: all;
}

.btn {
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  margin: 0.6rem 0 0.4rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.btn--large {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.btn--primary {
  color: #fff;
  background-color: #357433;
}

.btn--primary:hover {
  background-color: #58be69;
}

.btn--primary:active {
  background-color: #58be69;
}

.btn__text {
  margin-right: 0.6rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
