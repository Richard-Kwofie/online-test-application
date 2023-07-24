import axios from "axios";
import { useEffect, useState } from "react";
function Exam() {
let [questions,setQuestions]=useState([]);
let [answer,setAnswer]=useState([]);
const [score,setScore]=useState(0);
let [showResult,setShowResult]=useState([false]);
useEffect(()=> {
    //alert("Hello");  
    axios.get("http://localhost:3000/questions").
    then(result=> {
        //console.log(result.data)
        setQuestions(result.data);
    }).
    catch(error=> {
        console.log(error);
    });
    axios.get("http://localhost:3000/answers").
    then(result=> {
        //console.log(result.data)
        setAnswer(result.data);
    }).
    catch(error=> {
        console.log(error);
    });


    
},[])

const calculateScore = () => {

    
let a =0;

    for (const [qid, selectedAns] of mm) {
        
        const correctAns = answer.find((ans) => ans.qid === qid);
      
        if (correctAns.correctAns === selectedAns) {
        
            a++;
          console.log(a);
        }
  
      }

      setScore(a);
  
      
  
      setShowResult(true);

  };

let mm = new Map();
let getSelectedAns = function(event,qid,ans){
    //console.log(qid+" "+ans);
    mm.set(qid,ans);// key as qid and value as ans in map object. 
                        // key is unique and value can be duplicate 
    console.log(mm);            // hold qid and selected ans 
    console.log(answer);        // hold correct ans with qid 
}

let question = questions.map(q=> 
    <div>
        {q.qid} ) {q.question} ? <br/>
        <input type="radio" name={q.qid} value={q.ans1} onClick={(event)=> {
            getSelectedAns(event,q.qid,q.ans1);
        }}/>{q.ans1}
        <input type="radio" name={q.qid} value={q.ans2} onClick={(event)=> {
            getSelectedAns(event,q.qid,q.ans2);
        }}/>{q.ans2}
        <input type="radio" name={q.qid} value={q.ans3} onClick={(event)=> {
            getSelectedAns(event,q.qid,q.ans3);
        }}/>{q.ans3}
        <input type="radio" name={q.qid} value={q.ans4} onClick={(event)=> {
            getSelectedAns(event,q.qid,q.ans4);
        }}/>{q.ans4}
    </div>    
)


    return (

        <div>

        <h2>Online Test Application</h2>
  
        {question}
  
        {showResult && (
  
          <div>
  
            <h2>Exam Results</h2>
  
            <p>Your score: {score} / {questions.length}</p>
  
          </div>
  
        )}
  
        {showResult && (
  
          <button onClick={calculateScore}>Finish</button>
  
        )}
  
      </div>
  
    );
  
  }
  


export default Exam;