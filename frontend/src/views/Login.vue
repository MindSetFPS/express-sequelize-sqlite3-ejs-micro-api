<template>
    <div class="" >
        <h1 class="text-4xl font-bold text-center " >Login</h1>
        <form >
            <div class="p-2" >
                <label for="email">Email</label>
                <input class="block w-full p-2 rounded-md " type="email" v-model="email" name="email" id="email-field" placeholder="Correo" autofocus >
            </div>

            <div class="p-2" >
                <label for="password">Password</label>
                <input class="block w-full p-2 rounded-md " type="password" v-model="password" name="password" id="pasword-field " placeholder="Contrasena" >
            </div>

            <div class="p-2" >
                <button class="bg-green-200 rounded-md w-full py-2 " @click.prevent="postLogin" > Iniciar Sesion </button>
            </div>

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