<template>
    <div class=" w-full " >
        <page-title text="Calendario" />
            <div v-if="calendars && calendars.length > 0 " class="mt-3" >
                <Dialog text="Crear nuevo calendario" >
                    <calendar />
                </Dialog>

                <div 
                :class="`bg-white w-full rounded-md p-3 m-3 ${ getDateAndTime(calendar.createdAt) == getDateAndTime(now) ? 'ring-4 ring-gray-400 scale-105 transform-gpu' : '' } `"
                    v-for="calendar in calendars" 
                    :key="calendar.id" 
                >
                    <router-link :to="/calendar/ + calendar.id" class="font-medium text-xl text-left hover:underline " >{{ getDateAndTime(calendar.createdAt) }} </router-link>
                    
                    {{  }}

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
                            <button class="rounded-md bg-blue-100 text-blue-500 p-2 mr-2 " > Editar </button>
                            <form>
                                <button class="rounded-md bg-red-100 p-2 text-red-500" @click="deleteCalendar(calendar.id)" > Borrar </button>  
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div v-else >
                <calendar />
            </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import Dialog from '../components/Dialog.vue'
import Calendar from '../components/CalendarCreate.vue'
import dayjs from 'dayjs'

export default {
    name: 'CalendarList',
    components: {
        PageTitle,
        Dialog,
        Calendar
    },
    data() {
        return{
            api: process.env.VUE_APP_API,
            calendars: '',
            now: dayjs()
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
        },
        getDateAndTime(d){
            return dayjs(d).format('dddd DD MMMM YYYY')
        }

    },
    mounted(){
        this.getCalendars()
    }
}
</script>