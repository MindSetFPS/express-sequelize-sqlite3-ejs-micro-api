<template>



    <div class="  card  secondary  mt-2 " :class="[this.paid ? 'green' : 'love']"  >
        <div style="display: grid; grid-template-columns:  1fr 1fr  1fr 1fr 0.7fr ;  justify-items: center; align-items: center; " >
            <div>
                <div> {{ pedido.location.name}} </div>
                <div> {{ pedido.customer.name}} </div>
                <div class="list-text" > {{ pedido.createdAt }} </div>
            </div>

            <div style="text-align: center;" > 
                <div class="flex" >    
                    <div class="" >
                        <p class="list-text" > Entregado   </p>
                        <label class="switch">
                            <input type="checkbox" name="delivered" v-model="delivered" >
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

            <h3>{{ pedido.food[0].pedidoItems.quantity }}</h3>
            <h3>{{ pedido.food[1].pedidoItems.quantity }}</h3>
   
        </div>
    </div>

    
</template>

<script>
export default {
    name: 'PedidoItem',
    props: ["pedido"],
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
            console.log(id)
            const url = '/pedidos/api/update/' + id
            console.log(this.api + url)
            // data = {
            //     delivered: this.delivered,
            //     paid: this.paid
            // }

            fetch( url , {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({delivered: this.delivered, paid: this.paid})
            }).then(res => {
                console.log(res)
            }).catch(
                err => console.error(err)
            )
        }
    }
}
</script>