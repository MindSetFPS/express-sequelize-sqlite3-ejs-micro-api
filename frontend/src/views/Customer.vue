<template>
    <div>
        <div class="sticky top-0 bg-gray-100" >
            <page-title text="Cliente" />

            <h1 class="font-semibold text-2xl" >
                {{ customer.name }} - 
                <span class="font-normal text-lg" >Estadisticas de los ultimos 30 dias</span>
            </h1>

            <div v-if="customer" class="flex justify-between px-3 "  >
                <div>
                    <h1 class="text-lg font-medium " >Comida Favorita</h1>
                    <p class="text-md" >{{ 'Papitas' }}</p>
                </div>
                <div>
                    <h1 class="text-lg font-medium " >Pedidos </h1>
                    <p class="text-md" > {{ pedidosTotal }} </p>
                </div>
                <div>
                    <h1 class="text-lg font-medium " >Pagados </h1>
                    <p class="text-md" >{{ paid }}</p>
                </div>
                <div>
                    <h1 class="text-lg font-medium " >Por pagar </h1>
                    <p class="text-md" >{{ notPaid }}</p>
                </div>
                <div>
                    <h1 class="text-lg font-medium " >Recaudado </h1>
                    <p class="text-md text-green-500 font-bold " > $ {{ balance }}</p>
                </div>
                <div>
                    <h1 class="text-lg font-medium " >Deuda </h1>
                    <p class="text-md text-red-500 font-bold " > $ {{ debt }}</p>
                </div>
            </div>
        </div>

        <div v-if="pedidos" >
            <div v-for="pedido in pedidos" :key="pedido.id" >
                <div class="bg-white m-2 p-2 rounded-md " >
                    <p class="text-xs" >{{ pedido.id }}</p>
                    <p>{{ getDateAndTime(pedido.updatedAt) }}</p>
                    
                    
                    <div class="flex justify-between " >
                        <div class="flex" >
                            <div >
                                <div class="font-semibold" >
                                    {{ pedido.food[0].name }}
                                </div>
                                <div>
                                    {{ pedido.food[0].pedidoItems.quantity }}
                                </div>
                            </div>

                            <div>
                                <div class="font-semibold" >
                                    {{ pedido.food[1].name }}
                                </div>
                                <div>
                                    {{ pedido.food[1].pedidoItems.quantity }}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div :class="[pedido.paid ? 'text-green-400' : 'text-red-400', 'flex']" >
                                <h1 class="font-semibold" >Paid:</h1>
                                <mdicon :name="pedido.paid ? 'check-circle' : 'close-circle'" class="text-xs" />
                            </div>
                            <div :class="[pedido.delivered ? 'text-green-400' : 'text-red-400', 'flex']" >
                                <h1 class="font-semibold" >Delivered</h1>
                                <mdicon :name="pedido.delivered ? 'check-circle' : 'close-circle'" class="text-xs" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import * as dayjs from 'dayjs'
import 'dayjs/locale/es'
import PageTitle from '../components/PageTitle.vue'

dayjs.locale('es')

export default {
    name: 'Customer',
    components: {
        PageTitle
    },
    data(){
        return{
            pedidosTotal: 0,
            paid: 0,
            notPaid: 0,
            balance: 0,
            customerId: this.$route.params.id,
            customer: false,
            pedidos: false,
            debt: 0,
            api: process.env.VUE_APP_API,
        }
    },
    methods: {
        async getCustomer(){
            const res = await fetch(this.api + '/customer/' + this.customerId).then(res => res.json())
            console.log(res)
            this.customer = res.customer
            this.pedidos = res.pedidos
            this.loopPedidos()

        },
        loopPedidos(){
            for(let pedido of this.pedidos){
                if(pedido.paid){
                    this.paid = this.paid + pedido.food[0].pedidoItems.quantity + pedido.food[1].pedidoItems.quantity
                }
                this.pedidosTotal = this.pedidosTotal + pedido.food[0].pedidoItems.quantity + pedido.food[1].pedidoItems.quantity
            }
            this.notPaid = this.pedidosTotal - this.paid
            this.balance = this.paid * 45
            this.debt = this.notPaid * 45
        },
        getDateAndTime(d){
            return dayjs(d).format('dddd DD [de] MMMM [del] YYYY')
        }
    },
    mounted(){
        this.getCustomer()
    }
}
</script>