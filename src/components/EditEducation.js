import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory,
    useParams
} from "react-router-dom";
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { QUERY_EDUCATIONS } from "./Education";
import { QUERY_EDUCATION_BY_ID } from "./Education";

const MUTATION_UPDATE_EDUCATION = gql`
mutation ($id: Int!, $name: String!, $educationType: String!, $educationPace: String!, $educationLength: String!, $description: String!) {
    updateEducation(id: $id, name: $name, educationType: $educationType, educationPace: $educationPace, educationLength: $educationLength, description: $description){
      id
      name
      educationType
      educationPace
      educationLength
      description
    }
  }
`;



export function EditEducation() {
    const params = useParams();

    const { loading, error, data } = useQuery(QUERY_EDUCATION_BY_ID, {
        variables: { id: params.educationId },
      });
    
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        console.error(error);
        return "Error!";
      }
      if (data) {
          console.log("Data: " + JSON.stringify(data.educationById, null, 2));
      }
    
      return <EditForm data={data} />
}

function EditForm({data}) {
    console.log("PORPS:" + JSON.stringify(data));
    const [ educationName, setEducationName ] = React.useState(data.educationById.name);
    const [ educationLength, setEducationLength ] = React.useState(data.educationById.educationLength);
    const [ educationPace, setEducationPace ] = React.useState(data.educationById.educationPace);
    const [ educationType, setEducationType ] = React.useState(data.educationById.educationType);
    const [ educationDescription, setEducationDescription ] = React.useState(data.educationById.description);

    const [ errorMessages, setErrorMessages ] = React.useState(false);

    const isSubmittable = Boolean(educationName && educationLength && educationLength && educationType && educationDescription);

    const [editEducation] = useMutation(MUTATION_UPDATE_EDUCATION);

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
            editEducation({
                variables: {
                    id: data.educationById.id,
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
    <h2>Edit Education</h2>
    <form onSubmit={handleSubmit} className="add-form">
    <div className="form-control">
        <label htmlFor="name" className="animated-label">Name of education</label>
        <div className="control">
            <input type="text" name="name" placeholder="Name of education" onChange={handleChange} autoComplete="off" value={educationName}></input>
        </div>
    </div>
    <div className="form-control">
        <label htmlFor="educationType" className="animated-label">Education type</label>
        <div className="control">
            <input type="text" name="educationType" placeholder="Education type" onChange={handleChange} autoComplete="off" value={educationType}></input>
        </div>
    </div>
    <div className="form-control">
        <label htmlFor="educationLength" className="animated-label">Education length</label>
        <div className="control">
            <input type="text" name="educationLength" placeholder="Education length" onChange={handleChange} autoComplete="off" value={educationLength}></input>    
        </div>
    </div>
    <div className="form-control">
        <label htmlFor="educationPace" className="animated-label">Education pace</label>
        <div className="control">
            <input type="text" name="educationPace" placeholder="Education pace" onChange={handleChange} autoComplete="off" value={educationPace}></input>    
        </div>
    </div>
    <div className="form-control">
    <label htmlFor="educationDescription" className="animated-label">Description</label>
        <div className="control">
            <textarea type="text" name="educationDescription" placeholder="Description" onChange={handleChange} autoComplete="off" value={educationDescription}></textarea>
        </div>
    </div>
        <button type="submit" className="button-primary">Update</button>
    </form>
</div>

}