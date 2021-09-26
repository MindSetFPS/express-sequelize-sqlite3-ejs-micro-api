<template>
    <div>
        <div v-if="pedido" >
            <div class="  card  secondary  mt-2 " :class="[pedido.paid ? 'green' : 'love']"  
                v-if="pedido.customer.name && pedido.customer.name.toLowerCase().includes(customerFilter.toLowerCase())" 
            >
                <h2 class=""> {{ pedido.customer.name }} </h2>
                <div style="display: flex; align-items: baseline;" >
                    <p class="list-text" > {{ pedido.location.name }} - </p>
                    <p class="list-text" > {{ pedido.createdAt }} </p>            
                </div>
                <div style="display: grid; grid-template-columns: 1.9fr  1fr 1fr 0.8fr ;  justify-items: center; align-items: center; " >
                    <div style="text-align: center;" > 
                        <div class="flex" style="justify-content: space-between;" >    
                            <div class="" >
                                <p class="list-text" > Entregado   </p>
                                <label class="switch">
                                    <input 
                                        type="checkbox" 
                                        name="delivered" 
                                        v-bind="pedido.delivered" 
                                        @change="emitChange(pedido.id, food0Count, food1Count)" 
                                    >
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div>
                                <p class="list-text" >Pagado</p>
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
                        class="button small blue secondary " 
                        > 
                            Actualizar 
                        </button>
                        <button class="button small green secondary " >
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
    props: ["pedidoId", "customerFilter"],
    data(){
        return{
            pedido: '',
            all: '',
            food0Count: 0,
            food1Count: 0,
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getPedido(){
            const pedido = await fetch(this.api + `/pedidos/api/details/${this.pedidoId}`).then( res => res.json()).catch(e => console.error(e))
            this.pedido = pedido
            this.food0Count = pedido.food[0].pedidoItems.quantity
            this.food1Count = pedido.food[1].pedidoItems.quantity
            console.log(this.food0Count, this.food1Count)
            this.$emit('increase', this.food0Count, this.food1Count)
        },
        updatePedido(id){
            const url = '/pedidos/api/update/'
            console.log(this.api + url)
            console.log(this.api + url)
        
            fetch( this.api + url + id , {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({delivered: this.delivered, paid: this.paid})
            }).then(res => {
                console.log(res)
            }).catch(
                err => console.error(err)
            )
        },
        showSelectedCustomer(){
            console.log(this.customerFilter)
        },
        emitChange(id){
            this.$emit('delivery-state-changed', id, this.food0Count, this.food1Count)
        }
    },
    mounted(){
        // console.log(this.pedido)
        this.getPedido()
    }
}
</script>