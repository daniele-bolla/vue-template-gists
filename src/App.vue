<template>
  <section id="app">
    <header class="header">
      <nav id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <main class="main container centered-content">
      <router-view />
    </main>
  </section>
</template>

<style lang="scss">
@import "./assets/reset.css";
@import "./assets/typo.css";
@import "./assets/atoms.css";
@import "./assets/variables.scss";
body {
  color: $black;
}
.page--home {
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
