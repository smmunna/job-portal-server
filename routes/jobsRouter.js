const router = require('express').Router()
const jobModel = require('../models/jobSchema')

// Search using regex parameter;
router.get('/search', async (req, res) => {
    const searchQuery = req.query.title
    const regexPattern = new RegExp(searchQuery, 'i')
    const results = await jobModel.find({ title: regexPattern });
    res.send(results);
})

// Delete Individual Post by Admin
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await jobModel.deleteOne({ _id: id })
    res.send(result)
})

// Update Individual Post
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const title = req.body.title;
    const result = await jobModel.updateOne({ _id: id }, {
        $set: {
            title: title
        }
    })
    res.send(result)
})

// Get individual job Post
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await jobModel.findOne({ _id: id })
    res.send(result)
})

// For adding the Job Post
router.post('/', async (req, res) => {
    try {
        const jobs = jobModel(req.body);
        const jobsPost = await jobs.save();
        res.send({
            message: "Data Inserted Successfully",
            jobsPost
        })
    } catch (error) {
        res.send({
            error: "Something went wrong..",
            message: error.message
        })
    }
})

// Getting all the job post
router.get('/', async (req, res) => {
    const query = req.query;
    const result = await jobModel.find(query)
    res.send(result)
})

module.exports = router