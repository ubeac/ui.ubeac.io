<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn">
      <h3>This is the first page!</h3>
      <ul>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/registerwithgateway">Register With Gateway</router-link></li>
        <li><router-link to="/changepassword">Change Password</router-link></li>
        <li><router-link to="/forgotpassword">Forgot Password</router-link></li>
        <li><router-link to="/resetpassword">Reset Password</router-link></li>
        <li><router-link to="/logout">Logout</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
      </ul>
    </div>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
