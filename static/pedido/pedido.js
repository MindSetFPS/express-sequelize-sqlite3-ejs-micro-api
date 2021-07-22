const app = Vue.createApp({
    data(){
        return{

        }
    },


})


app.component('query-settings-component', {
    data(){
        return{
            pedidos: [],
            locations: [],
            selectedLocation: '',
            selectedCustomer: '',
            comida1Name: '',
            comida1Quantity: 0,
            comida2Name: '',
            comida2Quantity: 0,
            since: '',
            until: '',
            customer: '',
            delivered: '',
            paid: '',
            menu: '',
            all: '',
        }
    },
    methods: {
        async getPedidos(){
            console.log(this.selectedLocation)
            this.comida1Quantity = 0
            this.comida2Quantity = 0
            fetch('/pedidos/api/?' + new URLSearchParams({sincePicker: this.since, untilPicker: this.until, paid: this.paid, delivered: this.delivered, all: this.all, location: this.selectedLocation, customer: this.selectedCustomer.trim() }))
            .then(res => res.json())   
            .then(pedidos => this.pedidos = pedidos)
            .then(console.log(this.pedidos))

            .then( () => {
                this.pedidos.forEach((pedido) => {
                    this.comida2Quantity = this.comida2Quantity + pedido.food[0].pedidoItems.quantity  
                    this.comida1Quantity = this.comida1Quantity + pedido.food[1 ].pedidoItems.quantity  

                    console.log(this.comida1Quantity)
               })
            })

            .catch(err => console.error(err))
            .finally( () => console.log(this.pedidos))

            // Consulting locations with the api
            fetch('/pedidos/api/locations')
            .then(res => res.json())
            .then(locations => this.locations = locations)
            .catch(err => console.error(err))
            console.log(this.locations)

            fetch('/customers')
            .then( res => res.json())
            .then( customers => this.customers = customers )
            .catch( e => console.error(e))
            .finally( console.log(this.customers ))

            fetch('/calendar/api/list')
            .then(res => res.json())
            .then(menu => this.menu = menu )
            .catch(err => console.error(err))
            .finally( () => {
                this.comida1Name = this.menu.Comida1.name
                this.comida2Name = this.menu.Comida2.name
            })
        },

    },
    mounted(){
        this.since = dayjs().format('YYYY-MM-DD')

        this.until = dayjs().add(1, 'day').format('YYYY-MM-DD')

        this.getPedidos()
    },
    template: `
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
                    <option v-for="customer in customers"  > {{ customer.name }} </option>
                </datalist>
                                
                <p class="list-heading">Lugar</p>
                <select class="small" name="location" v-model="selectedLocation" >
                    <option value=""></option>
                    <option v-for="location in locations"  > {{ location.name }} </option>
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
                <div class="list-heading "  >
                {{ this.comida1Name  }}
                </div>
                <div class="list-heading" >
                {{ this.comida1Quantity }}
                </div>
                
            </div>
            <div class="list-heading  "     >
                
                <div class="list-heading"  >
                    {{ this.comida2Name  }}
                </div>
                
                <div class="list-heading" >
                    {{ this.comida2Quantity }}

                </div>
            </div>   
            <div class="list-heading">
                <p class="list-heading" >Total:</p>
                <p  class="list-heading" >
                    $ {{ (this.comida1Quantity + this.comida2Quantity) * 45   }}
                </p>
            </div>
        </div> 
    </form>
    
    <div style=" height: 70vh; " >
    <div style="overflow-y: scroll; height: 69vh;" >
            
            <pedido-item 
            v-for="pedido in pedidos"
            :pedido="pedido"
            :key="pedido.id"
            >
            </pedido-item>
    
    </div>
</div>
    

    
    
    `
})

app.component('pedido-item', {
    data(){
        return{
            delivered: this.pedido.delivered ,
            paid: this.pedido.paid ,
            all: '',
        }
    },
    props: ["pedido"],
    template: `


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
                    <a :href="'/pedidos/details/' + pedido.id" >
                        Detalles
                    </a>
                </button>
            </div>

            <h3>{{ pedido.food[0].pedidoItems.quantity }}</h3>
            <h3>{{ pedido.food[1].pedidoItems.quantity }}</h3>
   
        </div>
    </div>
    `,
    methods: {
        updatePedido(id){
            console.log(id)
            const url = '/pedidos/api/update/' + id
            console.log(url)
            data = {
                delivered: this.delivered,
                paid: this.paid
            }

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
})

app.mount("#app")