<template>
    <h1 
        class="
            text-3xl font-semibold
            md:text-4xl 
            lg:text-6xl" 
    >
        {{ text }}
    </h1>
</template>
<script>
export default {
    name: 'PageTitle',
    props: ['text']
}
</script>