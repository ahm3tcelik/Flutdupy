import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:cloud_music_player/helpers/helper.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:global_configuration/global_configuration.dart';


class MusicPlayer extends StatelessWidget {
  final AssetsAudioPlayer player;

  MusicPlayer(this.player);
  GlobalConfiguration cfg = GlobalConfiguration();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                StreamBuilder(
                  stream: player.currentPosition,
                  builder: (context, snapshot) {
                    return snapshot.hasData
                        ? Text(durationToString(snapshot.data),
                            style: TextStyle(
                                color: Helper.hexColor(
                                    cfg.get('colors')['duration'])))
                        : Text('00:00');
                  },
                ),
                Expanded(
                    child: StreamBuilder(
                        stream: player.currentPosition,
                        builder: (context, snapshot) {
                          final Duration currentDur = snapshot.data;
                          return !snapshot.hasData
                              ? CircularProgressIndicator()
                              : StreamBuilder(
                                  stream: player.current,
                                  builder: (context, snapshot) {
                                    final Playing playing = snapshot.data;
                                    double max = 0.0;
                                    if (playing != null) {
                                      max = playing
                                          .audio.duration.inMilliseconds
                                          .toDouble();
                                    }
                                    return Slider(
                                      min: 0.0,
                                      max: max,
                                      value:
                                          currentDur.inMilliseconds.toDouble(),
                                      onChanged: (value) {
                                        player.seek(
                                            Duration(
                                                milliseconds: value.toInt()),
                                            force: false);
                                      },
                                      activeColor: Helper.hexColor(cfg.get('colors')['seekBarActive']),
                                      inactiveColor: Helper.hexColor(cfg.get('colors')['seekBarInactive']),
                                    );
                                  },
                                );
                        })),
                StreamBuilder(
                  stream: player.current,
                  builder: (context, snapshot) {
                    final Playing playing = snapshot.data;
                    Duration max = Duration(seconds: 0);
                    if (playing != null) {
                      max = playing.audio.duration;
                    }
                    return Text(durationToString(max),
                        style: TextStyle(
                            color: Helper.hexColor(
                                cfg.get('colors')['duration'])));
                  },
                ),
              ],
            )),
        Padding(
            padding: EdgeInsets.only(left: 5, right: 5, bottom: 20, top: 5),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                FloatingActionButton(
                  onPressed: () {
                    player.previous(keepLoopMode: true);
                  },
                  backgroundColor:
                      Helper.hexColor(cfg.get('colors')['playerButton']),
                  child: Icon(Icons.skip_previous),
                ),
                StreamBuilder(
                    stream: player.isPlaying,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return CircularProgressIndicator();
                      } else {
                        final bool isPlaying = snapshot.data;
                        return FloatingActionButton(
                          onPressed: () {
                            player.setPlaySpeed(1).then((value) => player.playOrPause());
                          },
                          backgroundColor: Helper.hexColor(
                              cfg.get('colors')['playerButton']),
                          child:
                              Icon(isPlaying ? Icons.pause : Icons.play_arrow),
                        );
                      }
                    }),
                FloatingActionButton(
                  onPressed: () {
                    player.next(keepLoopMode: true);
                  },
                  backgroundColor:
                      Helper.hexColor(cfg.get('colors')['playerButton']),
                  child: Icon(Icons.skip_next),
                ),
              ],
            )),
      ],
    );
  }

  String durationToString(Duration duration) {
    String twoDigits(int n) {
      if (n >= 10) return "$n";
      return "0$n";
    }

    String twoDigitMinutes =
        twoDigits(duration.inMinutes.remainder(Duration.minutesPerHour));
    String twoDigitSeconds =
        twoDigits(duration.inSeconds.remainder(Duration.secondsPerMinute));
    return "$twoDigitMinutes:$twoDigitSeconds";
  }
}
