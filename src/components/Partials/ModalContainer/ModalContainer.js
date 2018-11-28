import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UpdateRequestForm } from '../FormContainer';
import './ModalContainer.scss';

const renderButton = (props) => {
    switch(props.actionName){
        case 'Update Request': return <Button color="primary" onClick={props.updateRequestAction}>Update Request</Button>;
        default: return <Button color="primary" onClick={props.addGuestAction}>Add Request</Button>;
    }
}

const renderForm = (props) => {
    switch(props.actionName){
        case 'Update Request': return <UpdateRequestForm requestMsg={props.requestMsg} status={props.status} onChange={props.onChange} handleOnMsgChange={props.handleOnMsgChange} />;
        default: return <UpdateRequestForm hostEmail={props.hostEmail} guestName={props.guestName} selectPurpose={props.selectPurpose} timeIn={props.timeIn} tagNo={props.tagNo} onChange={props.onChange} />;
    }
}

const ModalContainer = props => {
    return (
        <div className="add-guest-modal">
            <Modal isOpen={props.isModalOpen} toggle={() => props.toggle('')}>
                <ModalHeader toggle={() => props.toggle('')}>
                    {props.actionName || "Andela Genie Request Form"}
                </ModalHeader>
                <ModalBody>
                    <div className="action-form-container">
                        {renderForm(props)}
                    </div>
                </ModalBody>
                <ModalFooter>
                {renderButton(props)}{' '}
                <Button color="secondary" onClick={() => props.toggle('')}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalContainer;
