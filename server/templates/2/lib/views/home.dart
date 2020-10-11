import 'dart:io';

import 'package:admob_flutter/admob_flutter.dart';
import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:cloud_music_player/helpers/helper.dart';
import 'package:cloud_music_player/models/asset_sound.dart';
import 'package:cloud_music_player/models/cloud_sound.dart';
import 'package:cloud_music_player/models/sound.dart';
import 'package:cloud_music_player/widgets/music_player.dart';
import 'package:cloud_music_player/widgets/sound_tile.dart';
import 'package:flutter/material.dart';
import 'package:global_configuration/global_configuration.dart';
import 'package:mailto/mailto.dart';
import 'package:url_launcher/url_launcher.dart';

class Home extends StatelessWidget {
  GlobalConfiguration cfg = GlobalConfiguration();
  AdmobInterstitial intersAd;
  int ads_counter = 4; // 4 dinlemede bir reklam göster
  final assetsAudioPlayer = AssetsAudioPlayer();

  @override
  Widget build(BuildContext context) {
    buildPlayList();
    initIntersAd();
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
                      child: Padding(
                          padding: EdgeInsets.only(left: 10),
                          child: buildAppTitle(cfg.get('texts')['appTitle'])),
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
                          return SoundTile(index, soundList[index],
                              assetsAudioPlayer, 0, intersAd);
                        }
                        return SoundTile(index, soundList[index],
                            assetsAudioPlayer, ads_counter, intersAd);
                      }),
                ),
                MusicPlayer(assetsAudioPlayer),
                AdmobBanner(
                  adUnitId: Platform.isAndroid
                      ? cfg.get('androidAdsBannerId')
                      : cfg.get('iosAdsBannerId'),
                  adSize: AdmobBannerSize.ADAPTIVE_BANNER(
                      width: MediaQuery.of(context).size.width.toInt()),
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
        } else if (value == 'Report Sound') {
          TextEditingController soundName = TextEditingController();
          TextEditingController reason = TextEditingController();
          soundName.text = "";
          reason.text = "";
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: Text('Report Sound'),
                content: Column(
                  children: [
                    TextField(
                      controller: soundName,
                      decoration: InputDecoration(labelText: "Sound Name"),
                    ),
                    TextField(
                      controller: reason,
                      decoration: InputDecoration(labelText: "Reason"),
                    ),
                  ],
                ),
                actions: [
                  RaisedButton(
                    color: Colors.blue,
                    child: Text('Send'),
                    onPressed: () {
                      launchMailto(soundName.text + ' : ' + reason.text);
                      Navigator.pop(context);
                    },
                  ),
                  RaisedButton(
                    child: Text('cancel'),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  )
                ],
              );
            },
          );
        }
      },
      itemBuilder: (BuildContext context) {
        return {'Privacy Policy', 'Report Sound'}.map((String choice) {
          return PopupMenuItem<String>(
            value: choice,
            child: Text(choice),
          );
        }).toList();
      },
    );
  }

  void initIntersAd() {
    intersAd = AdmobInterstitial(
      adUnitId: Platform.isAndroid
          ? cfg.get('androidAdsGecisId')
          : cfg.get('iosAdsGecisId'),
      listener: (AdmobAdEvent event, Map<String, dynamic> args) {
        if (event == AdmobAdEvent.closed) {
          assetsAudioPlayer.play();
          intersAd.load();
        } else if (event == AdmobAdEvent.failedToLoad) {
          // Start hoping they didn't just ban your account :)
          print("Error code: ${args['errorCode']}");
        }
      },
    );
    intersAd.load();
  }

  launchMailto(String body) async {
    final mailtoLink = Mailto(
      to: [cfg.get('contact')['email']],
      subject: 'REPORTING CONTENT FOR ' + cfg.get('texts')['appTitle'],
      body: body,
    );
    await launch(mailtoLink.toString());
  }

  void buildPlayList() {
    List<Audio> audios = List();
    soundList.forEach((e) {
      audios.add(e is AssetSound
          ? Audio(e.path)
          : Audio.network((e as CloudSound).url));
    });
    assetsAudioPlayer.open(
      Playlist(audios: audios),
      autoStart: false,
      loopMode: LoopMode.playlist,
      playInBackground: PlayInBackground.enabled,
      playSpeed: 1.0
    );
  }
}
