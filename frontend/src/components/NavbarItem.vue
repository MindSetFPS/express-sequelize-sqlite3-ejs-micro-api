<template>
    <router-link
        :to="link" 
        class="text-blue-400 hover:text-blue-700 w-full"
    >
        <mdicon :name="icon" />
        <p class="hidden text-sm lg:block" >{{ text }}</p>
    </router-link>
</template>
<script>
export default {
    name: 'NavbarItem',
    props: ['text', 'icon', 'link']
}
</script>
<style>
    svg {
        margin-left: auto;
        margin-right: auto;
    }
</style>
