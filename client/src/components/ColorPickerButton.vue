<template>
    <v-menu offset-y @select="onSelected()"  :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn fab  small :color="value" v-on="on"  class="ma-2">
              <v-icon color="white">mdi-eyedropper</v-icon>
          </v-btn>
        </template>
        <v-color-picker :value="value" @input="handleColor" hide-canvas 
         show-swatches class="mx-auto" />
      </v-menu>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            color: this.value,
        }
    },
    methods: {
        handleColor(e) {
            this.color = e;
            this.$emit('input', this.color);
        }
    },
}
</script>