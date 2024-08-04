
import React from "react";

export default class Question extends React.Component {
    
    render() {
        const {task_current_id, tasks, handleOnSubmit, option_selected, handleChangeSelectOption} = this.props;
        let task = tasks[task_current_id];

        return (
            <div>
  
                <div key={task_current_id}>
                  <h1>{task.question}</h1>
                  <div>
                    <form onSubmit={handleOnSubmit}>
 
                      <ol>
                        {task.options.map((option, option_id) => (
                          <li key={option_id}>
                            <input 
                              type="radio" 
                              id={"opinion " + task_current_id + option_id} 
                              name={"question " + task_current_id} 
                              value={option_id} 
                              onChange={handleChangeSelectOption}
                              checked={option_selected === option_id}
                            />
                            <label htmlFor={"opinion " + task_current_id + option_id}>{option}
                            </label>
                          </li>                
                        ))}
                      </ol>
                      <button type="submit">Next</button>
                    </form>
                  </div>  
                </div>

              </div>
        )
    }
}