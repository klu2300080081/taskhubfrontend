import React from 'react'
import "./User.css"

export default function SelfTask() {
  return (
    <div>
         <>
    <div className="assign-task-container" >
      <h2>Assign task</h2>
      <form>
        <label>Task Category:</label> 
        <select>
          <option>Select a category</option>
        </select>

        <div>
        <label>Description:</label>
        <textarea placeholder="Enter task description"></textarea>
        </div>

        <div id="date">
        <label>Deadline:</label>
        <input type="date" />
        </div>

        

        <button type="submit">Assign Task</button>
      </form>
    </div>
    </>


    </div>
  )
}
