<template>
    <div class="" >
        <h1 class="title">Register</h1>
        <form  >
    
            <label for="email">Email</label>
            <input class="mt-2" required type="email" name="email" v-model="email" id="email-field" placeholder="Correo" autofocus >

            <label for="password">Password</label>
            <input class="mt-2" required type="password" name="password" v-model="password" id="pasword-field " placeholder="Contrasena" >
            

            <button class="button love mt-4" @click.prevent="postRegisterUser" > Crear Cuenta </button>

        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            email: '',
            password: '',
            api: process.env.VUE_APP_API,
            res: '',
        }
    },
    methods: {
        async postRegisterUser(){
            const res = await fetch( this.api + '/register', {
                headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    })
                }).then(res => res.json()).catch(e => console.error(e))
            this.res = res

            console.log(this.email)
            console.log(this.password)
            

        }
    }
}
</script>