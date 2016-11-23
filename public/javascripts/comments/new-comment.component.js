angular.
    module('newComment').
    component('newComment', {
      templateUrl: '/javascripts/comments/new-comment.template.html',
      controller: ['$routeParams', 'newsFactory',
          function NewCommentController($routeParams, newsFactory) {
            this.postId = $routeParams._Id;

            this.addComment = function () {
              if (!this.postId || (!this.comment || this.comment === "")) { return; }
              newsFactory.addComment({ id: this.postId, comment: this.comment });
            };

            this.cancelAddComment = function () {
              this.comment = '', this.postId = '';
              newsFactory.cancelAddComment();
            };
          }
      ]
    });
