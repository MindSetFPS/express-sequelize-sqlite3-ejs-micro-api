<template>
    <div  >
        <div class="flex items-end" >
            <page-title text="Pedidos" /> 
            <clock />
        </div>

        <Dialog text="Crear nuevo pedido" v-if="calendar.ok && pedidos && pedidos.length" >
            <pedido-edit-or-create  />
        </Dialog>

        <div class="mx-auto md:px-24 " v-if="calendar.ok && pedidos && pedidos.length > 0 " >
                <div class="flex">
                    <div class="w-1/2" >
                        <label for="since">Since</label>
                        <input class=" block" type="date" name="sincePicker" id="since"  v-model="since" >
                    </div>
                    <div class="w-1/2" >
                        <label for="until">Until</label>
                        <input class=" block" type="date" name="untilPicker" id="until" v-model="until" >
                    </div>
                </div>

                <input-field 
                    placeholder="Buscar un cliente" 
                    name="customer" 
                    v-model="selectedCustomer" 
                    autocomplete="off" 
                    :clearButton="true" 
                />
                        
                <button @click="getPedidos" class="rounded-md bg-red-200 p-2 w-full mt-2 text-red-600" >Buscar pedidos y arreglar este boton </button>

                <div class="flex mt-3 text-xs w-full justify-between" >
                    <!-- TITULOS -->
                    <div class=" w-2/12 " >
                        <p class="">Lugar</p>
                        <select class="" name="location" v-model="selectedLocation" v-if="locations" >
                            <option value=""></option>
                            <option v-for="location in locations" :key="location.id" >  {{ location.name }} </option>
                        </select>
                        <div v-else >
                            <Loading />
                        </div>
                    </div>
                    <div class="w-1/5">
                        <div class="" >   
                            <p  >Entregado</p>
                            <select name="delivered" id="delivered" class="" v-model="delivered"  > 
                                <option value="1">Si</option>
                                <option value="0">No</option>
                                <option value="">Indiferente</option>
                            </select>   
                        </div>            
                        <div class="flex" >
                            <p>Pagado</p>
                            <input type="checkbox" name="paid" id="paid" class="" v-model="paid" >
                        </div>
                        <div class="flex" >
                            <p>Todos</p>
                            <input type="checkbox" name="all" id="all" class="" v-model="all" >
                        </div>
                    </div>
                    <div class="w-1/5">
                        <div class="" v-if="calendar"  >
                        {{ calendar.calendar.Comida1Id > calendar.calendar.Comida2Id ? calendar.calendar.Comida2.name : calendar.calendar.Comida1.name }}
                        </div>
                        <div v-else >
                            <Loading />
                        </div>
                        <div class="flex text-xl " >
                            <div class="" >
                                {{ this.comida0DeliveredQuantity }}
                            </div>
                            /
                            <div class="" >
                            {{ this.comida0TotalQuantity }}
                            </div>
                        </div>
                    </div>
                    <div class="w-1/5">
                        <div class="" v-if="calendar" >
                            {{ calendar.calendar.Comida2Id > calendar.calendar.Comida1Id ? calendar.calendar.Comida2.name : calendar.calendar.Comida1.name  }}
                        </div>
                        <div v-else >
                            <Loading />
                        </div>
                        <div class="flex text-xl " >
                            <div class="" >
                                {{ this.comida1DeliveredQuantity }}
                            </div>
                            /
                            <div class="" >
                            {{this.comida1TotalQuantity}}
                            </div>
                        </div>
                    </div>   
                    <div class="w-1/12">
                        <p class="" >Total:</p>
                        <p  class="" >
                            $ {{ totalMoney }}
                        </p>
                </div>
                </div> 
            <div>
                <div>    
                    <div v-if="pedidos" >    
                        <PedidoItem
                            v-for="pedido in pedidos"
                            
                            :pedidoId="pedido.id"
                            :key="pedido.id"

                            :customer="pedido.customer.name"
                            :location="pedido.location.name"
                            v-bind:paid="pedido.paid"
                            v-bind:delivered="pedido.delivered"
                            :created-at="pedido.createdAt"

                            :comida0="pedido.food[0].pedidoItems.quantity"
                            :comida1="pedido.food[1].pedidoItems.quantity"

                            :customerFilter="selectedCustomer"
                            :locationFilter="selectedLocation"
                            
                            @change-paid="invertPaidState"
                            @change-delivered="handleDeliveredChange"
                        />
                    </div>
                    <div v-else >
                        <Loading />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="calendar.ok && pedidos && !pedidos.length" >
            <pedido-edit-or-create />
        </div>
        <div v-if="!calendar.ok" >
            <error-alert link="/calendar/list" message="Primero Crea un Menu" />
        </div>
    </div>
</template>

<script>
import Clock from './Clock.vue'
import ErrorAlert from './ErrorAlert.vue'
import Dialog from './Dialog.vue'
import InputField from './InputField.vue';
import Loading from "./Loading.vue"
import PageTitle from './PageTitle.vue'
import PedidoItem from './PedidoItem.vue'
import PedidoEditOrCreate from './PedidoEditOrCreate.vue'

import * as dayjs from 'dayjs'
import { io } from 'socket.io-client'

export default {
    name: 'QuerySettings',
    components: {
        Clock,
        Dialog,
        ErrorAlert,
        InputField,
        Loading,
        PedidoItem,
        PageTitle,
        PedidoEditOrCreate
    },
    data(){
        return{
            all: '', api: process.env.VUE_APP_API, calendar: '', customers: '', locations: '', since: '', until: '', paid: '',delivered: '',
            selectedLocation: '', selectedCustomer: '', pedidos: undefined, comida0TotalQuantity: 0, comida0DeliveredQuantity: 0,
            comida1TotalQuantity: 0, comida1DeliveredQuantity: 0, totalMoney: 0,
        }
    },
    watch: {
        selectedLocation(){
            this.loopPedidos()
        }
    },
    methods: {
        async getPedidos(){
            /////////////////////Fetch with parameters////////////////////
            // const pedidos = await fetch(                             //
            //     this.api + '/pedidos/api/?' + new URLSearchParams(   //
            //         {                                                //
            //             sincePicker: this.since,                     //
            //             untilPicker: this.until,                     //
            //             paid: this.paid,                             //
            //             delivered: this.delivered,                   //
            //             all: this.all,                               //
            //             location: this.selectedLocation,             //
            //             customer: this.selectedCustomer.trim()       // 
            //         }                                                //
            //     )                                                    //
            // ).then(res => res.json()).catch(e => console.error(e))   //
            //////////////////////////////////////////////////////////////
            
            this.comida0TotalQuantity = 0
            this.comida0DeliveredQuantity = 0
            this.comida1TotalQuantity = 0
            this.comida1DeliveredQuantity = 0

            const pedidos = await fetch(this.api + '/pedidos/api/test')
                .then((res) => res.json())
                .catch((e) => {
                    console.error(e)
                    return {ok: false}
                })
            console.log('pedidos: ', pedidos)

            if(pedidos.ok){
                console.log('request ok')
                localStorage.setItem('pedidos', JSON.stringify(pedidos.data))
                this.pedidos = pedidos.data
            }

            if(!pedidos.ok){
                console.log('request bad')
                this.pedidos = JSON.parse(localStorage.getItem('pedidos'))
            }

            console.log(this.pedidos)

            this.loopPedidos()

        },
        async getCalendar(){
            this.calendar = await fetch(this.api + '/calendar/api/list')
            .then((res) => res.json())
            .catch((e) => {
                    console.error(e)
                    console.log('offline')
                    return JSON.parse(localStorage.getItem('calendar'))
            })

            console.log(this.calendar)

            // if(calendar.ok){
            //     console.log('canlendar online')
            //     this.calendar = calendar
            //     localStorage.setItem('calendar', JSON.stringify(calendar))
            // }
            // if(typeof calendar.ok === 'undefinded'){
            //     console.log('canlendar offline')
            //     this.calendar = JSON.parse(localStorage.getItem('calendar'))
            // }

            console.log('calendar: ' , this.calendar)
        },
        async getCustomers(){
            const customers = await fetch(this.api + '/customer/all').then(res => res.json()).catch(e => console.error(e))
            this.customers = customers
        },
        async getLocations(){
            const locations = await fetch( this.api + '/pedidos/api/locations').then( res => res.json() ).catch(e => console.error(e))
            this.locations = locations
        },
        loopPedidos(){
            console.log('contando')
            let totalComida0 = 0;
            let remainingComida0 = 0;
            let totalComida1 = 0;
            let remainingComida1 = 0;
            
            console.log(this.selectedLocation)
            for( let pedido of this.pedidos){
                if(this.selectedLocation === pedido.location.name || this.selectedLocation == ''){
                    if(!pedido.delivered){
                        remainingComida0 = remainingComida0 + pedido.food[0].pedidoItems.quantity
                        remainingComida1 = remainingComida1 + pedido.food[1].pedidoItems.quantity
                    } 
                    totalComida0 = totalComida0 + pedido.food[0].pedidoItems.quantity
                    totalComida1 = totalComida1 + pedido.food[1].pedidoItems.quantity
                }
            }
            
            this.comida0TotalQuantity = totalComida0
            this.comida0DeliveredQuantity = remainingComida0

            this.comida1TotalQuantity = totalComida1
            this.comida1DeliveredQuantity = remainingComida1

            this.totalMoney = ((this.comida0TotalQuantity - this.comida0DeliveredQuantity ) + (this.comida1TotalQuantity - this.comida1DeliveredQuantity)) * 45
            console.log('contado terminado')

        },
        handleDeliveredChange(pedidoId){
            this.invertDeliveredState(pedidoId)
            this.sendItemToLastPosition(pedidoId)
            this.loopPedidos()

        },
        invertDeliveredState(pedidoId){
            const pedidoPosition = this.pedidos.findIndex(pedido => pedido.id === pedidoId)
            this.pedidos[pedidoPosition].delivered = !this.pedidos[pedidoPosition].delivered
        },
        invertPaidState(pedidoId){
            const pedidoPosition = this.pedidos.findIndex(pedido => pedido.id === pedidoId)
            this.pedidos[pedidoPosition].paid = !this.pedidos[pedidoPosition].paid
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
        async getSocket(){
            const socket = io(this.api)
            socket.on('connect', ()=> {
                console.log('connected to server via socket.io!')
            })
            socket.on("UpdatePedidos", ()=>{
                console.log("Otro cliente creo un nuevo pedido, actualizando lista de pedidos en este cliente.")
                this.getPedidos()
            })
        }
    },
    mounted(){
        this.since = dayjs().format('YYYY-MM-DD')
        // this.until = dayjs().add(1, 'day').format('YYYY-MM-DD')
        this.getCalendar()
        this.getPedidos()
        this.getLocations()
        this.getSocket()
    }
}
</script>