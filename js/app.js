fs = require("fs")
var woolfApp = angular.module('woolfApp', []);

woolfApp.controller('woolfController', function woolfController($scope) {
  path = "/Users/tian.jin/Documents/log"

  // Initialize Woolf.
  fs.readdir(path, function(err, items) {
    // Sort file names (which are essentially date
    // strings) such that later dates appear
    // first.
    items.sort(function(a, b) {
      _a = a.replace(".log.md", "").split('-');
      _b = b.replace(".log.md", "").split('-');
      _a = [_a[2], _a[0], _a[1]].join("");
      _b = [_b[2], _b[0], _b[1]].join("");
      return _a > _b ? -1 : _a < _b ? 1 : 0;
    });
    // Postprocess file names for better
    // readability.
    items = items.filter(function(fn) {
      return fn.includes(".log.md");
    });
    items = items.map(function(fn) {
      return fn.replace(".log.md", "");
    })
    $scope.files = items;
    $scope.$apply();
  });

  // Respond to click on file entries
  $scope.loadFile = function(file) {
    $scope.selectedFileName = file;
    $(this).addClass("active");
    fs.readFile(path + "/" + file + ".log.md", 'utf8', function(err, data) {
      $("#text-display").html(marked(data));
      $('#text-display').find('*').css('-webkit-user-select', 'text');
      $("#text-edit").val(data);
    });
  };

  $scope.isFileNameSelected = function(fileName) {
    return $scope.selectedFileName === fileName;
  }
});