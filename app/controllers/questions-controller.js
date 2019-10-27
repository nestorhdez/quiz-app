const QuestionModel = require('../models/question-model');

const getQuestions = (req, res) => {
    QuestionModel.find()
        .then(questions => res.json({res: questions}) )
        .catch(error => res.status(404).json(error) );
}

const getQuestionById = (req, res) => {
    QuestionModel.findById(req.params.id)
        .then( question => res.json({data: question}) )
        .catch(error => res.status(404).json(error) );
}

const postQuestion = (req, res) => {
    req.body.status = 'published';
    const newQuestion = new QuestionModel(req.body);
    newQuestion.save()
        .then(() => res.json({res: newQuestion}) )
        .catch(error => res.status(404).json(error) );
}

const editQuestion = (req, res) => {
    QuestionModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(question => res.json({res: question}) )
        .catch(error => res.status(404).json(error) );
}

const deleteQuestion = (req, res) => {
    QuestionModel.findOneAndDelete({_id: req.params.id})
        .then(question => res.send({res: question}) )
        .catch(error => res.status(404).json(error) );
}

module.exports = {
    getQuestions,
    getQuestionById,
    postQuestion,
    editQuestion,
    deleteQuestion
}