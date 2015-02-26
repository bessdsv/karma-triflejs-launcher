var fs = require("fs"),
    dirname = "TrifleJS",
    filename = dirname + ".Latest.zip",
    path = require("path"),
    request = require("request"),
    unzip = require("unzip"),
    zipname;

deleteFolderRecursive = function(path) {
  var files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(dirname);
fs.mkdirSync(dirname);
zipname = path.join(dirname, filename);

request.get('https://raw.github.com/sdesalas/trifleJS/master/Build/Binary/' + filename).pipe(fs.createWriteStream(zipname)).on('close', function() {
  fs.createReadStream(zipname).pipe(
    unzip.Extract({ path: dirname }).on('close', function(){
      fs.unlinkSync(zipname);
    })
  );

});