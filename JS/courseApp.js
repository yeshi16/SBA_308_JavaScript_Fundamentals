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
function getLearnerId(LearnerSubmission){
  //LearnerSubmission.filter(function(item){console.log(item.learner_id)})
  let learnerID =[]
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
function points(assigInfo){
  let idPoints = []
  for(let i = 0; i < assigInfo.length; i++){
    let assigId = assigInfo[i].id;
    let points = assigInfo[i].points_possible;
    const idPoint = {
      id: assigId,
      pointsPossible: points
    };
    idPoints.push(idPoint);
  }
  return idPoints;
}

// let allpoints = points(assignmentInfo);
// console.log(allpoints)

/********************//********************/

  // scores 
 
  let learnerScore = []
  for (let submission of LearnerSubmissions) {
   let scores = submission.submission.score;
   let ids = submission.learner_id
   const scoreObj = {
    id: ids,
    score: scores
   }
   learnerScore.push(scoreObj);
  }
  //console.log(learnerScore)
  
  
  let s = 0
  let learnerScore1= []
  let d = learnerScore[0].id
  //let i = 0
  const scoreObj = {
    id: null,
    score: null
  };
  
  for(let i = 0; i < learnerScore.length; i++){
    //console.log(d)
      //console.log(learnerScore[i].id)
    if(d !== learnerScore[i].id ){
    
      scoreObj.id = d,
      scoreObj.score = s
      
      //console.log(scoreObj)
      
      d = learnerScore[i].id
      s = learnerScore[i].score;
      //console.log(scoreObj)
   
      learnerScore1.push(scoreObj)
    }else if(i == learnerScore.length -1){
      s += learnerScore[i].score;
      scoreObj.id = d,
      scoreObj.score = s
    //console.log(scoreObj)
    learnerScore1.push(scoreObj)
    }
    else{
      //console.log(s)
      s += learnerScore[i].score;
    }
  }
  
 //console.log(learnerScore1)