import React, { useState } from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { QUERY_EDUCATIONS } from "./Education";

const MUTATION_ADD_EDUCATION = gql`
mutation ($name: String!, $educationType: String!, $educationPace: String!, $educationLength: String!, $description: String!)  {
    createEducation(name: $name, educationType: $educationType, educationPace: $educationPace, educationLength: $educationLength, description: $description) {
      id
    }
  }
`;

export function AddEducation() {
    const [ educationName, setEducationName ] = React.useState();
    const [ educationLength, setEducationLength ] = React.useState();
    const [ educationPace, setEducationPace ] = React.useState();
    const [ educationType, setEducationType ] = React.useState();
    const [ educationDescription, setEducationDescription ] = React.useState();

    const [ errorMessages, setErrorMessages ] = React.useState(false);

    const isSubmittable = Boolean(educationName && educationLength && educationLength && educationType && educationDescription);

    const [addEducation] = useMutation(MUTATION_ADD_EDUCATION);

    let history = useHistory();

    function handleChange(event) {
        if (event.target.name === "name") {
            setEducationName(event.target.value);
        }
        else if (event.target.name === "educationLength") {
            setEducationLength(event.target.value);
        }
        else if (event.target.name === "educationPace") {
            setEducationPace(event.target.value);
        }
        else if (event.target.name === "educationType") {
            setEducationType(event.target.value);
        }
        else if (event.target.name === "educationDescription") {
            setEducationDescription(event.target.value);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!isSubmittable && errorMessages === false) {
            setErrorMessages(true);
            console.log("Fyll i allt!!")
        } else {
            addEducation({
                variables: {
                    name: educationName,
                    educationPace: educationPace,
                    educationLength: educationLength,
                    educationType: educationType,
                    description: educationDescription
                },
                refetchQueries: QUERY_EDUCATIONS
              })
            history.push("/");
        }
    }

return <div className="container-small">
            <h2>Add Education</h2>
            <form onSubmit={handleSubmit} className="add-form">
            <div className="form-control">
                <label htmlFor="name" className="animated-label">Name of education</label>
                <div className="control">
                    <input type="text" name="name" placeholder="Name of education" onChange={handleChange} autoComplete="off"></input>
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="educationType" className="animated-label">Education type</label>
                <div className="control">
                    <input type="text" name="educationType" placeholder="Education type" onChange={handleChange} autoComplete="off"></input>
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="educationLength" className="animated-label">Education length</label>
                <div className="control">
                    <input type="text" name="educationLength" placeholder="Education length" onChange={handleChange} autoComplete="off"></input>    
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="educationPace" className="animated-label">Education pace</label>
                <div className="control">
                    <input type="text" name="educationPace" placeholder="Education pace" onChange={handleChange} autoComplete="off"></input>    
                </div>
            </div>
            <div className="form-control">
            <label htmlFor="educationDescription" className="animated-label">Description</label>
                <div className="control">
                    <textarea type="text" name="educationDescription" placeholder="Description" onChange={handleChange} autoComplete="off"></textarea>
                </div>
            </div>
                <button type="submit" className="button-primary">Add</button>
            </form>
        </div>
}