<template>
    <div>
        <h1 class="title">Register</h1>
        <form action="/register" method="POST" >
    
            <label for="email">Email</label>
            <input class="mt-2" type="email" name="email" id="email-field" placeholder="Correo" autofocus >

            <label for="password">Password</label>
            <input class="mt-2" type="password" name="password" id="pasword-field " placeholder="Contrasena" >
            

            <input class="button love mt-4" type="submit" value="Iniciar Sesion">

        </form>
    </div>
</template>

<script>
export default {
    name: 'Register'
}
</script>