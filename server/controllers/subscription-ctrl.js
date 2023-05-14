const Subscription = require('../models/subscription-model')

createSubscription = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a subscription',
        })
    }

    const subscription = new Subscription(body)

    if (!subscription) {
        return res.status(400).json({ success: false, error: err })
    }

    subscription
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: subscription._id,
                message: 'Subscription created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Subscription not created!',
            })
        })
}

updateSubscription = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Subscription.findOne({ _id: req.params.id }, (err, subscription) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Subscription not found!',
            })
        }
        subscription.name = body.name
        subscription.time = body.time
        subscription.rating = body.rating
        subscription
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: subscription._id,
                    message: 'Subscription updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Subscription not updated!',
                })
            })
    })
}

deleteSubscription = async (req, res) => {
    await Subscription.findOneAndDelete({ _id: req.params.id }, (err, subscription) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, error: `Subscription not found` })
        }

        return res.status(200).json({ success: true, data: subscription })
    }).catch(err => console.log(err))
}

getSubscriptionById = async (req, res) => {
    const allSubscriptions = await Subscription.findOne({ _id: req.params.id })
    res.status(200).send({
        status: 'Success',
        data: allSubscriptions,
    })
}

getSubscriptions = async (req, res) => {
    const allSubscriptions = await Subscription.find({})
    res.status(200).send({
        status: 'Success',
        data: allSubscriptions,
    })
    }

module.exports = {
    createSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptions,
    getSubscriptionById,
}