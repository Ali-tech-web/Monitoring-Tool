import axios from 'axios'
import { saveFormUrl } from './url'
// Takes the Username and Password as Credentials makes an api request to server and receives api key
export function saveForm(updatedProgram) {

    return (axios({
        method: 'post',
        url: saveFormUrl,
        data: updatedProgram
    }))

}