<template>
    <v-card class="mx-auto" link @click="goTo(project.id)">

        <v-toolbar :color="toolbarColor" dark flat>
            <v-toolbar-title class="headline">{{ project.name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-subtitle>
            <div>ID # {{ project.id }}</div>
            <div>TEMPLATE # {{ project.template_id }}</div>
        </v-card-subtitle>

        <v-card-text class="text-center">
            <v-icon large color="blue-grey lighten-3">mdi-android-studio</v-icon>
        </v-card-text>

        <v-card-actions>
            <v-icon>mdi-apple</v-icon>
            <v-icon>mdi-android</v-icon>
        </v-card-actions>
        </v-card>
</template>

<script>
export default {
    data() {
        return {
            colors: ['#393e46', '#4ecca3', '#232931', '#70adb5', '#407088', '#ea5455']
        }
    },
    props: {
        project: {}
    },
    methods: {
        goTo(id) {
            this.$router.push({path: 'project/' + id}).catch(() => {});
            //this.$router.push({name: 'project', params: {id: id}}).catch(()=>{})
        },
    },
    computed: {
        toolbarColor: function ()  {
            return this.colors[this.project.id % this.colors.length];
        }
    }
}
</script>