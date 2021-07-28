<template>
    <div>
        <h1 class="title" > Calendario </h1>
            <div  class="mb-extra" >

                <div class="card mt-4 mb-4" v-for="calendar in calendars" :key="calendar.id" >
                    <h1 style="text-align: center;"  >  {{ 'Hoy ? ' }} </h1> 
                    <h1 style="text-align: center;" >{{ calendar.date }} </h1>
                    <div class="flex" style="justify-content: space-between;" >
                        <div>
                            <div>
                                <h2 class="subtitle" style="text-align: left;" > {{ calendar.Comida1.name }}</h2>
                            </div>
                            <div>
                                <h2 class="subtitle" style="text-align: left;" > {{calendar.Comida2.name}}</h2>
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
    name: 'CalendarList',
    data() {
        return{
            api: process.env.VUE_APP_API,
            calendars: ''
        }
    },
    methods: {
        async getCalendars(){
            const list = await fetch( this.api + '/calendar/api/all' ).then(res => res.json()).catch(e => console.error(e))
            this.calendars = list

            console.log(this.calendars)
        }

    },
    mounted(){
        this.getCalendars()
    }
}
</script>