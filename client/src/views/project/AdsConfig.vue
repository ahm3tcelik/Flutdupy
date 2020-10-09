<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card tile :loading="disabled">
                    <v-card-title>Admob Ads Config</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation :disabled="disabled" ref="adsConfigForm">
                            <v-expansion-panels focusable flat>
                                <v-expansion-panel v-for="(ads, index) in adsField" :key="index">
                                    <v-expansion-panel-header>
                                        <span>
                                            <v-icon large class="pr-2" >{{ ads.icon }}</v-icon>
                                            {{ ads.label }}
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-text-field type="text" v-model="config[ads.modelAndroid]" 
                                            :label="ads.label" :rules="ads.rule" 
                                            prepend-icon="mdi-android" /> 
                                        <v-text-field type="text" :disabled="disabled" 
                                            v-model="config[ads.modelIos]" :label="ads.label"
                                            :rules="ads.rule" 
                                            prepend-icon="mdi-apple" />
                                        <v-btn color="warning" small v-show="ads.testId"
                                        @click="config[ads.modelAndroid] = ads.testId; config[ads.modelIos] = ads.testId">
                                            <span>
                                                <v-icon>mdi-xml</v-icon>
                                                Use Test Ads ID
                                            </span>
                                        </v-btn>
                                    </v-expansion-panel-content>                                
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        <span>
                                            <v-icon large class="pr-2" >mdi-test-tube</v-icon>
                                            Test Device Ids
                                        </span>
                                    </v-expansion-panel-header>
                                    
                                    <v-expansion-panel-content>
                                        <v-text-field type="text" :disabled="disabled"
                                            v-model="config['testDeviceIds'][0]" label="Test Device Id"
                                            prepend-icon="mdi-cellphone" /> 
                                        <v-text-field type="text" :disabled="disabled" 
                                            v-model="config['testDeviceIds'][1]" label="Test Device Id"
                                            prepend-icon="mdi-cellphone" />
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                            </v-expansion-panels>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>  
                        <v-btn v-bind:disabled="disabled" @click="onSaveAdsConfig()" 
                            color="primary">
                            <span v-show="!disabled">Save</span>
                            <span v-show="disabled">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </span>
                        </v-btn>
                        <v-btn :disabled="disabled" @click="resetAdsConfig()" 
                            color="error">
                            Reset
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <!-- Put GooglePlayServices.json -->
        <v-row>
            <v-col cols="12">
                <v-card tile :loading="disabled">
                    <v-card-title>Google Services Config File</v-card-title>
                    <v-card-text>
                        <v-file-input v-model="configFile" :rules="uploadRule" 
                            accept=".json"
                            placeholder="Pick google-services.json"
                            prepend-icon="mdi-file-cog"
                            label="google-services.json"
                            :disabled="disabled"
                        ></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-bind:disabled="disabled" @click="uploadFile()" color="primary">
                            <span v-show="!disabled">Save</span>
                            <span v-show="disabled">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </span>
                        </v-btn>
                        <v-btn :disabled="disabled" @click="resetFile()" color="error">Reset</v-btn>
                    </v-card-actions>
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

export default {
    data() {
        return {
            config: { testDeviceIds: []},
            configFile: undefined,
            configClone: {}, // on pressed form reset -> set clone
            disabled: false,
            admobIdRule: [
                v => /^ca[-].+/.test(v) || "Id must be contain 'ca-' ",
            ],
            uploadRule: [
                value => !value || value.size < 2000000 || 'Icon size should be less than 2 MB!'
            ],
            adsField: [],
            snack: false,
            snackColor: '',
            snackText: '',
        }
    },
    async created() {
        this.disabled = true,
        this.config = await ProjectService.getInAppSettings(this.$route.params.id);
        this.configClone = this.config;
        this.setAdsField();
        this.disabled = false;
    },
    methods: {
        async onSaveAdsConfig() {
            if(this.$refs.adsConfigForm.validate()) {
                this.disabled = true;
                let result = await ProjectService.setInAppSettings(
                    this.$route.params.id, this.config
                );
                this.disabled = false;
                this.snack = true
                if(result) {
                    this.snackColor = 'success'
                    this.snackText = 'Ads Config has been updated';
                }
                else {
                    this.snackColor = 'error'
                    this.snackText = 'Ads config could not be updated'; 
                }
            }
        },
        resetAdsConfig() {
            this.config = this.configClone;
            this.setAdsField();
        },
        async uploadFile() {
            if(this.configFile == undefined || !this.configFile) {
                return;
            }
            this.disabled = true;
            let result = await ProjectService.setGoogleServices(this.$route.params.id, this.configFile);
            this.disabled = false;
            this.snack = true;
            if(result) {
                this.snackColor = 'success'
                this.snackText = 'Google Services file has been updated';
            }
            else {
                this.snackColor = 'error'
                this.snackText = 'Google Services file could not be updated'; 
            }
        },
        resetFile() {
            this.configFile = undefined;
        },
        setAdsField() {
            this.adsField = [
                { modelAndroid: 'androidAdsAppId', modelIos: 'iosAdsAppId', 
                    rule: this.admobIdRule, label: 'Admob App Id', icon: 'mdi-apps',
                    testId: 'ca-app-pub-3940256099942544~3347511713'},
                { modelAndroid: 'androidAdsBannerId', modelIos: 'iosAdsBannerId', 
                    rule: this.admobIdRule, label: 'Banner Ads Id', icon: 'mdi-image-size-select-large',
                    testId: 'ca-app-pub-3940256099942544/6300978111'},
                { modelAndroid: 'androidAdsSplashId', modelIos: 'iosAdsSplashId', 
                    rule: this.admobIdRule, label: 'Splash Ads Id', icon: 'mdi-cellphone-screenshot',
                    testId: 'ca-app-pub-3940256099942544/1033173712'},
                { modelAndroid: 'androidAdsGecisId', modelIos: 'iosAdsGecisId', 
                    rule: this.admobIdRule, label: 'Gecis Ads Id', icon: 'mdi-transition',
                    testId: 'ca-app-pub-3940256099942544/1033173712'}
            ];
        }
    },
}
</script>