<template>
    

    <div>

        <h1 class="title" >Nuevo platillo</h1>



                <form method="POST"  >
                    <h2> Anadir un platillo al menu  </h2>
                    <input class="mt-2" name="name" placeholder="Nombre (Obligatorio)" value="" required />
                    <input class="mt-2" name="description" placeholder="Descripcion (Opcional) " value="" />
                    <input class="mt-2" name="link" placeholder="Link (Opcional) " value="" />

                    <input class="mt-2 green" type="submit" value="Enviar" formaction="" />
                </form>



    </div>

</template>

<script>
export default {
    name: 'Food'
}
</script>