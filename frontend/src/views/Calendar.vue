<template>
    

    <div>
    
        <h1 class="title"> Crear Menu del Dia </h1>

        <form autocomplete="off" method="POST"   >
            
            <label > Elige un platillo.  </label>
            <input type="text" name="comida1" placeholder="Nombre del platillo" autocomplete="off" list="menudata" />

            <label > Elige un platillo mas.</label>
            <input type="text" name="comida2" placeholder="Nombre del platillo" autocomplete="off" list="menudata"  />
        
            <label > En que fecha estara disponible este menu? </label>
            <input type="date" name="date"    />
            
            <input type="submit" class="button blue mt-4 title" value="Crear Menu" formaction="/calendar/create-menu" />
        </form>


        <datalist id="menudata" >
                <option> { food.name }} </option>
        </datalist>

    </div>
    
</template>

<script>
export default {
    name: 'Calendar'
}
</script>