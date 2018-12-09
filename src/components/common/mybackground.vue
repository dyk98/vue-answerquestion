<template>
    <div>
        <div class="background"></div>
        <div class="none"></div>
    </div>
</template>

<script>
    export default {
        name: "mybackground"
    }
</script>

<style scoped>
    .none {
        width: 20%;
        height: 30px;
    }

    .background {
        position: fixed;
        background-color: #f6c344;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

</style>