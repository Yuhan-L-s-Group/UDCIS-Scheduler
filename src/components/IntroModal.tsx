import React from "react";
import { Modal, Button } from "react-bootstrap";
// A friendly welcome messgae introducing how to use this web
export function IntroModal({
    show,
    handleClose
}: {
    show: boolean;
    handleClose: () => void;
}) {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to the UD CIS Scheduler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This site allows you to create your own computer science
                    degree plan at the University of Delaware. You can use the
                    search box on the left to find courses in the database and
                    add them to your customized degree plan. And confirm the
                    completion of course requirements for each plan. You can
                    also modify course information to make it more relevant to
                    your situation. I hope this site helps you plan your college
                    years. Have fun!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        OK!
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
