import 'dart:convert';
import 'package:admob_flutter/admob_flutter.dart';
import 'package:cloud_music_player/models/asset_sound.dart';
import 'package:cloud_music_player/models/cloud_sound.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:global_configuration/global_configuration.dart';
import 'package:localstorage/localstorage.dart';
import 'models/sound.dart';
import 'services/storage.dart';
import 'views/splash_ad_view.dart';

void  main() {
  WidgetsFlutterBinding.ensureInitialized();
  Admob.initialize();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      debugShowMaterialGrid: false,
      showSemanticsDebugger: false,
      title: "Sounds",
      home: buildLoadSettings(context),
    );
  }
}

Widget buildLoadSettings(BuildContext context) {
  return FutureBuilder(
      future: initializeApp(context).timeout(Duration(seconds: 6)),
      builder: (context, snapshot) {
        print(snapshot.connectionState.toString());
        return snapshot.connectionState == ConnectionState.waiting ?
        Scaffold(body: Center(child: CircularProgressIndicator())) :
        SplashAdView();
      }
  );
}

Future initializeApp(BuildContext context) async {

  final LocalStorage storage = new LocalStorage('sounds');

  // Set config
  await GlobalConfiguration().loadFromAsset('settings');

  // Read assets folder
  final manifestContent =
  await DefaultAssetBundle.of(context).loadString('AssetManifest.json');

  final Map<String, dynamic> manifestMap = json.decode(manifestContent);

  String title = "";
  manifestMap.keys.where((String key) => key.startsWith('assets/sounds'))
      .forEach((String e) {
    title = Uri.decodeFull(e.replaceFirst('assets/sounds/', '')
        .replaceAll('.mp3', ''));
    soundList.add(AssetSound(title, e));
  });
  await Firebase.initializeApp();
  var storageSounds = storage.getItem('sounds');

  if(storageSounds == null) {
    await StorageService().listFiles();
    storageSounds = storage.getItem('sounds');
  }
  else {
    print("******************");
  }

  storageSounds.forEach((element) {
    soundList.add(CloudSound((element['title'] as String).replaceAll('.mp3', '') , element['url']));
  });

}