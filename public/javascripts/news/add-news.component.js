angular.
    module('addNews').
    component('addNews', {
      templateUrl: '/javascripts/news/add-news.template.html',
      controller: ['$routeParams', 'newsFactory',
          function NewsController($routeParams, newsFactory) {
            this.addNews = function () {
              if ((!this.title || this.title === '') ||
                  (!this.link || this.link === '') ||
                  (!this.introduction || this.introduction === '')) { return; }
              var currDate = new Date();
              var news = {
                title: this.title,
                link: this.link,
                introduction: this.introduction,
                published: new Date(currDate.getFullYear(),
                                    currDate.getMonth(),
                                    currDate.getDay()).toDateString(),
                comments: []
              };
              newsFactory.createNews(news);
            };

            this.cancelAddNews = function () {
              this.title = '', this.link = '', this.introduction = '';
              newsFactory.cancelAddNews();
            };
          }
      ]
    });
