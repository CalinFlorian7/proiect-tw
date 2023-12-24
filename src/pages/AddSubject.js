import React from 'react'
import '../pages/AddSubject.css'
function AddSubject() {
    return (
        <>
            <div className="page-container">
                <div className="add-subject-container">
                    <h1>Add a subject</h1>
                    <form className="subject-form">
                        <div className="main-form-container">
                            <div className="form-container">
                                <div className="input-container">
                                    <label
                                        className="subject-label"
                                        htmlFor="subjectName"
                                    >
                                        Subject Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="subjectName"
                                        name="subjectName"
                                        placeholder="Enter subject name"
                                    />
                                </div>
                                <button type="submit">Add Subject</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddSubject
