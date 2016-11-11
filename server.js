var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.js');

var app = express();

app.use(bodyParser.json());


app.get('/api/users', function(req, res, next){
  console.log(req.query.language);
  var language = req.query.language;
  var age = req.query.age;
  var city = req.query.city;
  var state = req.query.state;
  var gender = req.query.gender;
  if(language){
    var result = users.filter(function(users){
      return users.language === language;
    });
    console.log(result);
    res.status(200).send(result);
  } else if(age){
    var ageResult = users.filter(function(users){
      return users.age == age;
    });
    console.log(ageResult);
    res.status(200).send(ageResult);
  } else if(city){
    var cityResult = users.filter(function(users){
      return users.city === city;
    });
    console.log(cityResult);
    res.status(200).send(cityResult);
  } else if(state){
    var stateResult = users.filter(function(users){
      return users.state === state;
    });
    console.log(stateResult);
    res.status(200).send(stateResult);
  } else if(gender){
    var genderResult = users.filter(function(users){
      return users.gender === gender;
    });
    console.log(genderResult);
    res.status(200).send(genderResult);
  }
  else{
    res.status(200).send(users);
  }
});

app.get('/api/users/:type', function(req, res, next){
  console.log(req.params.type);
  var type = req.params.type;
  var result = users.filter(function(users){
    return users.type === type;
  });
  res.status(200).send(result);
});

app.get('/api/user/:id', function(req, res, next){
  console.log(req.params.id);
  var id = parseInt(req.params.id);
  if(id <= users.length){
  var result = users.filter(function(users){
    return users.id === id;
  });
  res.status(200).send(result);
} else{
  res.status(404).send('user does not exist');
}
});

app.post('/api/users', function(req, res, next){
  console.log(req.body);
  req.body.id = users.length + 1;
  req.body.favorites = [];
  console.log(req.body);
  users.push(req.body);
  res.status(200).json(users);
});

app.post('/api/users/:type', function(req, res, next){
  console.log(req.params.type);
  console.log(req.body);
  req.body.id = users.length + 1;
  req.body.favorites = [];
  req.body.type = 'admin';
  console.log(req.body);
  users.push(req.body);
  res.status(200).json(users);
});

app.post('/api/users/language/:id', function(req, res, next){
  console.log(req.body.language);
  console.log(req.params.id);
  var id = req.params.id;
  var newLang = req.body;
  var result = users.filter(function(users){
    return users.id == id;
  });
  console.log(result[0].language);
  result[0].language = req.body.language;
  res.status(200).json(result);
});

app.post('/api/users/forums/:id', function(req, res, next){
  console.log(req.params.id);
  var id = req.params.id;
  var newForum = req.body.add;
  var result = users.filter(function(users){
    return users.id == id;
  });
  console.log(result[0].favorites);
  result[0].favorites.push(newForum);
  res.status(200).json(result);
});

app.delete('/api/users/forums/:id', function(req, res, next){
  console.log(req.params.id);
  console.log(req.query.favorite);
  console.log(users[0].id);
  var id = req.params.id;
  console.log(id);
  var fav = req.query.favorite;
  for(var i = users.length; i >= 0; i--){
    if(users[0].id == id){
      for(var j = users[0].favorites.length; i >= 0; i--){
        users[0].favorites[0].splice(j, 1);
      }
    }
  res.status(200).json(users);
}
});

app.delete('/api/users/:id', function(req, res, next){
  console.log(req.params.id);
  var id = req.params.id;
  var result = users.filter(function(users){
    return users.id != id;
  });
  console.log(result);
  res.status(200).json(result);
});

app.put('/api/users/:id', function(req, res, next){
  console.log(req.params.id);
  var id = req.params.id;
  for(var i = 0; i < users.length; i++){
    if(user[i].id == id){

    }
  }
});


app.listen(3000, function(){
  console.log('listening on port 3000...');
});
