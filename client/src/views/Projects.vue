<template>
    <div>
        <v-app-bar>
            <v-toolbar-title title="App Builder">
                <span>
                    <v-img src="../assets/logo.png" width="35" height="35"></v-img>
                </span>
            </v-toolbar-title>
            <span class="h5">App Builder</span>
            <v-spacer />
            <LogoutButton color="dark" />
        </v-app-bar>
        <v-btn elevation="8" absolute fab large dark right color="primary" 
        style="position: fixed; bottom: 25px;" @click="dialog = true">
            <v-icon large>mdi-plus</v-icon>
        </v-btn>
        <v-container>
            <h2 class="headline">Projects</h2>
            <v-row v-show="projects.length < 1" justify="center">
                <v-col cols="12">
                    <v-alert color="blue-grey" dark  icon="mdi-sticker-alert" prominent>
                        <v-row align="center">
                            <v-col class="grow">Sorry! Projects not found. Let's create a new project now. </v-col>
                            <v-col class="shrink">
                            <v-btn color="success" @click="dialog = true">CREATE PROJECT</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" v-for="p in projects" :key="p.id">
                    <ProjectCard :project="p" />
                </v-col>
            </v-row>
        </v-container>

        <!-- Create Project Modal -->
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Create Project</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="dialog_name" :disabled="disabled" label="Project Name" required></v-text-field>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-select :items="templates" :rules="rule" v-model="dialog_template_id" 
                                    name="template" item-text="name" item-value="id" 
                                    label="Select a template" solo 
                                    :disabled="disabled" required></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" :disabled="disabled" text @click="onCloseDialog()">Close</v-btn>
                        <v-btn color="blue darken-1" :disabled="disabled" text @click="onSaveDialog()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
import ProjectCard from '../components/ProjectCard';
import LogoutButton from '@/components/LogoutButton';
import TemplateService from '../services/template_service';
import ProjectService from '../services/project_service';

export default {
    data() {
        return {
            projects: [],
            templates: [],
            rule: [
                v => !!v || 'This field is required'
            ],
            dialog: false,
            dialog_name: '',
            dialog_template_id: '',
            disabled: false,
            snack: false,
            snackColor: '',
            snackText: '',
        }
    },
    components: {
        ProjectCard,
        LogoutButton
    },
    methods: {
        async onSaveDialog() {
            this.disabled = true;
            let result = await ProjectService.addProject(
                this.dialog_template_id, this.dialog_name);
            this.disabled = false;
            this.snack = true
            if(result) {
                this.snackColor = 'success'
                this.snackText = 'Project has been created';
                this.initialProjects(); 
            }
            else {
                this.snackColor = 'error'
                this.snackText = 'Project could not be created'; 
            }
            this.onCloseDialog();
        },
        onCloseDialog() {
            this.dialog = false;
            this.dialog_template_id = '';
            this.dialog_name = '';
        },
        async initialProjects() {
            this.projects = await ProjectService.getProjects();
        }
    },
    async created() {
        this.initialProjects();
        this.templates = await TemplateService.getTemplates();
    }
}
</script>