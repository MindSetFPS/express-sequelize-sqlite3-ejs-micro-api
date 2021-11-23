<template> 
        <div :class="`w-full  transition ease-in ${[focus ? ' mt-0 duration-500 ' : ' -mt-3 ease-in-out duration-500' ]} `" >
            <label
                :class="
                    `transition  text-xs p-0
                    ${[focus ? 'opacity-100 duration-400 ease-in' : 'opacity-0 duration-100 ease-in' ]}`"
            >
                {{ placeholder }}
            </label>
            <div :class="`flex `" >
                <input
                    class="p-2 rounded-md w-full"
                    :placeholder="placeholder"
                    :type="inputType"
                    :value="modelValue"
                    :autocomplete="autocomplete"
                    :list="list"
                    @input="$emit('update:modelValue', $event.target.value)"
                    @focus="focus = true"
                    @blur="focus = false"
                />
                <div v-if="clearButton"  class="flex mx-2" >
                    <mdicon 
                        name="CloseCircle" 
                        class="text-gray-300 my-auto hover:text-red-300 transition"
                        @click="clearField"
                    />
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{
            focus: false,
        }
    },
    props: {
        placeholder: String,
        modelValue: String,
        inputType: String,
        autocomplete: String,
        list: String,
        clearButton: Boolean
    },
    methods: {
        clearField(){
            this.focus = false
            this.$emit('update:modelValue', '')
            console.log('cleaned')
        }
    }
};
</script>