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
import Nav from "../components/Nav.vue";
import Menu from "../components/Menu.vue";
import axios from "axios";

export default {
  name: "Layout",
  components: { Menu, Nav },
  async mounted() {
    try {
      const { data } = await axios.get("sessions");
      
      await this.$store.dispatch("setUser", data.user);
    } catch (e) {
      await this.$router.push("/login");
    }
  },
};
</script>