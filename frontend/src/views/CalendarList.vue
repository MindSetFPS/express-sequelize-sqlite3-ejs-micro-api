<template>
    <div class=" w-full " >
        <h1 class="text-3xl font-bold" > Calendario </h1>
            <div v-if="calendars && calendars.length > 0 " class="mt-3" >

                <div class=" bg-white w-full text-center rounded-md p-3 "   v-for="calendar in calendars" :key="calendar.id" >
                    <h1 class="font-medium text-xl" >{{ calendar.date }} </h1>
                    <div class="" >
                        <div class="flex justify-evenly text-lg " >
                            <div>
                                <h2 class="" > {{ calendar.Comida1.name }}</h2>
                            </div>
                            <div>
                                <h2 class="" > {{calendar.Comida2.name}}</h2>
                            </div>
                        </div>
                        <div class="flex justify-center" >
                            <button class="     rounded-md bg-blue-100 text-blue-500 p-2 mr-2 " > Editar </button>
                            <form>
                                <button class="rounded-md bg-red-100 p-2 text-red-500" @click="deleteCalendar(calendar.id)" > Borrar </button>  
                            </form>
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