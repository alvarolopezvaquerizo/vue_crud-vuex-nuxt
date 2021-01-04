<template>
    <div class="container mt-5">
        <div class="card my-2" v-for="(item, index) in articulos" :key="index">
            <div class="card-body">
                <!--Hago que cuando pinche en el titulo me lleve a ese articulo para eso empleo:
                <nuxt-link :to="`blog/${item.id}`">
                    <h1>{{item.title}}</h1>
                </nuxt-link>-->
                <nuxt-link :to="`blog/${item.id}`">
                    <h1>{{item.title}}</h1>
                </nuxt-link>
                <p>{{item.body}}</p>
            </div>
        </div>
    </div>
</template>

<script>
// Importamos axios para consumir una API
import axios from 'axios';

export default {
    data() {
        return {
            articulos: []
        }
    },
    // Obtenemos los datos de la API. Ponemos async porque vamos hacer una peticion html.
    // Siempre que utilizamos async hay que poner el await y al utilizar este tenemos que
    // hacer uso del try y catch para pintar los errores.
    async created() {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
            //console.log(res.data);
            this.articulos = res.data;
        } catch (error) {
            console.log(error);
        }
    }
}
</script>