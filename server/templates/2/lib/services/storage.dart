import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:localstorage/localstorage.dart';

class StorageService {
  firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;

  Future listFiles() async {
    final LocalStorage storage = LocalStorage('sounds');
    firebase_storage.ListResult result =
        await firebase_storage.FirebaseStorage.instance.ref().listAll();

    String url;
    List list = List();
    List<firebase_storage.Reference> refs = result.items;
    await Future.forEach(refs, (firebase_storage.Reference ref) async {
      url = await ref.getDownloadURL();
      list.add({"title": ref.name, "url": url});
    });
    await storage.setItem('sounds', list);
  }
}
