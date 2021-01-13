import axios from 'axios'
import { saveFormUrl, addProgramUrl, addProjectUrl } from './url'





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
