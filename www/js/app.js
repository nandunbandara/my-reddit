(function(){
var app = angular.module('my-reddit', ['ionic'])

app.controller('RedditCtrl', function($http, $scope){ //links data into content
   $scope.stories = [];
    $http.get('http://www.reddit.com/r/Android/new/.json')
        .success(function(response){
            angular.forEach(response.data.children, function(child){
                console.log(child.data);
               $scope.stories.push(child.data); 
            });
    });
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}()) //function called