import 'sound.dart';

class CloudSound extends Sound {
  final String url;
  CloudSound(String title, this.url) : super(title);
  @override
  String toString() {
    // TODO: implement toString
    return super.title + ' : ' + url;
  }

  toJson() {
    Map<String, dynamic> map = Map();
    map['title'] = super.title;
    map['url'] = this.url;
  }
}