<template>
    <div v-if="display" @keydown.esc="invertDiplasy" >
        <div class="fixed z-10 p-4 transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-11/12 md:w-auto " >
            <slot></slot>
        </div>
        <div
            @click="invertDiplasy"
            class="bg-opacity-20 bg-black w-screen h-screen fixed left-0 top-0" 
        >
        </div>
    </div>
    <div v-else >
        <button
            @click="invertDiplasy" 
            class="fixed right-0 bottom-0 bg-blue-300 hover:bg-blue-500 hover:text-white transition rounded-lg p-3 m-2 shadow-xl   "
        >
            {{ text }}
        </button>
    </div>
</template>

<script>

export default {
    name: 'FoodCreate',
    props: ["text"],
    data(){
        return{
            res: '',
            api: process.env.VUE_APP_API,
            name: '',
            description: '',
            link: '',
            display: false,
        }
    },
    methods: {
        async postFood(){
            const res = await fetch( this.api + '/food/api/create', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    name: this.name,
                    description: this.description,
                    link: this.link
                })
            })
            .then(res => res.json())
            .catch(e => console.error(e))

            console.log(res)
            this.name = ''
            this.description = ''
            this.link = ''
        },
        invertDiplasy(){
            this.display = !this.display
        }
    },
}
</script>