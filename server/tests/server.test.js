
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); // server = server.js
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos ,users , populateUsers} = require('./seed/seed')
// // Assuming the database is empty! So we need to set before each - empty database
// beforeEach((done)=>{ // Will remove all data from database before each test. before each "it"
//   Todo.remove({}).then(()=>{
//     done();
//   })
// })

// SOem tests need to have data in database, so we build here a known to us database
beforeEach(populateUsers);
beforeEach(populateTodos);



describe('Post / todos' , ()=>{
  it('should create a new todo' , (done)=>{
    var text = 'Test todo test';

    request(app)
      .post('/todos')
      .send({text}) // Both are making the request and sending the text. Supertest make the text a json for us
      .expect(200)
      .expect((res)=>{ //Can get the res and check it.
        expect(res.body.text).toBe(text); // Make sure the res and the text I sent are the same
      })
      .end((err, res)=>{ // Checking now the database, if it got saved
        if (err){
          return done(err); // return doesnt do any thing, just stops the function
        }

        Todo.find({text}).then((todos)=>{ // Brings back an array with all the todos
          expect(todos.length).toBe(1); // We added only one todo, so length should be 1
          expect(todos[0].text).toBe(text); // Checks that the texts are matching
          done(); // Will pass the tests any way, that's why i need to add a catch
        }).catch((e)=>{
          done(e);
        }); // ftching all the todos

      })
  });

  // second test - Making sure no data is created when we send bad database
  it('Should not create todo with invalid body-data' , (done)=>{
    var text="";
    request(app)
      .post('/todos')
      .send({text}) //sending emmpy test
      .expect(400)
      .end((err, res)=>{ // Checking now the database, if it got saved
        if (err){
          return done(err); // return doesnt do any thing, just stops the function
        }

        Todo.find().then((todos)=>{ // Brings back an array with all the todos
          expect(todos.length).toBe(2); // We added only one todo, so length should be 0 - new test - known data base - 2
          done(); // Will pass the tests any way, that's why i need to add a catch
        }).catch((e)=>{
          done(e);
        }); // ftching all the todos

      })
  });

  describe('Get / todos' , ()=>{
    it('Should get all todos' , (done)=>{
      request(app)
        .get('/todos')
        .expect(200) // checking whatcomes back
        .expect((res)=>{ // expecting something about the body - async
            expect(res.body.todos.length).toBe(2);
        })
        .end(done); // No need to give here a function like above, because nothing here is esynchronize
    })
  });
});

describe("GET /todos/id" , ()=>{
  it('Should return todo doc', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('Should return 404 if to do not found', (done)=>{
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  })
  it('Should return 404 if non-object ids', (done)=>{
    var id = '123';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  })
});

// Tesing delete
describe("Delete /todos/id" , ()=>{
  it('Should remove a todo doc', (done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`) // Deleting the secod todo iteam
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos._id).toBe(hexId);
      })
      .end((err,res)=>{
        if (err){
          return done(err);
        }
        Todo.findById(hexId).then((todos)=>{ // Brings back an array with all the todos
          expect(todos).toNotExist();
          done(); // Will pass the tests any way, that's why i need to add a catch
        }).catch((e)=>{
          done(e);
        }); // ftching all the todos
      });
  });
  it('Should return 404 if to do not found', (done)=>{
    var id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  })
  it('Should return 404 if non-object ids', (done)=>{
    var id = '123';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  })
});

// Tesing Update
describe("Update /todos/id" , ()=>{
  it('Should update the todo' , (done)=>{
        var hexId = todos[0]._id.toHexString();
        var text = 'Tesing Text';

        request(app)
          .patch(`/todos/${hexId}`)
          .send({
            completed: true,
            text : text
          })
          .expect(200)
          .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
          })
          .end(done);
  });

  it('Should clear completedAt when  the todo is not completed' , (done)=>{
        var hexId = todos[1]._id.toHexString();
        var text = 'Tesing Text';

        request(app)
          .patch(`/todos/${hexId}`)
          .send({
            completed: false,
            text : text
          })
          .expect(200)
          .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
          })
          .end(done);

  });
});

describe('For Get/users/me', () =>{
  it('Should return user if authenticated', (done)=>{ // Adding done when it's asyncronize test
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token) // Setting a header - From the user we created in the seed file
      // Here stating to set athartions of what should happen -
      .expect(200)
      .expect((res) =>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users' , () => {
  it('Should create a user' , (done) => {
    var email = 'ex@ex.com';
    var pass = '123mnb!';

    request(app)
      .post('/users')
      .send({email,pass})
      .expect(200)
      .expect((res) => { //Expectiong the the following functions doesn't throw any errors! + return what we expect
        expect(res.headers['x-auth']).toExist(); //Header has a - in it, to we need to use ['']
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => { //Quering the Databse - checking that after the callsbackare finished - the data is saved in database
        if (err)
          return done(err);

        User.findOne({email}).then((user) =>{ //Find the email in the database we just saved
          expect(user).toExist(); // user should be saved in database
          expect(user.password).toNotBe(pass); // Because the pass was hashed
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should return validation error if request invalid' , (done) => {
    var email = 'exex1.com';
    var pass = '123';

    request(app)
      .post('/users')
      .send({email, pass})
      .expect(400)
      .end(done);
  });

  it('Should not create user if user in Use' , (done) => {
    var email = users[0].email;
    var pass = '123456';

    request(app)
      .post('/users')
      .send({email, pass})
      .expect(400)
      .end(done);
  });
});
 describe('Post users/me/login', () => {
   it('Should login user and return auth token' , (done)=>{
     request(app)
      .post('/users/me/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) =>{ //custom expect function we make
        expect(res.header['x-auth']).toExist();
      })
      .end((err,res) =>{ //quering the database
        if (err)
          return done(err);
        User.findById(users[1]._id).then((user) =>{
          expect(user.tokens[0]).toInclude({ //Make sure the created user has! a token values, doesn't matter which
            access: 'auth' ,
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
   });

   it('Should reject invalid login' , (done)=>{
     request(app)
      .post('/users/me/login')
      .send({
        email: users[1].email,
        password: 123
      })
      .expect(400)
      .expect((res) =>{ //custom expect function we make
        expect(res.header['x-auth']).toNotExist();
      })
      .end((err,res) =>{ //quering the database
        if (err)
          return done(err);
        User.findById(users[1]._id).then((user) =>{
          expect(user.tokens.length == 0);
          done();
        }).catch((e) => done(e));
      });
   });
 });
