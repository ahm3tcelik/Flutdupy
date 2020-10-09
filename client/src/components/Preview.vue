<template>
    <v-card style="height: 100%;" dark>
        <div class="bg" :style="'background-image: url(' + bgUrl + ')'">
        <div :style="'height: 100%; background-color:' + settings.colors.appOverlay">
            <v-toolbar flat color="transparent">
                <v-toolbar-title :style="'color:' + settings.colors.appTitle" >{{ settings.texts.appTitle }}</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                    <v-icon color="white">mdi-dots-vertical</v-icon>
                </v-toolbar-items>
            </v-toolbar>

        
            <div class="my-2 mx-1" v-for="(t, index) in tiles" :key="index">
                <v-list color="#FFFFFF26" dense elevation="2" class="rounded-lg">
                    <v-list-item dense>
                        <v-list-item-avatar>
                            <v-icon color="grey lighten-1">mdi-music-note</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>{{ t }}</v-list-item-title>
                        <v-list-item-action-text>
                            <v-btn fab small :color="settings.colors.shareButton">
                                <v-icon color="white">mdi-share-variant</v-icon>
                            </v-btn>
                        </v-list-item-action-text>
                    </v-list-item>
                </v-list>
            </div>

            <div class="my-1">
                <v-row class="px-2" no-gutters  style="flex-wrap: nowrap;">
                    <v-col cols="2" class="flex-grow-0 flex-shrink-1 py-1"
                    :style="'color : ' + settings.colors.duration">
                        00:00
                    </v-col>
                    <v-col cols="8" class="flex-grow-1 flex-shrink-0">
                        <v-slider :color="settings.colors.activeColor" :track-color="settings.colors.inactiveColor" />
                    </v-col>
                    <v-col cols="2" class="flex-grow-0 flex-shrink-1 py-1"
                    :style="'color : ' + settings.colors.duration">
                        00:00
                    </v-col>
                </v-row>
                <v-row justify="space-around" style="padding: 0; margin: 0">
                    <v-btn fab small :color="settings.colors.playerButton">
                        <v-icon color="white">mdi-skip-previous</v-icon>
                    </v-btn>
                    <v-btn fab small :color="settings.colors.playerButton" >
                        <v-icon color="white">mdi-play</v-icon>
                    </v-btn>
                    <v-btn fab small :color="settings.colors.playerButton">
                        <v-icon color="white">mdi-skip-next</v-icon>
                    </v-btn>
                </v-row>
            </div>
        </div>
        </div>
    </v-card>
</template>

<script>
import ProjectService from '../services/project_service'
export default {
    props: {
        settings: Object
    },
    data() {
        return {
            menu: false,
            tiles: [
                "Neşet Ertaş - Gönül Dağı",
                "Aşık Mahsuni - Dom Dom",
                "Adele - Hello",
            ],
            bgUrl: '',
        }
    },
    async created() {
        this.bgUrl = await ProjectService.getAppBackground(this.$route.params.id);
    },
    methods: {
        refresh() {
            this.bgUrl = ProjectService.getAppBackgroundUrl(this.$route.params.id);
        }
    }
}
</script>

<style>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../assets/background.jpg) no-repeat center center;
    background-size: cover;
  }
  </style>
