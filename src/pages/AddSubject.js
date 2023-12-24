import React from 'react'

function AddSubject() {
    return (
        <>
            <div className="page-container">
                <div className="add-subject-container">
                    <h1>Add a subject</h1>
                    <form className="subject-form">
                        <label htmlFor="subjectName">Subject Name:</label>
                        <input
                            type="text"
                            id="subjectName"
                            name="subjectName"
                            placeholder="Enter subject name"
                        />
                        <button type="submit">Add Subject</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddSubject
