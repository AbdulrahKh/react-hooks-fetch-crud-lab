import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(
    () =>
      fetch("http://localhost:4000/questions")
        .then((res) => res.json())
        .then((res) => setQuestions(res)),
    []
  );

  function handleAddQuestion(ques) {
    setQuestions((questions) => [...questions, ques]);
  }

  function handleDeleteQuestion(quesId) {
    setQuestions((questions) => questions.filter((ques) => ques.id !== quesId));
  }

  function handleUpdateQuestion(newQues) {
    setQuestions((questions) =>
      questions.map((ques) => (ques.id === newQues.id ? newQues : ques))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          handleDelete={handleDeleteQuestion}
          handleUpdate={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
