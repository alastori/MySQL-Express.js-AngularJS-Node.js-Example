var mysql = require('@mysql/xdevapi'); 
var config = {
    host: 'localhost',
    port: '33060',
    userid: 'root',
    password: 'Root#123',
    schema: 'mysqlNews',
    collection: 'news'
};

exports.getAll = function (cb) {
  mysql.getSession({
    host: config.host,
    port: config.port,
    dbUser: config.userid,
    dbPassword: config.password
  }).then(function (session) {
    var schema = session.getSchema(config.schema);
    var coll = schema.getCollection(config.collection);
    var docs = [];
    coll.find().execute(function (news) {
      docs.push(news);
    }).then(function (result) {
      if (docs.length > 0) {
        cb(null, docs)
        session.close();
      } else {
        cb('No data found', null);
        session.close();
      }
    });
  });
}

exports.addComment = function (data, cb) {
  mysql.getSession({
    host: config.host,
    port: config.port,
    dbUser: config.userid,
    dbPassword: config.password
  }).then(function (session) {
    var schema = session.getSchema(config.schema);
    var coll = schema.getCollection(config.collection);
    coll.modify('$._id == \'' + data.id + '\'')
        .arrayAppend('$.comments', data.comment)
        .execute().then(function (updated) {
          if (updated.getAffectedRowsCount() > 0) {
            cb(null, data.comment);
          }
          else {
            cb('Comment not added', null);
          }
        });
  });
}

exports.create = function (data, cb) {
  mysql.getSession({
    host: config.host,
    port: config.port,
    dbUser: config.userid,
    dbPassword: config.password
  }).then(function (session) {
    var schema = session.getSchema(config.schema);
    var coll = schema.getCollection(config.collection);
    var hasresult = false;
    coll.add(data).execute().then(function (news) {
      if (news.getAffectedRowsCount() > 0) {
        coll.find('$._id == \'' + news.getDocumentId() + '\'')
          .execute(function (newDoc) {
            hasresult = true;
            cb(null, newDoc);
            session.close();
          }).then(function (result) {
            if (!hasresult) {
              cb('No data found', null);
              session.close();
            }
          });
      } else {
        cb('Document not added', null);
        session.close();
      }
    });
  });
}

