const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(error => console.log(error));

const AdminRouter = require('./routes/Admin');
app.use('/Admin', AdminRouter);

const CodingRouter = require('./routes/Coding');
app.use('/Coding', CodingRouter);

const CourseRouter = require('./routes/Course');
app.use('/Course', CourseRouter);

const CourseComponentRouter = require('./routes/CourseComponent');
app.use('/CourseComponent', CourseComponentRouter);

const DocumentRouter = require('./routes/Document');
app.use('/Document', DocumentRouter);

const EnrolledCourseRouter = require('./routes/EnrolledCourse');
app.use('/EnrolledCourse', EnrolledCourseRouter);

const QuestionRouter = require('./routes/Question');
app.use('/Question', QuestionRouter);

const QuizRouter = require('./routes/Quiz');
app.use('/Quiz', QuizRouter);

const StudentRouter = require('./routes/Student');
app.use('/Student', StudentRouter);

const TeacherRouter = require('./routes/Teacher');
app.use('/Teacher', TeacherRouter);

const VideoRouter = require('./routes/Video');
app.use('/Video', VideoRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is up and running on the port ${PORT}`);
});