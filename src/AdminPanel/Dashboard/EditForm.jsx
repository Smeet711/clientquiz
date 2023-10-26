// EditQuestionForm.js
import React, { useState, useEffect } from "react";

const EditForm = ({ questionData, onUpdateQuestion }) => {
  const [editedQuestion, setEditedQuestion] = useState(questionData);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedQuestion({
      ...editedQuestion,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call an API to update the question with editedQuestion data
    onUpdateQuestion(editedQuestion);
  };

  return (
    <div>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            name="question"
            value={editedQuestion.question}
            onChange={handleInputChange}
          />
        </label>
        {/* Add other input fields for editing question data */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;
