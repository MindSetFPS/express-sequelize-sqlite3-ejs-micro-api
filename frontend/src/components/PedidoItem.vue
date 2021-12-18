<template>
    <div>
        <div>
            <div class="bg-white rounded-md mt-2 px-2 py-1 text-xs"  
                v-if="customer && customer.toLowerCase().includes(customerFilter.toLowerCase()) && locationFilter ==  '' || locationFilter == location " 
            >
            <div class="" >
                <h2 class="text-xl" >{{ customer }}</h2>
                <h3 class="text-md" >{{ createdAt }} </h3>
                <h3 class="text-xs" > {{ location }} </h3>
            </div>
                <div style="flex  justify-items: center; align-items: center; " class="flex justify-between" >
                    <div> 
                        <div >    
                            <div
                                @click="handleClick('changeDelivered')"
                                class="bg-gray-100 hover:bg-gray-200 p-1 "
                            >
                                <p :class="delivered ? 'text-green-600' : 'text-red-500'" >
                                    {{ delivered ? 'Entregado' : 'No entregado' }}
                                </p>
                            </div>
                            <div
                                @click="handleClick('changePaid')"
                                class="bg-gray-100 hover:bg-gray-200 p-1 "
                            >
                                <p :class="paid ? 'text-green-700' : 'text-red-500'" >
                                    {{ paid ? 'Pagado  ' : 'No pagado' }}
                                </p>
                            </div>
                        </div>
                        <button class="p-1 bg-gray-50 mt-1" >
                            <router-link :to="'/details/' + pedidoId" > 
                                Details
                            </router-link>
                        </button>
                    </div>
                    <div>
                        <h3>{{ comida0 }}</h3>
                    </div>
                    <div>
                        <h3>{{ comida1 }}</h3>
                    </div>
                    <h3> $ {{ ( comida0 + comida1 ) * 45 }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PedidoItem',
    props: ["pedidoId", "customerFilter", "locationFilter", "location", "customer", "paid", "delivered", "createdAt", "comida0", "comida1"],
    data(){
        return{
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        //Note: Local storage management was done here, it will have to me rewriten.
        updatePedido(){
            const url = '/pedidos/api/update/'
            fetch( this.api + url + this.pedidoId , {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({delivered: this.delivered, paid: this.paid})
            }).then(res => {
                console.log(res)
            }).catch(
                err => console.error(err)
            )
        },
        handleClick(change){
            this.$emit(change, this.pedidoId)
            this.updatePedido()
        }
    },
    mounted(){
    }
}
</script>