<template>
    <div>
        <customer-list-item v-for="customer in customers"  :key="customer.id"  :customer="customer" />
    </div>
</template>

<script>
import CustomerListItem from './CustomerListItem.vue'

export default {
    name: 'CustomerList',
    components: {
        CustomerListItem
    },
    props: ['customers'],
    methods: {
    },
    mounted(){
    }
}
</script>