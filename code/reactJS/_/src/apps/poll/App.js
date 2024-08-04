
import React, { useState, useEffect } from 'react';

import tasks from './Data.js';
import Result from './Result.js';
import Question from './Question.js';

const log = console.log;


const count_tasks = tasks.length;

export default class Poll extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        task_current_id: 0,
        tasks: tasks,
        option_selected: 0,
        is_end: false,
        score: 0,
      };
    }

    handleChangeSelectOption = (e) => {
      this.setState((prevState) => ({
        option_selected: parseInt(e.target.value),
      }));
    }
    
    handleOnSubmit = (e)=>{

      e.preventDefault();

      const {task_current_id, option_selected , tasks } = this.state;

      if (task_current_id + 1 < count_tasks) {
        this.setState((prevState) => ({
            task_current_id: prevState.task_current_id + 1,
            score: prevState.score + (option_selected + 1 === tasks[task_current_id].answer) ? 1 : 0,
            is_end: false,
        }))
      } else {
        this.setState((prevState) => ({
          is_end: true,
        }))
      }
    }
        
  render() {
      return ( 
      <React.Fragment>
        <div>
            { !this.state.is_end 
              ?
              <Question 
                task_current_id={this.state.task_current_id} 
                tasks={this.state.tasks} 
                handleOnSubmit={this.handleOnSubmit}
                option_selected={this.state.option_selected}
                handleChangeSelectOption={this.handleChangeSelectOption}
              />
              :
              <Result score={this.state.score} />
            }
        </div>
      </React.Fragment>
    );
  }
}