
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); // server = server.js
const {Todo} = require('./../models/todos');

// Assuming the database is empty! So we need to set before each - empty database
beforeEach((done)=>{ // Will remove all data from database before each test. before each "it"
  Todo.remove({}).then(()=>{
    done();
  })
})
describe('Post / todos' , ()=>{
  it('shhould create a new todo' , (done)=>{
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

        Todo.find().then((todos)=>{ // Brings back an array with all the todos
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
          expect(todos.length).toBe(0); // We added only one todo, so length should be 0
          done(); // Will pass the tests any way, that's why i need to add a catch
        }).catch((e)=>{
          done(e);
        }); // ftching all the todos

      })
  });
});
