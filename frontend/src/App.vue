<template>
  <div class="flex  "  >  
      <Navbar v-if="user" />
      <router-view v-on:logInSuccesfull="doSomething" class="container mx-auto p-4 md:p-24"  />
    </div>
</template>

<script>
import { get } from 'tiny-cookie'

import Navbar from "@/components/Navbar";
import './assets/tailwind.css'

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
      if (get('user')){
        console.log('user found')
        this.user = get('user')
        this.$router.push('/')
      } else {
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

      }
    },
    doSomething(payload){
      this.user = payload
      console.log(payload)
    }
  },
  mounted(){
    this.getUsers()
    console.log('api: ', this.api)
  }
}
</script>

<style scoped>
  .father{
    display: flex;
  }
</style>