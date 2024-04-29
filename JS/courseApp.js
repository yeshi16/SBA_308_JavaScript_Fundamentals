// The provided course information.
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
      submitted_at: "2023-02-12",
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
/* result
  [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];
*/



/********************//********************/

// get learners ID
function getLearnerId(LearnerSubmission) {
  //LearnerSubmission.filter(function(item){console.log(item.learner_id)})
  let learnerID = []
  for (let i = 0; i < LearnerSubmission.length; i++) {
    const learnerId = LearnerSubmission[i].learner_id;
    //if( learnerID.includes(learnerId)){
    //continue
    //}else{
    learnerID.push(learnerId)
    //}

  }
  return learnerID;
}

// let learnerID = getLearnerId(LearnerSubmissions);
// console.log(learnerID)

/****************************************/

// assignment possible points
function points(assigInfo) {
  let idPoints = []
  const date = new Date();
  for (let i = 0; i < assigInfo.length; i++) {
    //console.log(date)
    //console.log(assigInfo[i].due_at < date)
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
//console.log(allpoints[0].id)
// console.log(allpoint)




/********************//********************/
function learnerTotalScore(LearnerSubmission) {
  let scr = 0;
  let learnerScore = [];
  let d = LearnerSubmission[0].learner_id;
  let assigId = [];
  let allpoints = points(assignmentInfo);
  let pointIndex = 0
  //let pointId = allpoints[pointIndex].id;
  for (let i = 0; i < LearnerSubmission.length; i++) {
    // console.log(LearnerSubmission[i].assignment_id)
    // console.log(pointIndex)
    //if(LearnerSubmission[i].assignment_id == allpoints[pointIndex].id){
    let asid = LearnerSubmission[i].assignment_id
    pointIndex++
    if (d !== LearnerSubmission[i].learner_id) {
      const scoreObj = {
        id: d,
        score: scr,
        assignmentId: assigId
      };
      learnerScore.push({ ...scoreObj });
      d = LearnerSubmission[i].learner_id
      scr = LearnerSubmission[i].submission.score;
      //console.log(scoreObj)
    } else if (i == LearnerSubmission.length - 1) {
      scr += LearnerSubmission[i].submission.score;
      learnerScore.push({
        id: d,
        score: scr,
        assignmentId: assigId
      });
    }
    else {
      //console.log(s)
      scr += LearnerSubmission[i].submission.score;
      assigId.push(asid)
    }

  }
  //pointIndex = 0
  //}
  return learnerScore
}

//console.log(learnerTotalScore(LearnerSubmissions))

/********************//********************/

// calculate avg
function avg(assigInfo, LearnerSubmissions) {

}

// submission.score / point possible
// avg: 0.985,  (47 + 150) / (50 + 150)


//console.log(learnerTotalScore(LearnerSubmissions)) //[ { id: 125, score: 597, assignmentId: [ 1, 2, 3 ] }, { id: 132, score: 179, assignmentId: [ 1, 2, 3 ] } ]
//let allpoints = points(assignmentInfo);
//console.log(allpoints) //[ { id: 1, pointsPossible: 50 }, { id: 2, pointsPossible: 150 } ]

let scores = learnerTotalScore(LearnerSubmissions)
let allpoints = points(assignmentInfo);
let avg1 = 0;
for (let i = 0; i < scores.length; i++) {
  //console.log(scores[i].score);
  let totalPts = 0
  for (let j = 0; j < allpoints.length; j++) {
    // console.log(scores[j].assignmentId[j] )
    // console.log(allpoints[j].id)
    if (scores[j].assignmentId[j] == allpoints[j].id) {

      totalPts += allpoints[j].pointsPossible
      //console.log(totalPts)
    }
    
  }
  avg1 = scores[i].score / totalPts
  console.log(avg1)
}

//let scoreVal = scores.map(score => score.score);
//console.log(scoreVal);
//let ptPossibleVal = allpoints.map(point => point.pointsPossible);
//console.log(ptPossibleVal);

