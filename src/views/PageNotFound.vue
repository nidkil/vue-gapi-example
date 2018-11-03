<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex class="text-xs-center">
        <p>
          <img
              src="@/assets/sad.svg"
              style="width:30vw; max-width:150px;"
          >
        </p>
        <p class="text-faded">Sorry the page you are looking for was not found <strong>(404)</strong></p>
        <v-btn
            color="secondary white--text"
            style="width:300px;"
            @click="$router.push('/')"
        >
          Go to home page
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
