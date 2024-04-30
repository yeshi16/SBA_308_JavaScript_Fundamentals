const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const assignmentInfo = [
  {
    id: 1,
    name: "Declare a Variable",
    due_at: "2023-01-25",
    points_possible: 50
  },
  {
    id: 2,
    name: "Write a Function",
    due_at: "2023-02-27",
    points_possible: 150
  },
  {
    id: 3,
    name: "Code the World",
    due_at: "3156-11-15",
    points_possible: 500
  }
]

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [assignmentInfo]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2024-05-05T00:00:00.000Z",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
/*
 AssignmentGroup does not belong to its course , program throw an error (mismatching course_id)
*/
function checkCourseMatch(AssiGroup, CouInfo){
try {
  if(AssiGroup.course_id !== CouInfo.id){
    throw new Error("mismatching course_id")
  }
}catch(e){
  console.log(e.message)
  }
}

/********************//********************/

/*
 gets learners ID 
*/ 
function getLearnerId(LearnerSubmission){

  checkCourseMatch(AssignmentGroup, CourseInfo);

  let learnerID = []
  for (let i = 0; i < LearnerSubmission.length; i++) {
    const learnerId = LearnerSubmission[i].learner_id;
    const score = LearnerSubmission[i].submission.score;
    const assigId = LearnerSubmission[i].assignment_id;
      const scoreObj = {
        learnerId: learnerId,
        score: score,
        assigId: assigId
      };
      learnerID.push({ ...scoreObj });
  }
  return learnerID;
}

// let learnerID = getLearnerId(LearnerSubmissions);
// console.log(learnerID)

/****************************************/

/*
gets assignment possible points including assignment id
*/ 
function points(assigInfo) {
  checkCourseMatch(AssignmentGroup, CourseInfo);
  let idPoints = []
  const date = new Date();
  for (let i = 0; i < assigInfo.length; i++) {
    const dueDate = new Date(assigInfo[i].due_at);
    if (dueDate > date) {
      continue;
    } else {
      let assigId = assigInfo[i].id;
      let points = assigInfo[i].points_possible;
      const idPoint = {
        id: assigId,
        pointsPossible: points
      };
      idPoints.push(idPoint);
    }
  }
  return idPoints;
}
// let allpoint = points(assignmentInfo);
// console.log(allpoint)


/********************//********************/
/*
adds all the scores of each assinment including learner's id
*/

function learnerTotalScore(LearnerSubmission) {
  let scr = 0;
  let learnerScore = [];
  let d = LearnerSubmission[0].learner_id;
  let assigId = [];
  
  for (let i = 0; i < LearnerSubmission.length; i++) {
    let asid = LearnerSubmission[i].assignment_id
    if (d !== LearnerSubmission[i].learner_id) {
      const scoreObj = {
        id: d,
        score: scr,
        assignmentId: assigId
      };
      learnerScore.push({ ...scoreObj });
      d = LearnerSubmission[i].learner_id
      scr = LearnerSubmission[i].submission.score;
    } else if (i == LearnerSubmission.length - 1) {
      scr += LearnerSubmission[i].submission.score;
      learnerScore.push({
        id: d,
        score: scr,
        assignmentId: assigId
      });
    }
    else {
      scr += LearnerSubmission[i].submission.score;
      assigId.push(asid)
    }
  }
  return learnerScore
}

//console.log(learnerTotalScore(LearnerSubmissions))

/********************//********************/

/* 
 calculate all assignment avg
 submission.score / point possible
*/

function courseAvg(assigInfo, LearnerSubmission) {
  let scores = learnerTotalScore(LearnerSubmission)
  let allpoints = points(assigInfo);
  let avgScores = []
  let avg = 0;
  for (let i = 0; i < scores.length; i++) {
    let totalPts = 0
    for (let j = 0; j < allpoints.length; j++) {
      if (scores[j].assignmentId[j] == allpoints[j].id) {
        totalPts += allpoints[j].pointsPossible
      }

    }
    try{
      avg = scores[i].score / totalPts
     } catch(e){
      console.log("cant divide by zero")
     }
   
    avgScores.push({
      LearnerId: scores[i].id,
      average: avg
    });
  }
  return avgScores;
}

//console.log(courseAvg(assignmentInfo, LearnerSubmissions))


/* 
get each assignment avg
1: 0.78, // 39 / 50
*/

function eachAssiAvg(assigInfo, LearnerSubmission) {
  let allpoints = points(assigInfo); //[ { id: 1, pointsPossible: 50 }, { id: 2, pointsPossible: 150 } ] id = assignment id 
let learnerId = getLearnerId(LearnerSubmission) // [{ learnerId: 125, score: 47 },{ learnerId: 125, score: 150 },{ learnerId: 125, score: 400 },{ learnerId: 132, score: 39 },{ learnerId: 132, score: 140 }] id = student id
let avgScores = []
let avg = 0.0;
let assignment = 0;
let studId = 0;
const date = new Date();
for (let i = 0; i < allpoints.length; i++) {

  for (let j = 0; j < learnerId.length;  j++) {
     if (LearnerSubmission[j].assignment_id == allpoints[i].id) {
      studId = learnerId[j].learnerId
      assignment = allpoints[i].id;
      try{
      avg = learnerId[j].score / allpoints[i].pointsPossible
      const dueDate = new Date(LearnerSubmission[j].submission.submitted_at);
            
      if(dueDate > date){
        avg *= 0.1;
      }
     } catch(e){
      console.log("cant divide by zero")
     }
   
      const scoreObj = {
          learnerId: studId,
          assignmentId: assignment,
          assignmentAvg: avg
        };
        avgScores.push({ ...scoreObj });
      
    }
  }
}
return avgScores;
}

// console.log(eachAssiAvg(assignmentInfo, LearnerSubmissions)) // [{ learnerId: 125, assignmentId: 1, assignmentAvg: 0.94 },{ learnerId: 132, assignmentId: 1, assignmentAvg: 0.78 },{ learnerId: 125, assignmentId: 2, assignmentAvg: 1 },{learnerId: 132,assignmentId: 2,assignmentAvg: 0.93}]


/* 
  prints out learners data in a required format
*/

function getLearnerData(CouInfo, AssiGroup, LearnerSubmission, assigInfo) {
  checkCourseMatch(AssiGroup, CouInfo);
  let avgScores = courseAvg(assigInfo, LearnerSubmission)
  let eachAvg = eachAssiAvg(assigInfo, LearnerSubmission);
for(let i = 0; i < avgScores.length; i++){
  let id = avgScores[i].LearnerId;
  let avg = avgScores[i].average;
  let eachAvgObj= {}
  let eachAssId = 0
  let eachAvrg = 0
  for(let j = 0; j < eachAvg.length; j++){
    if(eachAvg[j].learnerId == id){
      eachAvgObj[eachAvg[j].assignmentId] = eachAvg[j].assignmentAvg
      eachAssId = Object.keys(eachAvgObj)
      eachAvrg = Object.values(eachAvgObj)
    }
  }

  console.log(`
    { 
      id: ${id}, 
      avg: ${avg},
      ${eachAssId.map((id, index) => `${id}: ${eachAvrg[index]}`).join(',\n\t\t\t')}
    } 
  `);
}
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions, assignmentInfo))

//  ${eachAssId}: ${eachAvrg}