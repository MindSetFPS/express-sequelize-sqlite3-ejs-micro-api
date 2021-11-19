<template>
  <div class="">
    <page-title :text="pedidoId ? 'Editar Pedido' : 'Crear Pedido'" > 
    </page-title>
    <div v-if="menu.ok" >
      <form>
        <div class="w-full mt-2" >
          <input-field inputType="text" placeholder="Nombre del cliente" name="customerName" list="customers" v-model="selectedCustomer" requiered />
        </div>
          <input-field inputType="text" placeholder="Ubicacion" name="customerLocation" list="locations" v-model="selectedLocation" required />
          
          <div style="text-align: center;" class="flex justify-evenly items-end "  >
              <div class="px-2 w-5/12 " >
                  <label   > <h2 v-if="menu" > {{ menu.calendar.Comida1.name  }} </h2> </label>
                  <input-field  inputType="number" min="0" placeholder="Cantidad" v-model="comida1Quantity" />
              </div>
              <div class="px-2 w-5/12 " >
                  <label  > <h2 v-if="menu" > {{  menu.calendar.Comida2.name }} </h2> </label>
                  <input-field  inputType="number" min="0" placeholder="Cantidad" v-model="comida2Quantity" />

              </div>
              <h1 class=" text-xl font-bold text-center w-3/12 " > $ {{ (parseInt(comida1Quantity) + parseInt(comida2Quantity)) * 45 }}.00  </h1>
          </div>

          <div class="mt-2" >
            <button class="rounded-md bg-blue-200 p-2 m-auto w-full" @click.prevent="buttonHandler" > {{ pedidoId ? 'Actualizar' : 'Crear Pedido' }} </button>
          </div>
      </form>

      <datalist id="customers" >
        <option v-for="customer in customers" :key="customer.id" :value="customer.name"> {{ customer.name }} </option>
      </datalist> 


      <datalist id="locations" >
        <option v-for="location in locations" :key="location.id" :value="location.name"> {{ location.name }} </option>
      </datalist> 
    </div>
    <div v-if="!menu.ok" class="container" >
       <error-alert :link="menu.link" :message="menu.message" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ErrorAlert from './ErrorAlert.vue'
import PageTitle from './PageTitle.vue'
import InputField from './InputField.vue'

import { io } from 'socket.io-client'
 
export default {
  name: 'PedidoEditOrCreate',
  components: {
    ErrorAlert,
    PageTitle,
    InputField
  },
  props: ['pedidoId'],
  data(){
    return{
      res: '',
      menu: '',
      customers: '',
      selectedCustomer: '',
      locations: '',
      selectedLocation: '',
      comida1Quantity: 0,
      comida2Quantity: 0,
      api: process.env.VUE_APP_API,
      socket: '',
    }
  },
  methods: {
    async getMenu(){
      const menu = await fetch(this.api + '/calendar/api/list').then(res => res.json()).catch(e => console.error(e))
      console.log(menu)
      this.menu = menu
    },
    async getCustomers(){
       this.customers = await fetch( this.api + '/customers').then( res => res.json() ).catch(e => console.error(e))
       console.log(this.customers)
     },
    async getLocations(){
       this.locations = await fetch( this.api + '/pedidos/api/locations').then( res => res.json() ).catch(e => console.error(e))
     }, 
    async getPedido(){
        const details = await fetch( this.api + `/pedidos/api/details/${this.pedidoId}` ).then( res => res.json()).catch()
        this.pedidoDetails = details.data
        
        this.selectedCustomer = details.data.customer.name
        this.selectedLocation = details.data.location.name
        this.comida1Quantity =  details.data.food[0].pedidoItems.quantity
        this.comida2Quantity =  details.data.food[1].pedidoItems.quantity

     },
    async postPedido(){
      console.log('Creando un nuevo pedido.')

      const res = await fetch( this.api + '/pedidos/api/create', {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({
              comida1Quantity: this.comida1Quantity,
              comida2Quantity: this.comida2Quantity,
              customerName: this.selectedCustomer,
              customerLocation: this.selectedLocation
          })
      })
      .then(res => res.json())
      .catch(e => console.error(e))
      this.res = res

      this.selectedCustomer = ""
      this.selectedLocation = ""
      this.comida1Quantity = 0
      this.comida2Quantity = 0

    },
    async updatePedido(){
      console.log('Actualizando pedido')
      const res = await fetch( this.api + '/pedidos/api/update/' + this.pedidoId, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            comida1Quantity: this.comida1Quantity,
            comida2Quantity: this.comida2Quantity,
            customerName: this.selectedCustomer,
            customerLocation: this.selectedLocation
        })
      }).then(res => res.json()).catch(e => console.error(e))
      this.res = res
      this.$router.push('/pedidos')
    },
    buttonHandler(){
      if(!this.pedidoId){
        this.postPedido()
        this.socket.emit("NewPedido")
        return
      }
      this.updatePedido()
      this.socket.emit("NewPedido")
    },
  },
  created(){
    this.socket = io(this.api)

    this.socket.on("connect", ()=>{
      console.log("connected")
    })

  },
  mounted(){
    if(this.pedidoId){
      this.getPedido()
    }
    this.getMenu()
    this.getCustomers()
    this.getLocations()
  }

}
</script>