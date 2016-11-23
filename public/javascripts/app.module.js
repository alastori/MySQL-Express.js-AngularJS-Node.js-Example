var mysqlNewsApp = angular.module('mysqlNews', ['ngRoute', 'newsList', 'newComment', 'addNews']);

mysqlNewsApp.factory('newsFactory', ['$http', '$location', '$filter', 
                     function ($http, $location, $filter) {
    var newsFactory = { news: [] };

    newsFactory.getAll = function () {
        return $http.get('/news').success(function (data) {
            angular.copy(data, newsFactory.news);
        });
    };

    newsFactory.addComment = function (data) {
        return $http.post('/comments/:_Id', data).success(function (comment) {
            var result = $filter('filter')(newsFactory.news, { _id: data.id })[0];
            result.comments.push(comment);
            $location.path('/');
        });
    };

    newsFactory.cancelAddComment = function () {
        $location.path('/');
    };

    newsFactory.createNews = function (news) {
        return $http.post('/addnews', news).success(function (data) {
            newsFactory.news.push(data);
            $location.path('/');
        });
    };

    newsFactory.cancelAddNews = function () {
        $location.path('/');
    };

    return newsFactory;
}]);
