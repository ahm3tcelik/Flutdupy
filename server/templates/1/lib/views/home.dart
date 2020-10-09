import 'dart:io';
import 'package:admob_flutter/admob_flutter.dart';
import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:flutter/material.dart';
import 'package:global_configuration/global_configuration.dart';
import 'package:template_1/helpers/helper.dart';
import 'package:template_1/models/sound.dart';
import 'package:template_1/widgets/music_player.dart';
import 'package:template_1/widgets/sound_tile.dart';

class Home extends StatelessWidget {
  GlobalConfiguration cfg = GlobalConfiguration();
  AdmobInterstitial intersAd;
  int ads_counter = 4; // 4 dinlemede bir reklam göster
  final assetsAudioPlayer = AssetsAudioPlayer();

  @override
  Widget build(BuildContext context) {
    initIntersAd();
    createAssetAudio();
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Container(
              decoration: BoxDecoration(
            color: Helper.hexColor(cfg.get('colors')['appOverlay']),
            image: DecorationImage(
              fit: BoxFit.cover,
              colorFilter: new ColorFilter.mode(
                  Colors.black.withOpacity(0.2), BlendMode.dstATop),
              image: AssetImage(
                'assets/images/background.jpg',
              ),
            ),
          )),
          SafeArea(
            bottom: false,
            child: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Expanded(
                      child:  Padding(
                        padding: EdgeInsets.only(left: 10),
                        child: StreamBuilder(
                          stream: assetsAudioPlayer.current,
                          builder: (context, snapshot) {
                            final Playing playing = snapshot.data;
                            return snapshot.hasData
                                ? buildAppTitle(
                                soundList[playing.playlist.currentIndex]
                                    .title)
                                : buildAppTitle(cfg.get('texts')['appTitle']);
                          },
                        ),
                      ),
                    ),
                    buildPopupMenu(context),
                  ],
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisSize: MainAxisSize.max,
                ),
                Divider(
                  color: Colors.white,
                ),
                Expanded(
                  child: ListView.builder(
                      itemCount: soundList.length,
                      itemBuilder: (context, index) {
                        if (ads_counter-- == 0) {
                          ads_counter = 5;
                          return SoundTile(index, soundList[index], assetsAudioPlayer, 0, intersAd);
                        }
                        return SoundTile(index, soundList[index], assetsAudioPlayer,ads_counter, intersAd);
                      }),
                ),
                MusicPlayer(assetsAudioPlayer),
                AdmobBanner(

                  adUnitId: Platform.isAndroid ? cfg.get('androidAdsBannerId') : cfg.get('iosAdsBannerId'),
                  adSize: AdmobBannerSize.ADAPTIVE_BANNER(width: MediaQuery.of(context).size.width.toInt()),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  buildAppTitle(String title) {
    return Text(
      title,
      textAlign: TextAlign.center,
      style: TextStyle(
        fontFamily: 'Avenir',
        color: Helper.hexColor(cfg.get('colors')['appTitle']),
        fontSize: 20,
        fontWeight: FontWeight.w200,
      ),
    );
  }

  buildPopupMenu(BuildContext context) {
    return PopupMenuButton<String>(
      icon: Icon(
        Icons.more_vert,
        color: Colors.white,
      ),
      onSelected: (value) {
        if (value == 'Privacy Policy') {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: Text('Privacy Policy'),
                actions: [
                  RaisedButton(
                    color: Colors.blue,
                    child: Text('Okay'),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                ],
                content: SingleChildScrollView(
                  child: Text(Helper.privacyPolicy),
                ),
              );
            },
          );
        }
      },
      itemBuilder: (BuildContext context) {
        return {
          'Privacy Policy',
        }.map((String choice) {
          return PopupMenuItem<String>(
            value: choice,
            child: Text(choice),
          );
        }).toList();
      },
    );
  }
  void createAssetAudio() {
    assetsAudioPlayer.open(
        Playlist(
          audios: setPlaylist(),
        ),
        autoStart: false,
        loopMode: LoopMode.playlist,
        playInBackground: PlayInBackground.enabled,
        playSpeed: 1);
  }
  List<Audio> setPlaylist() {
    List<Audio> audios = List();
    soundList.forEach((e) {
      audios.add(Audio(e.path));
    });
    return audios;
  }

  void initIntersAd() {
    intersAd = AdmobInterstitial(
      adUnitId: Platform.isAndroid ? cfg.get('androidAdsGecisId') : cfg.get('iosAdsGecisId'),
      listener: (AdmobAdEvent event, Map<String, dynamic> args) {
        if (event == AdmobAdEvent.closed) {
          assetsAudioPlayer.play();
          intersAd.load();
        }
        else if (event == AdmobAdEvent.failedToLoad) {
          // Start hoping they didn't just ban your account :)
          print("Error code: ${args['errorCode']}");
        }
      },
    );
    intersAd.load();
  }
}
