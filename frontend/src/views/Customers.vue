<template>

    <div>
        <page-title text="Customers" />
        <div v-for="customer in customers"  :key="customer.id" >

            <router-link :to="'/customer/' + customer.id" >
                {{ customer.name }}
            </router-link>

        </div>
    </div>
</template>
<script>

import PageTitle from '../components/PageTitle.vue'
export default {
    name: 'Customers',
    components: {
        PageTitle
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
        }
    },
    mounted(){
        this.getCustomers()
    }

}
</script>