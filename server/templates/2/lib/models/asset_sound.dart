import 'package:cloud_music_player/models/sound.dart';

class AssetSound extends Sound {
  final String path;
  AssetSound(String title, this.path) : super(title);
}