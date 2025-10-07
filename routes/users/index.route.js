const loginRoutes = require("./login.route");
const registerRoutes = require("./register.route");
const topicsRoutes = require("./topics.route");
const questionRoutes = require("./questions.route");
const quizRoutes = require("./quiz.route");
const answersRoutes = require("./answers.route");
const getListQuestions = require("./getListQuestions.route");
const getListAnswers = require("./getListAnswers.route");
const getAnswersById = require("./getAnswersById.route");
const updateUser = require("./updateUser.route");
const updatePassword = require("./updatePassword.route");
const rankingByEveey = require("./ranking.route");
const allAnswerRoutes = require("./allAnswers.route");
const allFullNameRoutes = require("./fullName.route");
const loginAdminRoutes = require("./loginAdmin.route");
const createTopicsRoutes = require("./createTopics.route");
const editQuestionsRoutes = require("./editQuestions.route");
const deleteTopicsRoutes = require("./deleteTopics.route");
const getAllUsersRoutes = require("./getAllUsers.route");
const deleteUsersRoutes = require("./deleteUsers.route");
const updateProfileAdmin = require("./updateProfileAdmin.route");
const updatePasswordAdmin = require("./updatePasswordAdmin.route");
module.exports = (app) => {
    app.use("/login", loginRoutes);

    app.use("/register", registerRoutes);

    app.use("/topics", topicsRoutes);

    app.use("/questions", questionRoutes);

    app.use("/quiz", quizRoutes);

    app.use("/answers", answersRoutes);

    app.use("/getlistquestions", getListQuestions);

    app.use("/listAnswers", getListAnswers);

    app.use("/answersByUser", getAnswersById);

    app.use("/updateUser", updateUser);

    app.use("/updatePass", updatePassword);

    app.use("/ranking", rankingByEveey);

    app.use("/allAnswers", allAnswerRoutes);

    app.use("/getFullName", allFullNameRoutes);

    app.use("/loginAdmin", loginAdminRoutes);

    app.use("/createTopics", createTopicsRoutes);

    app.use("/editQuestions", editQuestionsRoutes);

    app.use("/deleteTopics", deleteTopicsRoutes);

    app.use("/getAllUsers", getAllUsersRoutes);

    app.use("/deleteUsers", deleteUsersRoutes);

    app.use("/updateAdmin", updateProfileAdmin);

    app.use("/updatePasswordAdmin", updatePasswordAdmin);
}