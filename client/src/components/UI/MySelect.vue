<template>
  <select :sortValue="sortValue" @change="changeOption">
    <option disabled selected="selected" value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    sortValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    changeOption(event) {
      this.$emit('update:sortValue', event.target.value);
    }
  }
}
</script>

<style>
  
</style>