<template>
    <h1 
        class="
            md:text-xl 
            lg:text-2xl" 
    >
        {{ text }}
    </h1>
</template>
<script>
export default {
    name: 'FieldName',
    props: ['text']
}
</script>