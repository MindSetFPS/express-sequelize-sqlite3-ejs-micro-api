<template>
    

    <div>

        <h1 class="title" > Menu </h1>

            <div class="" style="overflow-y: scroll; height: 85vh; padding-left: 20px; padding-right: 20px "  >

                <div class="card mt-4 mb-4 " >
                    <div class="flex-resizable " >
                        <h1 class="">  { food.name }}   </h1>
                    </div>
                    <p> { food.description }} </p>
                    <a href="{ food.link }}" target="_blank" rel="noopener noreferrer" > { food.link }} </a>
                    <div class="flex mt-2" >
                        <form method="GET" class="mx-1" >
                            <input type="submit" formaction="/food/edit/{food.id}}" class="blue secondary" value="Editar">
                        </form>
                        <form method="GET" class="mx-1" >
                            <input type="submit" formaction="/food/delete/{food.id}}" class="love secondary" value="Borrar">
                        </form>
                    </div>
                </div>

            </div>




    </div>



</template>

<script>
export default {
    name: 'FoodList'
}
</script>