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
                <button class="button blue secondary  pt-2">
                    <router-link class="link" :to="'/edit/pedido/' + pedidoDetails.id" > Editar Pedido </router-link>
                </button>
                
                <button class="love" @click.prevent="deletePedido   " > Eliminar pedido </button>
            </div>

            <div v-if="res" >
                {{ res }}
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Details',
    data(){
        return{
            res: '',
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
        },
        async deletePedido(){
            const res = await fetch( this.api + '/pedidos/api/delete/' + this.pedidoId, {
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            }).then(res => res.json()).catch(e => console.error(e))
            
            this.res = res

            this.$router.push('/pedidos')
        }
    },
    mounted(){
        this.getPedido()
    }
}
</script>

<style>
    .link{
        font-size: 18px;
    }
</style>