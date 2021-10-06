<template>
    <div>
        <button @click="getPedidos">Buscar pedidos</button>
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

            <p class="list-heading">Cliente</p>
            <input class="small" name="customer" v-model="selectedCustomer" autocomplete="off"  >
                    

            <div class="flex mt-3" style="display: grid; grid-template-columns:  1fr 1fr 1fr 1fr 0.7fr ;  justify-items: center; align-items: baseline ;" >
                <!-- TITULOS -->
                <div>
                    <p class="list-heading">Lugar</p>
                    <select class="small" name="location" v-model="selectedLocation" v-if="locations" >
                        <option value=""></option>
                        <option v-for="location in locations" :key="location.id" >  {{ location.name }} </option>
                    </select>
                    <div v-else >
                        <Loading />
                    </div>
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
                    <div v-else >
                        <Loading />
                    </div>
                    <div class="flex" >
                        <div class="to-deliver" >
                            {{ this.comida0DeliveredQuantity }}
                        </div>
                        /
                        <div class="list-heading" >
                        {{ this.comida0TotalQuantity }}
                        </div>
                    </div>
                </div>
                <div class="list-heading  "     >
                    <div class="list-heading" v-if="calendar" >
                        {{ calendar.calendar.Comida2Id > calendar.calendar.Comida1Id ? calendar.calendar.Comida2.name : calendar.calendar.Comida1.name  }}
                    </div>
                    <div v-else >
                        <Loading />
                    </div>
                    <div class="flex" >
                        <div class="to-deliver" >
                            {{ this.comida1DeliveredQuantity }}
                        </div>
                        /
                        <div class="" >
                         {{this.comida1TotalQuantity}}
                        </div>
                    </div>
                </div>   
                <div class="list-heading">
                    <p class="list-heading" >Total:</p>
                    <p  class="list-heading" >
                        $ {{ totalMoney }}
                    </p>
               </div>
            </div> 
        <div>
            <div>    
                <div v-if="pedidos" >    
                    <PedidoItem
                        @delivery-state-changed="handleDeliveryChange"
                        @pedido-loaded="handlePedido"
                        v-for="pedido in pedidos"
                        :pedidoId="pedido.id"
                        :key="pedido.id"
                        :customerFilter="selectedCustomer"
                        :locationFilter="selectedLocation"
                    >
                    </PedidoItem>
                </div>
                <div v-else >
                    <Loading />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PedidoItem from "@/components/PedidoItem.vue";
import Loading from "@/components/Loading.vue"
import * as dayjs from 'dayjs'

export default {
    name: 'QuerySettings',
    components: {
        PedidoItem,
        Loading
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
            comida0TotalQuantity: 0,
            comida0DeliveredQuantity: 0,
            comida1TotalQuantity: 0,
            comida1DeliveredQuantity: 0,
            totalMoney: 0,
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getPedidos(){
            this.comida0TotalQuantity = 0
            this.comida0DeliveredQuantity = 0
            this.comida1TotalQuantity = 0
            this.comida1DeliveredQuantity = 0
            console.log(this.selectedCustomer, this.selectedLocation, this.since, this.until, this.all)
            // const pedidos = await fetch(
            //     this.api + '/pedidos/api/?' + new URLSearchParams(
            //         {
            //             sincePicker: this.since, 
            //             untilPicker: this.until, 
            //             paid: this.paid, 
            //             delivered: this.delivered, 
            //             all: this.all, 
            //             location: this.selectedLocation, 
            //             customer: this.selectedCustomer.trim()
            //         }
            //     )
            // ).then(res => res.json()).catch(e => console.error(e))

            const pedidos = await fetch(this.api + '/pedidos/api/today').then(res => res.json()).catch(e => console.error(e))

            this.pedidos = pedidos
            // this.calculateTotalMoney()
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
        handlePedido(food0Count, food1Count, delivered){
            this.setTotalQuantity(food0Count, food1Count)
            this.setFirstCount(food0Count, food1Count, delivered)
        },
        setFirstCount(food0Count, food1Count, delivered){

            // if(delivered){
            //     don't do anything 
            // }

            if(!delivered){
                console.log('not delivered')
                if(this.comida0DeliveredQuantity || this.comida1DeliveredQuantity >= 0){
                    console.log( 'sumando ', food0Count, 'a comida 0')
                    this.comida0DeliveredQuantity = this.comida0DeliveredQuantity + food0Count
                    this.comida1DeliveredQuantity = this.comida1DeliveredQuantity + food1Count
                    console.log('Post sum comida0 por entregar: ', this.comida0DeliveredQuantity)
                    console.log('Post sum comida1 por entregar: ', this.comida1DeliveredQuantity)
                }
            }

        },
        setTotalQuantity(food0Count, food1Count){
            this.comida0TotalQuantity = this.comida0TotalQuantity + food0Count
            this.comida1TotalQuantity = this.comida1TotalQuantity + food1Count
        },
        setRemainingCount(delivered, food0Count, food1Count){

            if(!delivered){
                console.log('sumando')
                    console.log( this.comida0DeliveredQuantity, ' + ', food0Count, ' = ' )
                    this.comida0DeliveredQuantity = this.comida0DeliveredQuantity + food0Count
                    this.comida1DeliveredQuantity = this.comida1DeliveredQuantity + food1Count
                    console.log(this.comida0DeliveredQuantity)
            }
            
            if(delivered){
                console.log('restando')
                if( this.comida0DeliveredQuantity > 0 || this.comida1DeliveredQuantity > 0 ){
                    console.log('setting remaining count')
                    this.comida0DeliveredQuantity = this.comida0DeliveredQuantity - food0Count
                    this.comida1DeliveredQuantity = this.comida1DeliveredQuantity - food1Count
                }
            }
        },
        sendItemToLastPosition(e){
            const indexOfItemToMove = this.pedidos.findIndex( pedido => pedido.id === e)

            if( indexOfItemToMove == this.pedidos.length -1 ){
                console.log('Es el ultimo de la lista')
            }else{
                console.log('No es el ultimo de la lista')
                const itemToMove = this.pedidos.find( pedido => pedido.id === e )
                this.pedidos.splice(this.pedidos.length, 0, itemToMove)
                this.pedidos.splice(indexOfItemToMove, 1)
            }
        },
        handleDeliveryChange(id, delivered, food0Count, food1Count){
            // console.log(this.pedidos)
            this.sendItemToLastPosition(id)
            this.setRemainingCount( delivered, food0Count, food1Count)
        }
    },
    mounted(){
        console.log(this.comida0TotalQuantity)
        this.since = dayjs().format('YYYY-MM-DD')
        // this.until = dayjs().add(1, 'day').format('YYYY-MM-DD')
        this.getCalendar()
        this.getPedidos()
        this.getLocations()
    }
}
</script>