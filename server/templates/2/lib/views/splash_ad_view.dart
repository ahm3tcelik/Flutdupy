import 'dart:io';

import 'package:admob_flutter/admob_flutter.dart';
import 'package:flutter/material.dart';
import 'package:global_configuration/global_configuration.dart';

import 'home.dart';

class SplashAdView extends StatefulWidget {
  @override
  _SplashAdViewState createState() => _SplashAdViewState();
}

class _SplashAdViewState extends State<SplashAdView> {
  GlobalConfiguration cfg = GlobalConfiguration();

  Widget root = Scaffold(body: Center(child: CircularProgressIndicator()));

  initializeAds(BuildContext context) {
    AdmobInterstitial splashAd;
    splashAd = AdmobInterstitial(
      adUnitId: Platform.isAndroid
          ? cfg.get('androidAdsSplashId')
          : cfg.get('iosAdsSplashId'),
      listener: (AdmobAdEvent event, Map<String, dynamic> args) {
        if (event == AdmobAdEvent.loaded) {
          splashAd.show();
        } else if (event == AdmobAdEvent.closed) {
          splashAd.dispose();
          setState(() {
            root = Home();
          });
        } else if (event == AdmobAdEvent.failedToLoad) {
          splashAd.dispose();
          setState(() {
            root = Home();
          });
        }
      },
    );
    splashAd.load();
  }

  @override
  void initState() {
    initializeAds(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return root;
  }
}
