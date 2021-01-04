<template>
    <div class="container">
        <h2>Vuex</h2>
        <form @submit.prevent="agregarTarea(tarea)">
            <input type="text" class="form-control mb-2" v-model="tarea">
            <b-button type="submit" class="mb-5">Agregar</b-button>
        </form>
        <ul>
            <li v-for="(item, index) in tareas" :key="index">
                {{item.id}} - {{item.nombre}}
                <!--Con :to="`/vuex/${item.id}`" le estoy indicando que me dirija a ese item con su id expecifico-->
                <b-button class="btn-sm btn-warning" :to="`/vuex/${item.id}`">Editar</b-button>
                <b-button class="btn-sm btn-danger" @click="eliminarTarea(item)">Eliminar</b-button>
                <hr>
            </li>
        </ul>
    </div>
</template>

<script>
// Importo la configuracion de firebase para utilizarlo aqui
import { db } from "@/plugins/firebase.js";
// Importamos el mapState y el mapActions
import { mapState, mapActions } from "vuex";

export default {
    // Utilizamos fetch, con esto lo que conseguimos es que haga las peticiones 
    // a la BBDD antes de que se cargue el template
    //fetch({store}) {
        //return db.collection('tareas').get()
            //.then(query => {
                // Creo una constante que esta vacia y cada vez que se recorre con 
                // el forEach los datos se guardan en esa constante que vienen de la BBDD
                //const tareas = []
                //query.forEach(element => {
                    //tareas.push(element.data())
                //});
                // Aqui mando todas las tareas a la store
                // En fetch siempre hay que hacer el return del commit
                //return store.commit('setTareas', tareas)
            //})
            //.catch(function(error) {
                //console.log(error);
            //});
    //}
    computed: {
        // Con esto ya tengo acceso a las tareas y ya las puedo pintar en el template (html)
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['agregarTarea', 'eliminarTarea'])
    },
    data() {
        return {
            tarea: ''
        }
    }
}
</script>