<template>
    <v-dialog v-model="download_dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text icon color="secondary" v-bind="attrs" v-on="on">
            <v-icon>mdi-download</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">
            One More Step
            </v-card-title>
            <v-card-text>
                <p>Extract the downloaded zip file to the folder and 
                copy your custom files to specified directories. </p>
                <ul>
                    <li><strong>Sounds : </strong> '/assets/sounds/'</li>
                    <li><strong>Images : </strong> '/assets/images/'</li>
                </ul>
            </v-card-text>
            <v-card-actions>
            <v-spacer />
            <v-btn color="success" text @click="download()" >
                Download
                <v-icon class="right">mdi-download</v-icon>
            </v-btn>
            <v-btn color="secondary darken-1" text @click="download_dialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ProjectService from '@/services/project_service';

export default {
    data() {
        return {
            download_dialog: false
        }
    },
    methods: {
        async download() {
            console.log(this.$route);
            await ProjectService.getDownload(this.$route.params.id);
            this.download_dialog = false;
        }
    }
}
</script>