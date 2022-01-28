<template>
  <v-app>
    <Nav />

    <div class="container-fluid">
      <div class="row">
        <Menu />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="table-responsive">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import Nav from "../components/Nav.vue";
import Menu from "../components/Menu.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import axios from "axios";

export default {
  name: "Layout",
  components: { Menu, Nav },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(async () => {
      try {
        //const { data } = await axios.get("sessions");
        const user = {
          _id: "sasas",
          name: "elvin",
          lastName: "sanchez",
          email: "emsanchez@gmail.com",
        };

        await store.dispatch("setUser", user);
      } catch (e) {
        //await this.$router.push("/login");
        await store.dispatch("setUser", null);
        console.log(e);
      }
    });
  },
};
</script>