<template>
    <div class="container" >
        <h1  class="title">Pedidos</h1>
        <QuerySettings />

    </div>
</template>

<style scoped>
    .container{
        padding: 2em;
    }
</style>

<script>
    import * as dayjs from "dayjs";
    import QuerySettings from "@/components/QuerySettings.vue";
    
    export default {
        name: 'Pedidos',
        components: {
            QuerySettings,
        },
        data(){
            return{
                pedidos: [],
                locations: [],
                selectedLocation: '',
                selectedCustomer: '',
                comida1Name: '',
                comida1Quantity: 0,
                comida2Name: '',
                comida2Quantity: 0,
                since: '',
                until: '',
                customer: '',
                delivered: '',
                paid: '',
                menu: '',
                all: '',
            }
        },
        mounted(){

            this.since = dayjs().format('YYYY-MM-DD')

            this.until = dayjs().add(1, 'day').format('YYYY-MM-DD')

            this.getPedidos()
        },    
        methods: {
            async getPedidos(){
                console.log(this.selectedLocation)
                this.comida1Quantity = 0
                this.comida2Quantity = 0
                fetch('http://localhost:3000/pedidos/api/?' + new URLSearchParams({sincePicker: this.since, untilPicker: this.until, paid: this.paid, delivered: this.delivered, all: this.all, location: this.selectedLocation, customer: this.selectedCustomer.trim() }))
                .then(res => res.json())   
                .then(pedidos => this.pedidos = pedidos)
                .then(console.log(this.pedidos))

                .then( () => {
                    this.pedidos.forEach((pedido) => {
                        this.comida1Quantity = this.comida1Quantity + pedido.food[0].pedidoItems.quantity  
                        this.comida2Quantity = this.comida2Quantity + pedido.food[1].pedidoItems.quantity  

                        console.log(this.comida1Quantity)
                })
                })

                .catch(err => console.error(err))
                .finally( () => console.log(this.pedidos))

                // Consulting locations with the api
                fetch('/pedidos/api/locations')
                .then(res => res.json())
                .then(locations => this.locations = locations)
                .catch(err => console.error(err))
                console.log(this.locations)

                fetch('/customers')
                .then( res => res.json())
                .then( customers => this.customers = customers )
                .catch( e => console.error(e))
                .finally( console.log(this.customers ))

                fetch('/calendar/api/list')
                .then(res => res.json())
                .then(menu => this.menu = menu )
                .catch(err => console.error(err))
                .finally( () => {
                    this.comida1Name = this.menu.Comida1.name
                    this.comida2Name = this.menu.Comida2.name
                })
            },

        }
    }
</script>