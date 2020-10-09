<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card tile :loading="disabled">
                    <v-card-title>Project Overview</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation :disabled="disabled" ref="projectForm">
                            <v-text-field type="text" v-model="name"  label="Project Name" 
                                :rules="rule" prepend-icon="mdi-form-textbox" />
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field disabled type="text" 
                                        v-model="project.id"
                                        flat
                                        label="Project Id" 
                                        prepend-icon="mdi-identifier" />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field disabled type="text" 
                                        v-model="project.template_id" 
                                        label="Template Id" 
                                        prepend-icon="mdi-identifier" />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>  
                        <v-btn v-bind:disabled="disabled" @click="onSaveProjectConfig()" color="primary">
                            <span v-show="!disabled">Save</span>
                            <span v-show="disabled">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </span>
                        </v-btn>
                        <v-btn :disabled="disabled" @click="resetProjectConfig()" color="error">Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
                <v-card tile :loading="disabled">
                    <v-card-title>Project Download</v-card-title>
                    <v-card-subtitle>
                        Download <span class="info--text font-weight-bold">Flutter </span>
                        project as a zip
                        <DownloadProjectButton />
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        

        <!-- Snackbar -->
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <template v-slot:action="{ attrs }">
                <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
            </template>
        </v-snackbar>

    </div>
</template>

<script>
import ProjectService from '@/services/project_service';
import DownloadProjectButton from '@/components/DownloadProjectButton';

export default {
    data() {
        return {
            name,
            disabled: false,
            project: {id: this.$route.params.id, name: 'Project Name'},
            rule: [ v => !!v || 'This field is required'],
            snack: false,
            snackColor: '',
            snackText: '',
        }
    },
    async created() {
        this.disabled = true;
        this.project = await ProjectService.getProjectById(this.$route.params.id);
        this.disabled = false;
        this.name = this.project.name;
    },
    methods: {
        async onSaveProjectConfig() {
            this.disabled = true;
            let result = await ProjectService.setProject(this.$route.params.id, this.name);
            this.disabled = false;
            this.snack = true;
            if(result) {
                this.snackColor = 'success'
                this.snackText = 'Project has been updated';
            }
            else {
                this.snackColor = 'error'
                this.snackText = 'Project could not be updated'; 
            }
        },
        async resetProjectConfig() {
            this.name = this.project.name;
        }
    },
    components: {
        DownloadProjectButton
    }

}
</script>