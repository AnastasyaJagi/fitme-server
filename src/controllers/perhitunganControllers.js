const CaseBase = require('../models/CaseBase');
const Workout = require('../models/Workout');
const User = require('../models/User');
import request from 'request'

// hitungan
const hitungSimilarity = async (req, res) => {
    // cari case base dimana case sudah terconfirm
    const cases = await CaseBase.find({status : 1})
    .populate('userId')
    .populate({
        path : 'userId',
        populate : 'activityId bodygoalId'
    })

    const userTest = await User.findOne({_id : req.body.dataUser})
    .populate('activityId')
    .populate('bodygoalId')

    if(userTest == null) return res.status(400).send({ message : 'User is not found!' })  

    var dataTest = userTest;
    var k = req.body.k
    if(k <= 0) return res.status(400).send({message : 'K must be greater than 0'})
    // Normalisasi Data : Data Test + Data Train
    var caseDataMinMax = [...cases]
    var caseNormalized = []
    var dataMinMax = {
        age : { max : 0, min : 0, data : [] },
        height : { max : 0, min : 0, data : [] },
        weight : { max : 0, min : 0, data : [] },
        gender : { max : 0, min : 0, data : [] },
        activity : { max : 0, min : 0, data : [] },
        bodygoal : { max : 0, min : 0, data : [] }
    }
    // Add Data Predict to Training
    caseDataMinMax.push({userId : dataTest})
    for(var i in caseDataMinMax){
        dataMinMax.age.data.push(caseDataMinMax[i].userId.age) 
        dataMinMax.height.data.push(caseDataMinMax[i].userId.height)
        dataMinMax.weight.data.push(caseDataMinMax[i].userId.weight)
        dataMinMax.gender.data.push(caseDataMinMax[i].userId.gender)
        dataMinMax.activity.data.push(caseDataMinMax[i].userId.activityId.weight)
        dataMinMax.bodygoal.data.push(caseDataMinMax[i].userId.bodygoalId.weight)
        
        // kecuali data test
        if( i != caseDataMinMax.length-1){
            caseNormalized.push({
                _id : caseDataMinMax[i]._id,
                name : caseDataMinMax[i].userId.name,
                age : caseDataMinMax[i].userId.age,
                height : caseDataMinMax[i].userId.height,
                weight : caseDataMinMax[i].userId.weight,
                gender : caseDataMinMax[i].userId.gender,
                activity : caseDataMinMax[i].userId.activityId.weight,
                bodygoal : caseDataMinMax[i].userId.bodygoalId.weight,
                label : caseDataMinMax[i].workoutId
            })
        }else{
            caseNormalized.push({
                _id : "datatest",
                name : caseDataMinMax[i].userId.name,
                age : caseDataMinMax[i].userId.age,
                height : caseDataMinMax[i].userId.height,
                weight : caseDataMinMax[i].userId.weight,
                gender : caseDataMinMax[i].userId.gender,
                activity : caseDataMinMax[i].userId.activityId.weight,
                bodygoal : caseDataMinMax[i].userId.bodygoalId.weight,
                label : caseDataMinMax[i].workoutId
            })
        }
    }
    //console.log(caseDataMinMax);
    
    for (var key in dataMinMax) {
        dataMinMax[key].max = Math.max(...dataMinMax[key].data)
        dataMinMax[key].min = Math.min(...dataMinMax[key].data)
    }
    //console.log(dataMinMax);
    // Normalized Data or Scaling Data
    for(var i in caseNormalized){
      for(var key in dataMinMax){
        caseNormalized[i][key] = normalize(caseNormalized[i][key],dataMinMax[key].min,dataMinMax[key].max)
      }
    }
    // Data Test Normalized
    var dataTestN = caseNormalized[caseNormalized.length-1]
    // Data Training Normalized
    caseNormalized.pop()
    var dataTrainN = caseNormalized;
    // Hitung Similarity
    var similarityResult = []
    // perhitungan similarity
    for(var i in dataTrainN){
        var train = dataTrainN[i]
        var test = dataTestN
        
        var calculation = Math.pow((train.age-test.age),2) + Math.pow((train.height-test.height),2)+Math.pow((train.weight-test.weight),2)+Math.pow((train.gender-test.gender),2)+Math.pow((train.activity-test.activity),2)+Math.pow((train.bodygoal-test.bodygoal),2)
        const workout_name = await Workout.findOne({_id : train.label})
        similarityResult.push({
            _id : train._id,
            name : train.name,
            similarity : Math.sqrt(calculation),
            label : train.label,
            exercise_type : workout_name.exercise_level_detail
        }) 
        
    }
    // disorting berdasarkan nilai paling kecil
    var sortedRes = sortJSON(similarityResult,'similarity','ASC')
    // disorting menggunakan nilai k
    var resBasedK = Ksimilarity(sortedRes,k);
    // jika data lebih 3 cari major result nya
    let result = Object.values(resBasedK.reduce((c, {label}) => {
        c[label] = c[label] || {id: label,count: 0};
        c[label].count++;
        return c;
      }, {}))
    var finalRes = sortJSON(result,'count','DESC')[0];
    // Get workout Data
    try{
        const workout = await Workout.findOne({_id : finalRes.id}).populate({
            path : 'workout',
            populate : 'workout_type'
        })
        res.status(200).json({
            user : dataTest,
            output : workout,
            k : k,
            dataSimilarity : resBasedK
        })
    }catch(err){
        res.status(400).send({
            message : err
        })        
    }
    // Perhitungan : Data Train
}

function normalize(val,min,max) {
    var delta = max - min;
    return (val - min) / delta;
}

function sortJSON(arr, key, way) {
    let sortedArr =  arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === 'ASC') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === 'DESC') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });

    return sortedArr;
  }

 const Ksimilarity = (arr,k) =>  arr.slice(0,k);


module.exports ={
    hitungSimilarity : hitungSimilarity
};