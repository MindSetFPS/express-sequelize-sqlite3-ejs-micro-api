<template>
    <div class="  card  secondary  mt-2 " :class="[this.paid ? 'green' : 'love']" v-if="pedido.customer.name.toLowerCase().includes(customerFilter.toLowerCase())" >
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
                            <input type="checkbox" name="delivered" v-model="delivered" @change="change(pedido.id, delivered)" >
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div>
                        <p class="list-text" >Pagado</p>
                        <label class="switch">
                            <input type="checkbox" name="paid" v-model="paid"  >
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
                <button @click="updatePedido(pedido.id)" class="button small blue secondary " > Actualizar </button>
                <button class="button small green secondary " >
                    <router-link :to="'/details/' + pedido.id" > 
                        Details
                     </router-link>
                </button>
            </div>

            <h3>
                {{ pedido.food[0].pedidoItems.quantity }}
            </h3>
            <h3>
                {{ pedido.food[1].pedidoItems.quantity }}
            </h3>
            <h3> $ {{ (pedido.food[0].pedidoItems.quantity + pedido.food[1].pedidoItems.quantity) * 45 }}</h3>
   
        </div>
    </div>
</template>

<script>
export default {
    name: 'PedidoItem',
    props: ["pedido", "customerFilter"],
    data(){
        return{
            delivered: this.pedido.delivered ,
            paid: this.pedido.paid ,
            all: '',
            api: process.env.VUE_APP_API
        }
    },
    methods: {
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
        change(id, delivered){
            console.log(id, delivered)
            this.$emit('deliveryStateChanged', id)
        }
    },
    mounted(){
        console.log(this.pedido)
    }
}
</script>