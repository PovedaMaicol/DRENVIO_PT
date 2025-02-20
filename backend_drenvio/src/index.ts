import express from 'express';


const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (req, res) => {
    console.log("i'm here")
    res.send('hello world');
 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});