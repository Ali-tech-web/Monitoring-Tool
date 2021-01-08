

import React, { useState, useEffect, useCallback } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'


export default function FirstProgram(props) {

  const [programName, setProgramName] = useState({ programName: "" })

  // To avoid Page reloading on form submit 
  const preventDefault = (e) => {
    e.preventDefault()
  }

  const addProgram = (programName) => {
    props.hideAddProgramForm()
    props.addProgram({ name: programName.programName })

  }

  // No essential need
  useEffect(() => {

  })

  return (
    <form style={{ textAlign: 'center' }} onSubmit={preventDefault}>
      <input
        type="text"
        className="round-corners"
        placeholder="Add Your Program"
        onChange={(e) => { setProgramName({ ...programName, programName: e.target.value }) }}

      />

      <Button variant="primary" className="add-button" onClick={() => addProgram(programName)}>Add</Button>
    </form>
  );
}

// export default firstProgram;