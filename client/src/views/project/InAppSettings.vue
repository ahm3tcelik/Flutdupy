<template>
    <div>
        <v-row>
            <v-col class="ml-2" cols="12" md="6">
                <v-row justify="center">
                    <v-expansion-panels accordion>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <h2 class="headline">Edit Texts</h2>
                                </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-card flat>
                                    <v-card-text>
                                        <v-simple-table dense>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                    <th class="text-left" width="30%">Key</th>
                                                    <th class="text-left" width="70%">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(value ,key) in settings.texts" :key="key">
                                                        <td>{{ key }}</td>
                                                        <td>
                                                            <v-text-field v-model="settings.texts[key]" flat>
                                                            </v-text-field>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <!-- Edit Colors -->
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <h2 class="headline">Edit Colors</h2>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-card flat>
                                    <v-card-text>
                                        <template>    
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                        <th class="text-left" width="30%">Key</th>
                                                        <th class="text-left" width="70%">Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(value, key) in settings.colors" :key="key">
                                                        <td>{{ key }}</td>
                                                        <td>
                                                            <ColorPickerButton v-model="settings.colors[key]" />
                                                            <v-text-field readonly v-model="settings.colors[key]" 
                                                                style="display:inline-block; max-width: 100%">
                                                            </v-text-field>
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>

                <v-divider class="my-4" />
                        
                <v-row class="ma-2">
                    <v-btn  color="primary" class="mx-1" @click="onSave()">Save</v-btn>    
                    <v-btn  color="error" class="mx-1">Reset</v-btn>
                    <v-btn  color="success" class="mx-1" @click="previewEnabled = !previewEnabled; goToBottom()">
                        <v-icon class="mr-2">{{ previewEnabled ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                        Preview
                    </v-btn>
                </v-row>
            </v-col>
            <v-divider class="px-2" vertical /> 
            <v-col cols="12" md="5" class="d-inline-flex text-center justify-center">
                <div id="device" class="device-wrapper" v-show="previewEnabled">
                    <div class="device" data-device="iPhone7" data-orientation="portrait" data-color="black">
                        <div class="screen">
                            <Preview :settings="settings" />
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-divider class="my-5" />
        

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
import ColorPickerButton from '@/components/ColorPickerButton';
import Preview from '@/components/Preview';

export default {
    data() {
        return {
            settings: {},
            colors: {},
            disabled: false,
            color: '',
            previewEnabled: true,
            snack: false,
            snackColor: '',
            snackText: '',
        }
    },
    created() {
        this.initializeSettings();
    },
    methods: {
        async initializeSettings() {
            this.disabled = true;
            this.settings = await ProjectService.getInAppSettings(this.$route.params.id);
            this.disabled = false;
            console.log(this.settings.colors);
        },
        async onSave() {
            this.disabled = true;
            const result = await ProjectService.setInAppSettings(
                this.$route.params.id, this.settings);
            this.disabled = false;
            this.snack = true;
            if(result) {
                this.snackColor = 'success'
                this.snackText = 'In App Settings has been updated';
            }
            else {
                this.snackColor = 'error'
                this.snackText = 'In App Settings could not be updated'; 
            }
        },
        goToBottom() {
            setTimeout(() => {
                this.$vuetify.goTo('#device');
            }, 100)
        }
    },
    components: {
        ColorPickerButton,
        Preview
    }
}
</script>