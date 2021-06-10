import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import uuid from 'uuid';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/todos/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('todosDatabase');
        
        const todoInfo = await db.collection('todos').findOne({ id });

        if(todoInfo){
            res.status(200).json(todoInfo);
        } else{
            res.status(400).json({ message: 'There is no todo with that id' });
        }

        client.close();
    } catch(e){
        res.status(500).json({ message: 'Error connecting to db', e });
    }
})

app.get('/api/todos', async (req, res) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('todosDatabase');
    
        const todos =  await db.collection('todos').find({}).toArray();
    
        res.status(200).json(todos);
    
        client.close();
    } catch(e){
        res.status(500).json({ message: 'Error connecting to db', e })
    }
});

app.post('/api/todos', async (req, res) => {
    try{
        const { text } = req.body;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('todosDatabase');

        if (text) {
            const insertedTodo = {
                id: uuid(),
                createdAt: Date.now(),
                isCompleted: false,
                text,
            }
        await db.collection('todos').insertOne(insertedTodo);
        res.status(200).json(insertedTodo);
        } else {
            res.status(400).json({ message: 'Request body should have a text property' });
        }
        client.close();
    } catch(e){
        res.status(500).json({ message: 'Error connecting to db', e });
    }
});

app.post('/api/todos/:id/completed', async (req, res) => {
    try{
        const { id } = req.params;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('todosDatabase');

        const todoMarkedAsCompleted = await db.collection('todos').updateOne({ id }, { $set: { isCompleted: true } });

        if(todoMarkedAsCompleted){
            res.status(200).json(todoMarkedAsCompleted);
        } else{
            res.status(400).json({ message: 'There is no todo with that id' });
        }
    } catch(e){
        res.status(500).json({ message: 'Error connecting to db', e });
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('todosDatabase');
    
        const removedTodo = await db.collection('todos').deleteOne({ id });

        if(removedTodo){
            res.status(200).json(removedTodo);
        } else{
            res.status(400).json({ message: 'There is no todo with that id' })
        }
    } catch(e){
        res.status(500).json({ message: 'Error connecting to db', e });
    }
    
});

app.listen(8080, () => console.log("Server listening on port 8080"));
