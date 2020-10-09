<template>
    <div>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="1">
                        <v-img :src="image"></v-img>
                    </v-col>
                    <v-col cols="11">
                        <v-file-input v-model="file" :rules="uploadRule" 
                            accept="image/png, image/jpeg, image/jpg"
                            placeholder="Pick an app image"
                            prepend-icon="mdi-camera"
                            :label="title"
                            :disabled="disabled">
                        </v-file-input>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn v-bind:disabled="disabled" @click="upload()" color="primary">
                    <span v-show="!disabled">Save</span>
                    <span v-show="disabled">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </span>
                </v-btn>
                <v-btn :disabled="disabled" @click="reset()" color="error">Reset</v-btn>
            </v-card-actions>
        </v-card>

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

export default {
    props: {
        type: String,
        title: String,
    },
    data() {
        return {
            image: '',
            file: undefined,
            uploadRule: [
                value => !value || value.size < 2000000 || 'File size should be less than 2 MB!'
            ],
            disabled: false,
            snack: false,
            snackColor: '',
            snackText: '',
        }
    },
    async created() {
        switch (this.type) {
            case 'app-icon': {
                this.image =  await ProjectService.getAppIcon(this.$route.params.id);
                break;
            }
            case 'splash-image': {
                this.image =  await ProjectService.getSplashImage(this.$route.params.id);
                break;
            }
            case 'app-background': {
                this.image =  await ProjectService.getAppBackground(this.$route.params.id);
                break;
            }
        }
    },
    methods: {
        async upload() {
            if(this.file == undefined || !this.file) {
                return;
            }
            this.disabled = true;
            let result;
            switch (this.type) {
                case 'app-icon': {
                    result = await ProjectService.setAppIcon(this.$route.params.id, this.file); 
                    this.image = await ProjectService.getAppIcon(this.$route.params.id);
                    break;
                }
                case 'splash-image': {
                    result = await ProjectService.setSplashImage(this.$route.params.id, this.file);
                    this.image = await ProjectService.getSplashImage(this.$route.params.id);
                    break;
                }
                case 'app-background': {
                    result = await ProjectService.setAppBackground(this.$route.params.id, this.file);
                    this.image = await ProjectService.getAppBackground(this.$route.params.id);
                    break;
                }
            }
            this.disabled = false;
            this.snack = true;
            if(result) {
                this.snackColor = 'success'
                this.snackText = 'Image has been updated';
            }
            else {
                this.snackColor = 'error'
                this.snackText = 'Image could not be updated'; 
            }

        },
        reset() {
            this.file = undefined;
        }
    }
}
</script>