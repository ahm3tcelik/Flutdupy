<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card tile :loading="disabled">
                    <v-card-title>App Config</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation :disabled="disabled" ref="configForm">
                            <v-text-field type="text" v-model="name"  label="Application Name" 
                                :rules="rule" prepend-icon="mdi-form-textbox" /> 
                            <v-text-field type="text" v-model="id" 
                                label="Application ID (Package Name)" :rules="idRule" 
                               prepend-icon="mdi-identifier" />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>  
                        <v-btn v-bind:disabled="disabled" @click="onSaveAppConfig()" color="primary">
                            <span v-show="!disabled">Save</span>
                            <span v-show="disabled">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </span>
                        </v-btn>
                        <v-btn :disabled="disabled" @click="resetAppConfig()" color="error">Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="12">
                <v-card tile :loading="disabled">
                    <v-card-title>App Version Config</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation :disabled="disabled" ref="versionForm">
                            <v-text-field type="text" v-model="version_name"  label="Version Name" 
                                :rules="rule" prepend-icon="mdi-form-textbox" /> 
                            <v-text-field type="text" v-model="version_code" 
                                label="Version Code" :rules="codeRule" 
                               prepend-icon="mdi-identifier" />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>  
                        <v-btn v-bind:disabled="disabled" @click="onSaveAppConfig()" color="primary">
                            <span v-show="!disabled">Save</span>
                            <span v-show="disabled">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </span>
                        </v-btn>
                        <v-btn :disabled="disabled" @click="resetAppConfig()" color="error">Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <ImagePickerCard type="app-icon" title="App Launcher Icon" />
            </v-col>
            <v-col cols="12">
                <ImagePickerCard type="splash-image" title="App Splash Image" />
            </v-col>
            <v-col cols="12">
                <ImagePickerCard type="app-background" title="App Background Image" />
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
import ProjectService from '@/services/project_service.js';
import ImagePickerCard from '@/components/ImagePickerCard';

export default {
    data() {
        return {
            id: '',
            name: '',
            config: {},
            version_name: '',
            version_code : '',
            version: {},
            disabled: false,
            idRule: [ 
                v => !!v || 'This field is required',
                v => /^com[.].+/.test(v) || "Id must be contain 'com' ",
            ],
            rule: [
                v => !!v || 'This field is required'
            ],
            codeRule: [
                v => !!v || 'This field is required'
            ],
            snack: false,
            snackColor: '',
            snackText: '',
        }
    },
    async created() {
        this.disabled = true,
        this.config = await ProjectService.getAppConfig(this.$route.params.id);
        this.version = await ProjectService.getAppVersion(this.$route.params.id);
        this.version_name = this.version.version_name;
        this.version_code = this.version.version_code;
        this.id = this.config.applicationId;
        this.name = this.config.applicationName;
        this.disabled = false;
    },
    methods: {
        async onSaveAppConfig() {
            if(this.$refs.configForm.validate()) {
                this.disabled = true;
                let result = await ProjectService.setAppConfig(
                    this.$route.params.id, {
                        applicationId: this.id,
                        applicationName: this.name
                    }
                );
                this.disabled = false;
                this.snack = true
                if(result) {
                    this.snackColor = 'success'
                    this.snackText = 'App Config has been updated';
                }
                else {
                    this.snackColor = 'error'
                    this.snackText = 'App config could not be updated'; 
                }
            }
        },
        resetAppConfig() {
            this.id = this.config.applicationId;
            this.name = this.config.applicationName;
        },
        async onSaveAppVersionConfig() {
            if(this.$refs.versionForm.validate()) {
                this.disabled = true;
                let result = await ProjectService.setAppVersion(
                    this.$route.params.id, {
                        version_code: this.version_code,
                        version_name: this.version_name
                    }
                );
                this.disabled = false;
                this.snack = true
                if(result) {
                    this.snackColor = 'success'
                    this.snackText = 'App version config has been updated';
                }
                else {
                    this.snackColor = 'error'
                    this.snackText = 'App version could not be updated'; 
                }
            }
        },
        resetAppVersionConfig() {
            this.version_code = this.version.version_code;
            this.version_name = this.version.version_name;
        },
    },
    components: {
        ImagePickerCard
    }
}
</script>