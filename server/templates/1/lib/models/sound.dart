class Sound {
  final String title;
  final String path;

  Sound(this.title, this.path);

  @override
  String toString() {
    return title + ' | ' + path;
  }
}

List<Sound> soundList = [];