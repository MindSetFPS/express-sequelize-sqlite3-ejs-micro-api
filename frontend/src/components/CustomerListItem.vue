<template>
    <div class="bg-white p-2 m-2 transition rounded-md hover:shadow-lg flex justify-between " >
        <router-link :to="'/customer/' + customer.id" >
            {{ customer.name }}
        </router-link>
            <div class="text-right" >
                <p class="text-xs" >
                    Compras:
                </p>
                {{ pedidos }}
            </div>
    </div>
</template>
<script>
export default {
    name: 'CustomerListItem',
    props: ['customer'],
    data(){
        return{
            pedidos: 0,
        }
    },
    mounted(){
        for(let pedido of this.customer.pedidos){
            this.pedidos = this.pedidos + pedido.food[0].pedidoItems.quantity + pedido.food[1].pedidoItems.quantity
        }
    }
}
</script>