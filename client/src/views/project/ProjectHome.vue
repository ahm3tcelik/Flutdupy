<template>
    <v-app>
        <v-navigation-drawer
        v-model="drawer" app clipped>
        <v-list dense>
            <v-list-item-group color="primary">
            <v-list-item v-for="(menu, index) in menus" :key="index" @click="goTo(menu.path)">
                <v-list-item-action>
                <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>

        <v-app-bar hide-on-scroll app clipped-left dark color="primary" >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Edit Project</v-toolbar-title>
            <v-spacer />
            <v-btn text @click="$router.replace({path: '/projects'})">All Projects</v-btn>
            <LogoutButton color="light" />
        </v-app-bar>
        
        <v-main>
        <v-container fluid>
            <v-row>
            <v-col>
                <router-view />
            </v-col>
            </v-row>
        </v-container>
    </v-main>
    </v-app>
</template>

<script>
import LogoutButton from '@/components/LogoutButton';

export default {
    data() {
        return {
            id: this.$route.params.id,
            drawer: null,
            path: '/project/' + this.$route.params.id,
            menus: [
                { path: '', title: 'Dashboard', icon: 'mdi-view-dashboard' },
                { path: '/app_config', title: 'App Config', icon: 'mdi-cog'},
                { path: '/ads_config', title: 'Admob Config', icon: 'mdi-google-ads'},
                { path: '/inapp_settings', title: 'In App Settings', icon: 'mdi-cellphone-cog' }
            ]
        }
    },
    methods: {
        goTo(newPath) {
            this.$router.push({path: this.path + newPath}).catch(()=>{});
        }
    },
    components: {
        LogoutButton
    }
}
</script>