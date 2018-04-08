
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); // server = server.js
const {Todo} = require('./../models/todos');

// // Assuming the database is empty! So we need to set before each - empty database
// beforeEach((done)=>{ // Will remove all data from database before each test. before each "it"
//   Todo.remove({}).then(()=>{
//     done();
//   })
// })

const todos = [{
  text: "First test todo"
}, {
  text: "second test todo"
}];
// SOem tests need to have data in database, so we build here a known to us database
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
});


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
