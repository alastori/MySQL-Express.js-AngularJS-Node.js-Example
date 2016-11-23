angular.module('newsList')
    .component('newsList', {
        templateUrl: '/javascripts/newsList/news-list.template.html',
        controller: function MySqlNewsController(newsFactory) {
            this.news = newsFactory.news;
            newsFactory.getAll();
            this.order = 'published';
        }
    });

