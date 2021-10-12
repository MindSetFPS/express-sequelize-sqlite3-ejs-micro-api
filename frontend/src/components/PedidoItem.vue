<template>
    <div class="" >
        <div v-if="pedido" >
            <div class="bg-white rounded-md mt-2 px-2 py-1 text-xs" :class="[pedido.paid ? 'bg-green-200' : '']"  
                v-if="pedido.customer.name && pedido.customer.name.toLowerCase().includes(customerFilter.toLowerCase()) && locationFilter ==  '' || locationFilter == pedido.location.name " 
            >

            <div class="" >
                <h2 class="text-base font-medium inline-block"> {{ pedido.customer.name }} </h2> <span> {{ pedido.location.name }} </span>
            </div>
                <div style="flex" >
                    <p class="" >{{ pedido.createdAt }} </p>     
                </div>
                <div style="flex  justify-items: center; align-items: center; " class="flex justify-between" >
                    <div> 
                        <div class="flex" >    
                            <div class="" >
                                <p>Entregado</p>
                                <label class="switch">
                                    <input 
                                        type="checkbox" 
                                        name="delivered" 
                                        v-model="pedido.delivered" 
                                        @change="emitChange(pedido.id, pedido.delivered)" 
                                    >
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div>
                                <p class="" >Pagado</p>
                                <label class="switch">
                                    <input 
                                    type="checkbox" 
                                    name="paid" 
                                    v-model="pedido.paid"  
                                    >
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <button 
                            @click="updatePedido(pedido.id)" 
                            class=" p-1 bg-gray-100 mt-1 text-xs rounded-md" 
                        > 
                            Actualizar 
                        </button>
                        <button class="p-1 bg-gray-50 mt-1" >
                            <router-link :to="'/details/' + pedido.id" > 
                                Details
                            </router-link>
                        </button>
                    </div>
                    <h3>{{ pedido.food[0].pedidoItems.quantity }}</h3>
                    <h3>{{ pedido.food[1].pedidoItems.quantity }}</h3>
                    <h3> $ {{ (pedido.food[0].pedidoItems.quantity + pedido.food[1].pedidoItems.quantity) * 45 }}</h3>
                </div>
            </div>
        </div>
        <div v-else >
            <loading />
        </div>
    </div>
</template>

<script>
import Loading from './Loading.vue'
export default {
  components: { Loading },
    name: 'PedidoItem',
    props: ["pedidoId", "customerFilter", "locationFilter"],
    data(){
        return{
            pedido: '',
            all: '',
            food0Count: 0,
            food1Count: 0,
            delivered: 0,
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getPedido(){
            const pedido = await fetch(this.api + `/pedidos/api/details/${this.pedidoId}`).then( res => res.json()).catch(e => console.error(e))
            this.pedido = pedido
            this.food0Count = pedido.food[0].pedidoItems.quantity
            this.food1Count = pedido.food[1].pedidoItems.quantity
            this.delivered = pedido.delivered
            this.$emit('pedido-loaded', this.food0Count, this.food1Count, this.pedido.delivered)
        },
        updatePedido(id){
            const url = '/pedidos/api/update/'
            console.log(this.api + url)
            console.log(this.api + url)
        
            fetch( this.api + url + id , {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({delivered: this.pedido.delivered, paid: this.pedido.paid})
            }).then(res => {
                console.log(res)
            }).catch(
                err => console.error(err)
            )
        },
        showSelectedCustomer(){
            console.log(this.customerFilter)
        },
        emitChange(id, delivered){
            this.$emit('delivery-state-changed', id, delivered, this.food0Count, this.food1Count)
        }
    },
    mounted(){
        // console.log(this.pedido)
        this.getPedido()
    }
}
</script>