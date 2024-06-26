const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async(req, res)=>{
    console.log(req);
    try{
        const questions = await Question.find();
        res.json(questions);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const question = await Question.findById(req.params.id);
        res.json(question);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', async(req, res)=>{
    const { quizid, problem, image, answer, wronganswer1, wronganswer2, wronganswer3, marks } = req.body;
    const question = new Question(
        {
            quizid,
            problem,
            image,
            answer,
            wronganswer1,
            wronganswer2,
            wronganswer3,
            marks
        }
    )
    try{
        const newquestion = await question.save();
        res.status(201).json(newquestion);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const updateQuestion = await Question.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(updateQuestion);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const response = await Question.findByIdAndDelete(req.params.id);
        res.status(201).json(response);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.get('/quiz/:quizid', async (req, res)=>{
    const quizid = req.params.quizid;
    console.log(quizid);
    try{
        const response = await Question.find({"quizid":quizid});
        res.status(201).json(response);
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

module.exports = router;