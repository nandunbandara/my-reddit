//NandunBandara2016
(function(){
var app = angular.module('my-reddit', ['ionic','angularMoment'])

app.controller('RedditCtrl', function($http, $scope){ //links data into content
    $scope.stories = [];
    
    function loadStories(params, callback){
        $http.get('http://www.reddit.com/r/Android/new/.json', {params: params})
        .success(function(response){
            var stories = []; //store stories within the function
            angular.forEach(response.data.children, function(child){
                stories.push(child.data); //push data into the created stories array within the function
            });
            callback(stories); //callback function with the created stories array
        });
    }//loadStories
        
        //getting older stories
    $scope.loadOlderStories = function(){
        var params = {};
        if($scope.stories.length>0){
            params['after'] = $scope.stories[$scope.stories.length-1].name;
        }
            loadStories(params, function(olderStories){
                $scope.stories = $scope.stories.concat(olderStories); 
                $scope.$broadcast('scroll.infiniteScrollComplete'); //concat with the previous array of stories - added at the end
            });
    }//loadOlderStories
        //getting newer stories
    $scope.loadNewerStories = function(){
        var params = {'before': $scope.stories[0].name};
        loadStories(params, function(newerStories){
           $scope.stories = newerStories.concat($scope.stories); //the newer stories added infront  - concat on the older array
        });
    } //loadNewerStories
    //openLink
    $scope.openLink = function(url){
        window.open(url,"_blank");
    };
}); //app.controller

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


      cordova.plugins.Keyboard.disableScroll(true);
    }
      if(window.cordova && window.cordova.InAppBrowser){
       window.open = window.cordova.InAppBrowser.open;   
      }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}()) //function called