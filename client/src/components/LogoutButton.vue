<template>
    <v-btn small fab icon outlined shaped :color="color" @click="logOut()">
        <v-icon>mdi-power</v-icon>
    </v-btn>
</template>

<script>
import AuthService from '@/services/auth_service';

export default {
    props: {
        color: String
    },
    methods: {
        logOut() {
            AuthService.logOut();
            this.$router.replace({path: '/'}).catch(err => console.error(err));
        }
    }
}
</script>