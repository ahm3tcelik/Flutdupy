import 'dart:convert';
import 'package:admob_flutter/admob_flutter.dart';
import 'package:flutter/material.dart';
import 'package:global_configuration/global_configuration.dart';
import 'package:template_1/views/splash_ad_view.dart';
import 'models/sound.dart';

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
    future: initializeApp(context),
    builder: (context, snapshot) {
      return snapshot.connectionState == ConnectionState.waiting ?
          Scaffold(body: Center(child: CircularProgressIndicator())) :
          SplashAdView();
    }
  );
}

Future initializeApp(BuildContext context) async {
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
    soundList.add(Sound(title, e));
  });
}