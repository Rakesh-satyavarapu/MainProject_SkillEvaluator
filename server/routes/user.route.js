let express = require('express')

let{registeredSkill,withdrawSkill,getUserDetails} = require('../controllers/user.controller')
let {randomTestQuestions,submitTest,getTestHistoryBySkill,getAttemptById} = require('../controllers/test.controller');
let {chatWithGemini,chatHistory} = require('../controllers/chat.controller')

let router = express.Router()

router.post('/skillRegister',registeredSkill)
router.post('/skillWithdraw',withdrawSkill)
router.post('/takeTest',randomTestQuestions);
router.post('/submitTestAnswers',submitTest);
router.post('/chat', chatWithGemini);
router.get('/chatHistory', chatHistory);
router.get('/skill/:skillId/testHistory', getTestHistoryBySkill);
router.get('/attempt/:attemptId', getAttemptById);
router.get("/:userId", getUserDetails);

module.exports = router