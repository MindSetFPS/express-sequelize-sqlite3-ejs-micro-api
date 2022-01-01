<template>
    <div>
        <page-title text="Customers" />
        <customer-list :customers="customers" />
    </div>
</template>
<script>

import PageTitle from '../components/PageTitle.vue'
import CustomerList from '../components/CustomerList.vue'

export default {
    name: 'Customers',
    components: {
        PageTitle,
        CustomerList
    },
    data(){
        return{
            customers: '',
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getCustomers(){
            const customer = await fetch(this.api + '/customer/all')
                .then(res => res.json())
                .catch(error => console.error(error))
            this.customers = customer
            console.log(this.customers)
        }
    },
    mounted(){
        this.getCustomers()
    }
}
</script>