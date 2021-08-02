//untuk mendeklarasikan route

import express from "express"
let router = express.Router();

//panggil controller
import perhitunganControllers from "../controllers/perhitunganControllers"
import userController from "../controllers/UserController"
import adminController from "../controllers/AdminController"
import HistoryRecommendationController from "../controllers/HistoryRecommendationController";
import WorkoutController from "../controllers/WorkoutController"
import WorkoutTypeController from "../controllers/WorkoutTypeController"
import caseBaseController from "../controllers/caseBaseController"
import activityLevelController from "../controllers/activityLevelController"
import bodyGoalController from "../controllers/bodyGoalController"
import homepageController from "../controllers/homepageController"
const initWebRoutes = (app) => {

// Client Route
app.get("/",homepageController.getHomepage)
// Body Goal Page
app.get("/bodygoal",bodyGoalController.getPage)
app.get("/bodygoal/add",bodyGoalController.getAddPage)
app.get("/bodygoal/edit/:id",bodyGoalController.getEditPage)
//  Activity Page
app.get("/activity",activityLevelController.getPage)
app.get("/activity/add",activityLevelController.getAddPage)
app.get("/activity/edit/:id",activityLevelController.getEditPage)
//  Workout Type Page
app.get("/workout_type",WorkoutTypeController.getPage)
app.get("/workout_type/add",WorkoutTypeController.getAddPage)
app.get("/workout_type/edit/:id",WorkoutTypeController.getEditPage)

//perhitungan
app.post("/api/testperhitungan", perhitunganControllers.hitungSimilarity)

// USER
app.post("/api/user",userController.addUser)
app.get("/api/user", userController.getUser)
app.get("/api/user/:userId",userController.getUserByName)
app.put("/api/user/:userId",userController.updateUser)
app.delete("/api/user/:userId",userController.deleteUser)

// ADMIN
app.post("/api/admin", adminController.addAdmin)
app.get("/api/admin", adminController.getAdmin)
app.get("/api/admin/:adminId", adminController.getAdminByName)
app.patch("/api/admin/:adminId", adminController.updateAdmin)
app.delete("/api/admin/:adminId", adminController.deleteAdmin)

// WORKOUT
app.post("/api/workout",WorkoutController.addWorkout)
app.get("/api/workout",WorkoutController.getWorkout)
app.get("/api/workout/:workoutId",WorkoutController.getWorkoutById)
app.patch("/api/workout/:workoutId", WorkoutController.updateWorkout)
app.delete("/api/workout/:workoutId", WorkoutController.deleteWorkout)

// HISTORY RECOMMENDATION
app.post("/api/history_recommendation",HistoryRecommendationController.addHistory)
app.get("/api/history_recommendation",HistoryRecommendationController.getHistory)
app.patch("/api/history_recommendation/:history_recommendationId", HistoryRecommendationController.updateHistory)
app.delete("/api/history_recommendation/:history_recommendationId", HistoryRecommendationController.deleteHistory)


// WORKOUT TYPE
app.post("/api/workout_type",WorkoutTypeController.addWorkout_type)
app.get("/api/workout_type",WorkoutTypeController.getWorkout_type)
app.get("/api/workout_type/:workout_typeId",WorkoutTypeController.getWorkout_typeById)
app.patch("/api/workout_type/:workout_typeId", WorkoutTypeController.updateWorkout_type)
app.delete("/api/workout_type/:workout_typeId", WorkoutTypeController.deleteWorkout_type)

// CASE BASE
app.post("/api/casebase",caseBaseController.addCaseBase)
app.get("/api/casebase",caseBaseController.getCaseBase)
app.patch("/api/casebase/:caseId",caseBaseController.updateCaseBase)
app.delete("/api/casebase/:caseId", caseBaseController.deleteCaseBase)

// Activity Level
app.post("/api/activity",activityLevelController.addActivity_level)
app.get("/api/activity",activityLevelController.getActivity_level)
app.get("/api/activity/:activityId",activityLevelController.getActivity_levelById)
app.patch("/api/activity/:activityId",activityLevelController.updateActivity_level)
app.delete("/api/activity/:activityId", activityLevelController.deleteActivity_level)

// Body Goal
app.post("/api/bodygoal",bodyGoalController.addBody_goal)
app.get("/api/bodygoal",bodyGoalController.getBody_goal)
app.get("/api/bodygoal/:goalId",bodyGoalController.getBody_goalById)
app.patch("/api/bodygoal/:goalId",bodyGoalController.updateBody_goal)
app.delete("/api/bodygoal/:goalId", bodyGoalController.deleteBody_goal)

return app.use("/", router);

}




module.exports = initWebRoutes;