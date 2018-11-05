<template>
  <v-container>
    <v-layout
        text-xs-center
        wrap
    >
      <v-flex
          mb-5
          xs12
      >
        <h2 class="headline font-weight-bold mb-3">About</h2>
        This is an example project how to use the <strong>vue-gapi</strong> plugin. It makes use of an extended version
        that supports retrieving an offline grant code which can be used to access Google API's offline.
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "About"
};
</script>
