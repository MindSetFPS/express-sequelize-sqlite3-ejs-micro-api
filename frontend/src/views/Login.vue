<template>
    <div>
        <h1 class="title" >Login</h1>
        <form >
            
            <label for="email">Email</label>
            <input class="mt-2" type="email" v-model="email" name="email" id="email-field" placeholder="Correo" autofocus >

            <label for="password">Password</label>
            <input class="mt-2" type="password" v-model="password" name="password" id="pasword-field " placeholder="Contrasena" >
            

            <button class="button love mt-4" @click.prevent="postLogin" > Iniciar Sesion </button>

        </form>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return{
            email: '',
            password: '',
            api: process.env.VUE_APP_API,
            res: ''
        }
    },
    methods: {
        async postLogin(){
                console.log(this.email)
                console.log(this.password)
                console.log(this.api + '/login')

                const res = await fetch( this.api + '/login', {
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        withCredentials: true,
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password,
                        })
                }).then(res => res.json()).catch(e => console.error(e))
            
            this.res = res      
            console.log(this.res)

            if(this.res.user){
                this.$emit('logInSuccesfull', this.res.user )
                this.$router.push('/')
            }


        }
    }
}
</script>