<template>
    <div>



        <h1 class="title" > Calendario </h1>

            <div class="mb-extra" >
                <div class="card mt-4 mb-4" >
                    <h1 style="text-align: center;"  >  Hoy </h1> 

                    <h1 style="text-align: center;" >{ menu.fecha }} </h1>
                    
                    <div class="flex" style="justify-content: space-between;" >
                        <div  >
                            <div>
                                <h2 class="subtitle" style="text-align: left;" > {menu.comida1.name}}</h2>
                            </div>
                            <div>
                                <h2 class="subtitle" style="text-align: left;" > {menu.comida2.name}}</h2>
                            </div>
                        </div>
                        <div class="stack" >
                            <form>
                                <input class="button secondary love" value="Borrar" formaction="/calendar/delete/{{menu.id}}" formmethod="GET" type="submit" >  
                            </form>
                            <button class="button secondary blue" > Editar </button>
                        </div>
                    </div>
                    
                </div>
            </div>

    </div>
</template>

<script>
export default {
    name: 'CalendarList'
}
</script>