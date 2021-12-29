<template>
    <div>
        <h1 class="text-4xl font-bold">Detalles</h1>
        <div v-if="loading" >
            Loading
        </div>
        <div v-else > 
            <h2 class="text-xl font-semibold">
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

            <div class="flex justify-evenly" >
                <button class=" rounded-md bg-blue-200 p-2  border-blue-500 text-blue-500 font-medium  ">
                    <router-link class="link text-sm" :to="'/edit/pedido/' + pedidoDetails.id" > Editar Pedido </router-link>
                </button>
                <button class="bg-pink-100 rounded-md py-3 px-2  text-red-400 text-sm font-medium " @click.prevent="deletePedido   " > Eliminar pedido </button>
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
            loading: true
        }
    },
    methods: {
        async getPedido(){
            const details = await fetch( this.api + `/pedidos/api/details/${this.pedidoId}` )
                .then( res => res.json())
                .catch(error => console.error(error))

            this.pedidoDetails = details.data
            this.loading = false
        },
        async deletePedido(){
            const res = await fetch( this.api + '/pedidos/api/delete/' + this.pedidoId, {
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            }).then(res => res.json()).catch(e => console.error(e))

            this.res = res
            this.$router.push('/')
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