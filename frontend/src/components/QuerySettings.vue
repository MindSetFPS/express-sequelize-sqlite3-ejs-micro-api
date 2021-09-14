<template>
    <div>
        <button @click="getPedidos">Buscar pedidos</button>

        <form action="/pedidos/" method="get">
            <div class="flex" style="justify-content: space-evenly;" >
                <div>
                    <label for="since">Since</label>
                    <input type="date" name="sincePicker" id="since"  v-model="since" >
                </div>
                <div>
                    <label for="until">Until</label>
                    <input type="date" name="untilPicker" id="until" v-model="until" >
                </div>
            </div>
            <div class="flex mt-3" style="display: grid; grid-template-columns:  1fr 1fr 1fr 1fr 0.7fr ;  justify-items: center; align-items: baseline ;" >
                <!-- TITULOS -->
                <div>
                    <p class="list-heading">Cliente</p>
                    <input class="small" name="customer" v-model="selectedCustomer" list="customersList" >
                    <datalist id="customersList" >
                        <option value=""></option>
                        <option v-for="customer in customers" :key="customer.id" > {{ customer.name }} </option>
                    </datalist>
                                    
                    <p class="list-heading">Lugar</p>
                    <select class="small" name="location" v-model="selectedLocation" >
                        <option value=""></option>
                        <option v-for="location in locations" :key="location.id" >  {{ location.name }} </option>
                    </select>
                </div>
                <div class="list-heading">
                    <div class="flex" >   
                        <p>Entregado</p>
                        <select type="checkbox" name="delivered" id="delivered" class="search" v-model="delivered"  > 
                            <option value="1">Si</option>
                            <option value="0">No</option>
                            <option value="">Indiferente</option>
                        </select>   
                    </div>            
                    
                    <div class="flex" >
                        <p>Pagado</p>
                        <input type="checkbox" name="paid" id="paid" class="search" v-model="paid" >
                    </div>

                    <div class="flex" >
                        <p>Todos</p>
                        <input type="checkbox" name="all" id="all" class="search" v-model="all" >
                    </div>
                    
                </div>
                <div class=" list-heading "     >
                    <div class="list-heading " v-if="calendar"  >
                    {{ calendar.calendar.Comida1Id > calendar.calendar.Comida2Id ? calendar.calendar.Comida2.name : calendar.calendar.Comida1.name }}
                    </div>
                    <div class="list-heading" >
                     {{ this.comida0Quantity }}
                    </div>
                    
                </div>
                <div class="list-heading  "     >
                    
                    <div class="list-heading" v-if="calendar" >
                        {{ calendar.calendar.Comida2Id > calendar.calendar.Comida1Id ? calendar.calendar.Comida2.name : calendar.calendar.Comida1.name  }}
                    </div>
                    
                    <div class="list-heading" >
                         {{this.comida1Quantity}}

                    </div>
                </div>   
                <div class="list-heading">
                    <p class="list-heading" >Total:</p>
                    <p  class="list-heading" >
                        $ {{ totalMoney }}
                    </p>
                </div>
            </div> 
        </form>
        <div>
            <div>    
                <div v-if="pedidos" >    
                    <PedidoItem
                        v-for="pedido in pedidos"
                        :pedido="pedido"
                        :key="pedido.id"
                    >
                    </PedidoItem>
        
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import PedidoItem from "@/components/PedidoItem.vue";
import * as dayjs from 'dayjs'

export default {
    name: 'QuerySettings',
    components: {
        PedidoItem
    },
    data(){
        return{
            calendar: '',
            customers: '',
            locations: '',
            since: '',
            until: '',
            paid: '',
            delivered: '',
            all: '',
            selectedLocation: '',
            selectedCustomer: '',
            pedidos: '',
            comida0Quantity: 0,
            comida1Quantity: 0,
            totalMoney: 0,
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getPedidos(){
            this.comida0Quantity = 0
            this.comida1Quantity = 0
            console.log(this.selectedCustomer, this.selectedLocation, this.since, this.until, this.all)
            const pedidos = await fetch(this.api + '/pedidos/api/?' + new URLSearchParams({sincePicker: this.since, untilPicker: this.until, paid: this.paid, delivered: this.delivered, all: this.all, location: this.selectedLocation, customer: this.selectedCustomer.trim() }))
                                    .then(res => res.json())
                                    .catch(e => console.error(e))
            this.pedidos = pedidos
            console.log(this.pedidos)
            this.setQuantity()
            this.calculateTotal()
        },
        async getCalendar(){
            const calendar = await fetch(this.api + '/calendar/api/list').then(res => res.json()).catch(e => console.error(e))
            this.calendar = calendar
            console.log('calendar: ' , this.calendar)
        },
        async getCustomers(){
            const customers = await fetch(this.api + '/customers').then(res => res.json()).catch(e => console.error(e))
            this.customers = customers
        },
        async getLocations(){
            const locations = await fetch( this.api + '/pedidos/api/locations').then( res => res.json() ).catch(e => console.error(e))
            this.locations = locations
        },
        setQuantity(){
            console.log(this.pedidos)
            for(let pedido of this.pedidos){
                this.comida0Quantity = this.comida0Quantity + pedido.food[0].pedidoItems.quantity
                this.comida1Quantity = this.comida1Quantity + pedido.food[1].pedidoItems.quantity
            }
        },
        calculateTotal(){
            const totalFood = this.comida0Quantity + this.comida1Quantity
            this.totalMoney = totalFood * 45
        }

    },
    mounted(){
        this.since = dayjs().format('YYYY-MM-DD')
        this.until = dayjs().add(1, 'day').format('YYYY-MM-DD')
        this.getPedidos()
        this.getCalendar()
        this.getCustomers()
        this.getLocations()
    }
}
</script>