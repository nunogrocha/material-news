app.controller('NavCtrl', ['$scope','auth',function($scope, auth){
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.logOut = auth.logOut;
}]);

app.controller('MainCtrl', ['$scope','posts','auth','$mdDialog', function($scope, posts, auth,$mdDialog){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.posts = posts.posts;

    $scope.firstletter = function(title){
        return title.charAt(0);
    }

    $scope.incrementUpvotes = function(post) {
        posts.upvote(post);
    };

    $scope.decrementUpvotes = function(post) {
        posts.deupvote(post);
    };

    $scope.showAddDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/dialogAdd.tmpl.html',
            targetEvent: ev,
        })
        .then(function(answer) {
            console.log('You said the information was ');
        }, function() {
            console.log('closed');
        });
    };

}]);

function DialogController(posts,auth,$scope,$mdDialog) {
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') { return; }
        posts.create({
            title: $scope.title,
            link: $scope.link,
            date: new Date().getTime(),
            color: getRngColor(),
            message: $scope.message,
        });
        $scope.title = '';
        $scope.link = '';
        $mdDialog.hide();
    };
}

app.controller('PostsCtrl', ['$scope','$stateParams','posts','post','auth', function($scope, $stateParams, posts, post, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.post = post;

    $scope.incrementUpvotes = function(comment){
        posts.upvoteComment(post, comment);
    };
    $scope.decrementUpvotes = function(comment){
        posts.decrementUpvotes(post, comment);
    };
    $scope.addComment = function(){
        if($scope.body === '') { return; }
        posts.addComment(post._id, {
            body: $scope.body,
            author: 'user',
            date: new Date().getTime(),
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };
}]);

app.controller('AuthCtrl', ['$scope','$state','auth', function($scope, $state, auth){
    $scope.user = {};

    $scope.register = function(){
        auth.register($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('home');
        });
    };

    $scope.logIn = function(){
        auth.logIn($scope.user).error(function(error){
            $scope.error = error;
        }).then(function(){
            $state.go('home');
        });
    };
}])

function getRngColor(){
    var colors = ['#795548','#FF5722','#4CAF50','#03A9F4','#009688','#673AB7','#F44336','#E91E63','#9C27B0'];
    var rng = Math.round(Math.random() * 8);
    return colors[rng];
}
