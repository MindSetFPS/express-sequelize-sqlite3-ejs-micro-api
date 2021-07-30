<template>
    <div class="container" >
        <h1 class="title">Detalles</h1>
        <div  v-if="pedidoDetails" > 
            <h2 class="">
                {{ pedidoDetails.customer.name }}
            </h2>

            <div>
                <h3> 
                    {{ pedidoDetails.food[0].name }} : {{ pedidoDetails.food[0].pedidoItems.quantity }}
                </h3>
            </div>
            <div>
                <h3>
                    {{ pedidoDetails.food[1].name }} : {{ pedidoDetails.food[1].pedidoItems.quantity }}
                </h3>
            </div>

            <div>
                <h3>
                    Pagado: {{ pedidoDetails.paid }}
                </h3>
                <h3>
                    Entregado: {{ pedidoDetails.delivered }}
                </h3>
            </div>

            <div>
                Lugar: {{ pedidoDetails.location.name }}
            </div>

            <div>
                ID: {{ pedidoDetails.id }}
            </div>

            <div>
                <button class="blue" >Editar</button>
                <button class="love" > Eliminar pedido </button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Details',
    data(){
        return{
            api: process.env.VUE_APP_API,
            pedidoId: this.$route.params.id,
            pedidoDetails: '',
        }
    },
    methods: {
        async getPedido(){
            const details = await fetch( this.api + `/pedidos/api/details/${this.pedidoId}` ).then( res => res.json()).catch()
            this.pedidoDetails = details
            console.log(details)
        }
    },
    mounted(){
        this.getPedido()
    }
}
</script>