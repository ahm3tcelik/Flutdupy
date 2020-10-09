import 'dart:async';

class AdService {
  final streamController = StreamController.broadcast();
  int ads_counter = 5;

  Stream get getStream => streamController.stream;

  int get getCounter => ads_counter;

  changeCounter(int newValue) {
    ads_counter = newValue;
    streamController.sink.add(ads_counter);
  }

  void dispose() {
    streamController.close();
  }
}
AdService adService = AdService();