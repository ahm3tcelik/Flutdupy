import 'package:admob_flutter/admob_flutter.dart';
import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:esys_flutter_share/esys_flutter_share.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:global_configuration/global_configuration.dart';
import 'package:template_1/helpers/helper.dart';
import 'package:template_1/models/sound.dart';
import 'package:template_1/services/AdService.dart';

class SoundTile extends StatelessWidget {
  
  final AdmobInterstitial intersAd;
  final int index;
  final Sound sound;
  final AssetsAudioPlayer assetsAudioPlayer;
  final int ads_counter;
  
  SoundTile(this.index, this.sound, this.assetsAudioPlayer, this.ads_counter, this.intersAd);

  GlobalConfiguration cfg = GlobalConfiguration();

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 5),
      decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.1),
          borderRadius: BorderRadius.all(Radius.circular(10))),
      child: Material(
        color: Colors.transparent,
        child: StreamBuilder(
          initialData: adService.getCounter,
          stream: adService.getStream,
          builder: (context, snapshot) {
            return InkWell(
              splashColor: Colors.blue,
              onTap: () async {
                if (snapshot.data == 0) {
                  adService.changeCounter(5);
                  intersAd.isLoaded.then((value) {
                    if(value) {
                      assetsAudioPlayer.pause();
                      intersAd.show();
                    } else assetsAudioPlayer.open(Audio(sound.path));
                  });
                }
                else {
                  adService.changeCounter(snapshot.data - 1);
                  assetsAudioPlayer.playlistPlayAtIndex(index);
                }
              },
              child: ListTile(
                contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                title: Text(
                  sound.title,
                  style: TextStyle(color: Colors.white),
                ),
                leading: Icon(
                  Icons.music_note,
                  color: Colors.white60,
                ),
                trailing: CircleAvatar(
                    backgroundColor: Helper.hexColor(cfg.get('colors')['shareButton']),
                    child: IconButton(
                      color: Colors.white,
                      icon: Icon(Icons.share),
                      onPressed: () async {
                        final ByteData bytes = await rootBundle.load(Uri.decodeFull(sound.path));
                        await Share.file(sound.title, sound.title + ".mp3",
                            bytes.buffer.asUint8List(), 'audio/*');
                      },
                    )),
              ),
            );
          },
        ),
      ),
    );
  }
}
