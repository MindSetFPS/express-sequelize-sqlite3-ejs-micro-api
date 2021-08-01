<template>
    <div class="container" >
        <h1 class="title" > Calendario </h1>
            <div v-if="calendars && calendars.length > 0 " class="mb-extra" >

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
                                <button class="button secondary love" @click="deleteCalendar(calendar.id)" > Borrar </button>  
                            </form>
                            <button class="button secondary blue" > Editar </button>
                        </div>
                    </div>
                    
                </div>

            </div>

            <div v-else >
                <error-alert :message="calendars.message" :link="calendars.link" />
            </div>
    </div>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert.vue'
export default {
    name: 'CalendarList',
    components: {
        ErrorAlert
    },
    data() {
        return{
            api: process.env.VUE_APP_API,
            calendars: '',
        }
    },
    methods: {
        async getCalendars(){
            const list = await fetch( this.api + '/calendar/api/all' ).then(res => res.json()).catch(e => console.error(e))
            this.calendars = list

            console.log(this.calendars)
        },
        async deleteCalendar(calendarId){
            const toDelete = this.api + '/calendar/api/delete/' + calendarId
            console.log(toDelete)

            const deleteCalendar = await fetch(toDelete).then(res => res.json()).catch(e => console.error(e))

            if (deleteCalendar.ok){
                this.getCalendars()
            }
        }

    },
    mounted(){
        this.getCalendars()
    }
}
</script>