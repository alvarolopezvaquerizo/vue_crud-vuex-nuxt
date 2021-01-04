<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h1>{{articulo.title}}</h1>
                <p class="small">Autor: {{articulo.nombreAutor}}</p>
                <p>{{articulo.body}}</p>
                <nuxt-link to="/blog" class="btn btn-primary">Atras</nuxt-link>
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
        }
    },
    async created() {
    },
    // Obtenemos los datos de la API. Ponemos async porque vamos hacer una peticion html.
    // Siempre que utilizamos async hay que poner el await y al utilizar este tenemos que
    // hacer uso del try y catch para pintar los errores.
    // En el asyncData el this no funciona
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        try {
            // Me traigo de la API el articulo
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
            // Creo el articulo
            const articulo = res.data;
            //console.log('Articulo: ', articulo);

            // Con esto me traigo de la API el nombre del autor
            const resAutor = await axios.get(`https://jsonplaceholder.typicode.com/users/${res.data.userId}`);
            //console.log('Autor: ', resAutor.data);
            articulo.nombreAutor = resAutor.data.name;
            //console.log(articulo);
            return {articulo};
        } catch (error) {
            console.log(error);
            return {error: error};
        }
    }
}
</script>