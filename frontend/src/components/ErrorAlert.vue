<template>
        <div class="card love alert" >
            <span class="text">
                {{ message }}
            </span>
            

        <span class="material-icons" style="font-size: 18px; vertical-align: middle;" >&#xe000;</span> 
            <router-link :to="link" >
                <span class="material-icons" style="font-size: 18px; vertical-align: middle; color: cornflowerblue;" >&#xe895;</span>
            </router-link>
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: ['link', 'message']
}
</script>

<style scoped>
    .alert{
        display: flex; 
        align-items: center; 
        font-size: 16px; 
        vertical-align: middle;
    }
    .text{
        font-size: 32px;
    }
</style>