<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
// Importamos el Navbar para tenerlo en toda la aplicacion desde este archivo que es donde arranca nuestra
// aplicacion
import Navbar from '@/components/Navbar';

export default {
  components: {Navbar}
}
</script>