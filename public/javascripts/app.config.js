angular.
    module('mysqlNews').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.
                when('/news', {
                    template: '<news-list></news-list>'
                }).
                when('/comments/:_Id', {
                    template: '<new-comment></new-comment>'
                }).
                when('/addnews', {
                    template: '<add-news></add-news>'
                }).
                otherwise('/news');
            }
    ]);

