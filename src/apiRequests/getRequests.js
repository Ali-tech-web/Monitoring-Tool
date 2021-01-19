import axios from 'axios'
import { getAllProgramsUrl } from './url'

export function getAllPrograms() {
    return (axios({
        method: 'get',
        url: getAllProgramsUrl
    }))
}
