<template>
    <div>
        <page-title text="Cliente" />
        {{ customerId }}

    </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
    name: 'Customer',
    components: {
        PageTitle
    },
    data(){
        return{
            customerId: this.$route.params.id,
            api: process.env.VUE_APP_API,
        }
    },
    methods: {
        async getCustomer(){
            const res = await fetch(this.api + '/customer/' + this.customerId).then(res => res.json())
            console.log(this.customerId)
            console.log(res)
        }
    },
    mounted(){
        this.getCustomer()
    }
}
</script>