<template>
    <router-link :to="link" class="flex hover:underline hover:text-blue-400 " >
        <span>{{ message }}</span>
        <mdicon name="link" />
    </router-link>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: ['link', 'message']
}
</script>