import axios from 'axios'
import { saveFormUrl, addProgramUrl, addProjectUrl, addGoalUrl, addObjectiveUrl } from './url'





export function saveForm(updatedProgram) {
    return (axios({
        method: 'post',
        url: saveFormUrl,
        data: updatedProgram
    }))
}

export function addNewProgram(program) {
    return (axios({
        method: 'post',
        url: addProgramUrl,
        data: program
    }))
}

export function addNewProject(data) {

    return (axios({
        method: 'post',
        url: addProjectUrl,
        data: data
    }))
}

export function addNewGoal(data) {
    return (axios({
        method: 'post',
        url: addGoalUrl,
        data: data

    }))
}

export function addNewObjective(data) {
    return (axios({
        method: 'post',
        url: addObjectiveUrl,
        data: data
    }))
}




