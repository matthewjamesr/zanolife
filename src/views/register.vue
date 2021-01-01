<template>
  <div class="register">
    <navigation />
    <register />
  </div>
</template>
<script>
import register from "@/components/auth/register";
import Navigation from "@/components/shared/navigation";
export default {
  components: {
    register,
    Navigation
  }
};
</script>
