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
            customerId: this.$route.params.id
        }
    },
    methods: {
        getCustomer(){
            console.log(this.customerId)
        }
    },
    mounted(){
        this.getCustomer()
    }
}
</script>