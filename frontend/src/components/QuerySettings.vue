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

export default {
    name: 'QuerySettings',
    components: {
        PedidoItem
    }
}
</script>