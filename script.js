function main() {
  // set DSTA accounts if DSTA accounts are not owners of folders, so that the editor permission is not removed.
  let DSTA_USERS = ['okaiyong@gmail.com', 'okyspace@gmail.com'];

  // get all folders in GDrive
  var folders = DriveApp.getFolders();

  // get editors from each folder, remove them if is not DSTA list and add them as viewer instead
  while (folders.hasNext()) {
    var folder = folders.next();
    var editors = folder.getEditors();
    Logger.log('FolderName: ' + folder.getName());

    // proceed if the folder does not have prefix "submission"
    if (folder.getName().indexOf('submission') > -1) {
      Logger.log('    Editors before removed: ' + folder.getEditors().length);
      for (let i=0; i < editors.length; i++) {
        e = editors[i].getEmail();
        Logger.log('    Editors of folder: ' + e);

        if (DSTA_USERS.indexOf(e) <= -1) {
          // Logger.log('user not from DSTA');
          // remove user as editor
          folder.removeEditor(e);
          // add user as viewer
          folder.addViewer(e);
        }
      }
      Logger.log('    Editors after removed: ' + folder.getEditors().length);
      Logger.log('    Viewers: ' + folder.getViewers().length);
    }
  }
  Logger.log('Script ended .....');
}
