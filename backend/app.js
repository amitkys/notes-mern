require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user');
const Note = require('./models/note'); 
const authenticateToken = require('./utilities');
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Error handling for malformed JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});


mongoose.connect(process.env.DB_CONNECTION_URI)
.then(() => {console.log('connected to db')}).catch((e) => console.log('error to connect db', e));

const url = `https://notes-mern-backend-ti1q.onrender.com`; // Replace with your Render URL
const interval = 600000; // Interval in milliseconds (30 seconds)

//Reloader Function
function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);

app.get('/', (req, res) => {
    res.json({message: 'hello from backend'});
});


app.post('/create-user', async (req, res) => {
    const {fullName, email, password} = req.body;
    // console.log(fullName, email, password);
    if(!fullName || !email || !password){
        return res.status(400).json({message: 'all fields are required'});
    }

    const isUserExist = await User.findOne({email: email})
    if(isUserExist){
        res.json({message: 'User exist already'});
    }

    const user = new User({fullName, email, password});
    await user.save();
    
    const userInfoForJWT = {_id: user._id, email: user.email};
    const accessToken = jwt.sign(userInfoForJWT, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '36000m'});
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Account created.",
    });
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: true, message: 'All fields are required' });
  }

  try {
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(404).json({ error: true, message: 'Email not found' });
    }

    if (userInfo.password !== password) {
      return res.status(401).json({ error: true, message: 'Invalid Credentials' });
    }

    const user = { _id: userInfo._id, email: userInfo.email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10h",
    });

    return res.json({
      error: false,
      message: "Login successful",
      email,
      accessToken,
    });
  } catch (e) {
    console.error('Error during login:', e.message);
    return res.status(500).json({ error: true, message: 'Server error' });
  }
});


app.post('/add-note', authenticateToken, async(req, res) => {
    const {title, content, tags} = req.body;
    const user = req.user;
    // console.log('from add note, this is user', user);

    if(!title) return res.status(400).json({error: true, message: 'title is required'});
    if(!content) return res.status(400).json({error: true, message: 'content is required'});

    try{
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: 'Notes added'
        });

    }catch(e){
        return res.status(400).json({
            error: true,
            message: 'Internal server error'
        });
    }
});
app.put('/edit-note/:noteId', authenticateToken, async(req, res) => {
    const noteId = req.params.noteId;
    const {title, content, tags, isPinned} = req.body;
    const user = req.user;

    if(!title || !content) return res.status(400).json({message: 'no change provided'});

    try{
        const note = await Note.findOne({_id: noteId, userId: user._id});
        if(!note){
            return res.status(404).json({error: true, message: 'notes not found'});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;
        
        await note.save();
        
        return res.json({
            error: false,
            note,
            message: 'notes updated successfully',
        });
        
    } catch(err){
        return res.status(400).json({
            error: true,
            message: 'Internal server issue',
        });
    }

});
app.get('/all-notes', authenticateToken, async (req, res) => {

    try{
        const user = req.user;
        const notes = await Note.find({userId: user._id}).sort({isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: 'all notes retrived succesfully',
        });

    }catch(err){

        return res.status(400).json({
            error: true,
            message: 'Internal server error',
        });
    }
});
app.delete('/delete-note/:noteId', authenticateToken, async(req, res) => {


    try{
        const noteId = req.params.noteId;
        const user = req.user;
        const isNotesExist = await Note.findOne({_id: noteId, userId: user._id});

        if(!isNotesExist){
            return res.status(400).json({
                error: true,
                message: 'Notes not found',
            });
        }
        await Note.deleteOne({_id: noteId, userId: user._id});
        
        return res.status(200).json({
            error: false,
            message: 'Notes deleted',
        });
    }
    catch(err){
        console.log('error', err);
        return res.status(400).json({
            error: true,
            message: 'Internal server error',
        });
    }
});
app.put('/update-note-ispinned/:noteId', authenticateToken, async(req, res) =>{
    const noteId = req.params.noteId;
    
    const {isPinned} = req.body;
    const user = req.user;

    try{
        const updatedNote = await Note.updateOne(
            { _id: noteId, userId: user._id },
            { isPinned }
        );

        // Check if the note was updated
        if (updatedNote.modifiedCount === 1) {
            return res.json({
                error: false,
                message: 'Note updated successfully',
            });
        }

        // Check if the note matched but was not updated
        if (updatedNote.matchedCount === 1) {
            return res.json({
                error: false,
                message: 'No changes were made. The value is already set.',
            });
        }

        // If no documents matched, the note was not found
        return res.status(404).json({
            error: true,
            message: 'Note not found or you do not have permission to update it',
        });
    }catch(e){
        return res.status(400).json({
            error: true,
            message: 'Internal server error',
        });
    }
});
app.get('/get-user', authenticateToken, async(req, res) => {
    // console.log('content inside req.user', req.user);
    // console.log('user from app file', user);
    // console.log('user id from app file', user._id);
    try{
        const user = req.user;
        const isUserExist = await User.findById(user._id);
        if(!isUserExist){
            return res.status(401).json({error: true, message: 'user not found'});
        }

        return res.json({
            error: false,
            user: {
                _id: isUserExist._id,
                name: isUserExist.fullName,
                email: isUserExist.email, 
            },
            message: 'user found',
        });
    }
    catch(error){
        console.log(`error while getting user info`, error);
        return res.status(401).json({
            error: true,
            message: 'Server error',
        });
    }
});
app.listen(process.env.PORT, ()=> {
    console.log(`app is live on ${process.env.PORT}`)
})
