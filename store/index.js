// Importamos el archivo firebase.js de la carpeta plugins
import { db } from "@/plugins/firebase.js";

export const state = () => ({
    tareas: '',
    tarea: ''
});

// Con las mutations llenamos las tareas
export const mutations = {
    setTareas(state, payload) {
        state.tareas = payload;
    },
    setTarea(state, payload) {
        state.tareas.push(payload);
    },
    deleteTarea(state, payload) {
        // Cuando el item.id sea igual al payload.id que estamos mandando guardara ese index en la constante
        // que hemos creado. El findIndex es una propiedad de Javascrip que hace que recorra todas las tareas
        // que tenemos en nuestra BBDD
        const index = state.tareas.findIndex(item => item.id === payload.id);
        // Recibo el index que quiero eliminar que concuerde con nuestra condicion y borra ese item del array
        // con la funcion de Javascript splice y pongo el 1 porque solo quiero borrar un item
        state.tareas.splice(index, 1);
    },
    updateTarea(state, payload) {
        // Cuando el item.id sea igual al payload.id que estamos mandando guardara ese index en la constante
        // que hemos creado. El findIndex es una propiedad de Javascrip que hace que recorra todas las tareas
        // que tenemos en nuestra BBDD
        const index = state.tareas.findIndex(item => item.id === payload.id);
        state.tareas[index].nombre = payload.nombre;
    },
    setTareaIndividual(state, payload) {
        state.tarea = payload;
    }
};

// Con las actions hacemos los llamados a la BBDD
export const actions = {
    // TRAER LAS TAREAS DE FIREBASE
    nuxtServerInit({ commit }, { req }) {
        return db.collection('tareas').get()
            .then(query => {
                const tareas = []
                query.forEach(element => {
                    let tarea = element.data();
                    tarea.id = element.id;
                    tareas.push(tarea);
                });
                // En nuxtServerInit siempre hay que hacer el return del commit
                return commit('setTareas', tareas);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    // AGREGAR TAREA
    // Utilizo el async porque voy hacer peticiones http
    async agregarTarea({ commit }, payload) {
        try {
            const doc = await db.collection('tareas').add({
                nombre: payload,
                fecha: new Date()
            });
            commit('setTarea', { nombre: payload, id: doc.id });
        } catch (error) {
            console.log(error);
        }
    },
    // ELIMINAR TAREA
    eliminarTarea({ commit }, payload) {
        db.collection("tareas").doc(payload.id).delete()
            .then(function() {
                console.log("La tarea fue eliminada");
                commit('deleteTarea', payload);
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
    },
    // EDITAR TAREA
    editarTarea({ commit }, payload) {
        db.collection('tareas').doc(payload.id).update({
                nombre: payload.nombre
            })
            .then(() => {
                console.log('Tarea Editada');
                commit('updateTarea', payload)
                    // Esto es para que al pulsar el boton de editar me rediriga a la vista de vuex
                this.app.router.push('/vuex');
            })
            .catch(e => {
                console.log(e);
            });
    }
};