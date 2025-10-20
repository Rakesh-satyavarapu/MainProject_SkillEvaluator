let express = require('express')
const {userLoggedIn} = require('../controllers/auth.controller.js')
const {generateSkillQuestions} = require('../controllers/test.controller.js')
const {getAllSkills,addSkill,deleteSkill,updateSkill} = require('../controllers/skill.controller.js')
const {getAdminDashboard} = require('../controllers/admin.controller.js')
const {getAllUsers,getUserDetails,deleteUser} = require('../controllers/user.controller.js')

let router = express.Router()

router.post('/generateQuestions',generateSkillQuestions)
router.post('/addSkill',addSkill)
router.get('/getSkills',getAllSkills)
router.delete('/deleteSkill/:skillId',deleteSkill)
router.put('/editSkill/:skillId',updateSkill)

router.get("/dashboard",getAdminDashboard);
router.get("/users", getAllUsers);
router.get("/user/:userId", getUserDetails);
router.delete("/deleteUser/:userId", deleteUser);

module.exports= router;
