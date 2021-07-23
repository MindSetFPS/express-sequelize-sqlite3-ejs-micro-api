<template>
  <div class="home">
    <h1 class="title"> Crear nuevo pedido </h1>
    <form method="POST" >
        <label >  Nombre del cliente </label>
        <input type="text" placeholder="Nombre del Cliente" name="customerName"  />
        <label > Ubicacion  </label>
        <input type="text" placeholder="Nombre del Cliente" name="customerLocation"  />
        <div style="text-align: center;" >
            <div>
                <label   > <h2> { comida1.name } { pedido.food[0].name } </h2> </label>
                <input type="number" placeholder="cantidad" style="width: 40%" name="comida1Quantity" />
            </div>
            <div>
                <label  > <h2> { comida2.name } { pedido.food[1].name } </h2> </label>
                <input type="number" placeholder="cantidad" style="width: 40% ;" name="comida2Quantity"  />
            </div>
                <input type="submit" class="button blue mt-4 title" formaction="/" value="Crear Pedido"  />
        </div>
    </form>
    <h1 class="title" > Total: </h1>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

}
</script>

    Container
<style scoped>

</style>