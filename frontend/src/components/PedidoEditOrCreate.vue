<template>
  <div class="home container">
    <h1 class="title"> {{ pedidoId ? 'Editar Pedido' : 'Crear Pedido' }} </h1>
    <form>
        <label >  Nombre del cliente </label>
        <input type="text" placeholder="Nombre del Cliente" name="customerName" list="customers" v-model="selectedCustomer" required />
        <label > Ubicacion  </label>
        <input type="text" placeholder="Nombre del Cliente" name="customerLocation" list="locations" v-model="selectedLocation" required />
        <div style="text-align: center;" >
            <div>
                <label   > <h2 v-if="menu" > {{ menu.Comida1.name  }} </h2> </label>
                <input type="number" min="0" placeholder="cantidad" style="width: 40%" v-model="comida1Quantity" />
            </div>
            <div>
                <label  > <h2 v-if="menu" > {{  menu.Comida2.name }} </h2> </label>
                <input type="number" min="0" placeholder="cantidad" style="width: 40% ;" v-model="comida2Quantity"  />
            </div>
                <button class="button blue mt-4 title" @click.prevent="postPedido" > {{ pedidoId ? 'Actualizar' : 'Crear Pedido' }} </button>
        </div>
    </form>
    <h1 class="title" > Total: $ {{ (parseInt(comida1Quantity) + parseInt(comida2Quantity)) * 45 }}.00  </h1>

    <div v-if="res" >
      {{ res }}
    </div>

    <datalist id="customers" >
      <option v-for="customer in customers" :key="customer.id" :value="customer.name"> {{ customer.name }} </option>
    </datalist> 


    <datalist id="locations" >
      <option v-for="location in locations" :key="location.id" :value="location.name"> {{ location.name }} </option>
    </datalist> 

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'PedidoEditOrCreate',
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
       console.log(this.locations)
     }, 
    async getPedido(){
        const details = await fetch( this.api + `/pedidos/api/details/${this.pedidoId}` ).then( res => res.json()).catch()
        this.pedidoDetails = details
        
        this.selectedCustomer = details.customer.name
        this.selectedLocation = details.location.name
        this.comida1Quantity = details.food[0].pedidoItems.quantity
        this.comida2Quantity = details.food[1].pedidoItems.quantity

     },
    async postPedido(){
      console.log(this.selectedCustomer, this.selectedLocation, this.comida1Quantity, this.comida2Quantity)

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
      console.log(this.res)

      this.selectedCustomer = ""
      this.selectedLocation = ""
      this.comida1Quantity = ""
      this.comida2Quantity = ""

     }
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