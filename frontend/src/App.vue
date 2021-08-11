<template>
  <div :class="[user ? 'father' : 'container']" >  
        <Navbar v-if="user" />
      <router-view v-on:logInSuccesfull="doSomething" />
    </div>
</template>

<script>

import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  data(){
    return{
      user: '',
      api: process.env.VUE_APP_API
    }
  },
  methods: {
    async getUsers(){
      const users = await fetch(this.api + '/accounts/api/get').then(res => res.json())
      this.users = users
      console.log(this.users)
      if(!this.users.exists){
        console.log('No users found, creating the first user.')
        this.$router.push('/register')
      }else{
        console.log('Users found, redirecting to login.')
        this.$router.push('/login')
      }
      console.log(this.users)
    },
    doSomething(payload){
      this.user = payload
      console.log(payload)
    }
  },
  mounted(){
    this.getUsers()
  }
}
</script>

<style scoped>
  .father{
    display: grid; 
    grid-template-columns: 1fr 11fr;
  }
</style>