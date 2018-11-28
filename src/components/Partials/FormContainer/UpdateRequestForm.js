import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './Forms.scss';

const UpdateRequestForm = (props) => {
    return (
        <div className="form-container">
            <Form className="add-guest-form" inline>
                <FormGroup className="col-md-12">
                    <Label for="visitPurpose" hidden>Request Status</Label>
                    <Input type="select" name="status" id="location" className="col-md-12" value={props.status} onChange={props.onChange} >
                        <option value="">Select Status</option>
                        <option value="0">Received</option>
                        <option value="1">In Progress</option>
                        <option value="2">Resolved</option>
                    </Input>
                </FormGroup>
                <FormGroup className="col-md-12">
                  <Input
                    type="textarea"
                    name="updateMsg"
                    id="exampleText"
                    placeholder="Text Area"
                    className="col-md-12"
                    rows="5"
                    value={props.requestMsg}
                    onChange={props.onChange}
                  />
                </FormGroup>
            </Form>
        </div>
    );
}

export default UpdateRequestForm;
