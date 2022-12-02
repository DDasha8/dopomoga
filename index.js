import express from 'express';
import multer from 'multer';
import mongo from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from "cors";

import {registerValidation, loginValidation} from './Validation/auth.js'
import {organizationValidation} from './Validation/organization.js'
import {donateCreateValidation} from './Validation/donate.js'
import {postCreateValidation} from './Validation/post.js'

import * as Organization from './Controllers/OrganizationController.js'
import * as AuthController from './Controllers/AuthController.js'
import * as UserController from './Controllers/UserController.js'
import * as PostController from './Controllers/PostController.js'
import * as Donate from "./Controllers/DonateController.js";

import validationErrors from "./Validation/validationErrors.js";
import checkAuth from './Util/checkAuth.js'
dotenv.config()
mongo
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error", err))

const app = express();

app.use(cors())

const storage = multer.diskStorage({
    destination: (a, b, callback)=>{
        callback(null, 'uploads')
    },
    filename: (a, file, callback)=>{
        callback(null, file.originalname)
    },
})
const upload = multer({storage})

app.use(express.json());

app.use('/upload', checkAuth, upload.single('image'), (req, res)=>{
    res.json({
        url: '/uploads/${req.file.originalname}'
    })
});
app.use('/uploads', express.static('uploads'));


app.post('/reg', loginValidation, AuthController.register);
app.post('/login', loginValidation, AuthController.login);
app.put('/:id', loginValidation, UserController.update);
app.delete('/:id', loginValidation, UserController.deleteUser);
app.get('/:id', loginValidation, UserController.getOne);
app.put('/:id/follow', loginValidation, UserController.follow);
app.put('/:id/unfollow', loginValidation, UserController.unfollow);
// app.get('/me', checkAuth, UserController.getMe);


app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.get('/posts/:id', PostController.getOne);
app.get('/posts', PostController.getAll);
app.put('/posts/:id', postCreateValidation, PostController.update);
app.put('/posts/:id/like', postCreateValidation, PostController.like);

app.post('/organization',checkAuth, organizationValidation, Organization.create);
app.get('/organization/:id', checkAuth, Organization.remove);
app.get('/organization/:id', Organization.getOne);
app.get('/organization', Organization.getAll);
app.get('/organization', checkAuth, organizationValidation, Organization.update);

app.post('/donate',checkAuth, donateCreateValidation, Donate.create);
app.get('/donate/:id', checkAuth, Donate.remove);
app.get('/donate/:id', Donate.getOne);
app.get('/donate', Donate.getAll);
app.get('/donate', checkAuth, donateCreateValidation, Donate.update);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});