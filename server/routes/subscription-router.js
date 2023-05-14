const express = require('express')

const SubscriptionCtrl = require('../controllers/subscription-ctrl')

const router = express.Router()

router.post('/subscription', SubscriptionCtrl.createSubscription)
router.put('/subscription/:id', SubscriptionCtrl.updateSubscription)
router.delete('/subscription/:id', SubscriptionCtrl.deleteSubscription)
router.get('/subscription/:id', SubscriptionCtrl.getSubscriptionById)
router.get('/subscriptions', SubscriptionCtrl.getSubscriptions)

module.exports = router