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
                    This website allows you to create your own computer science
                    major degree plan at University of Delaware. The menu on the
                    left shows all the required courses for the major, and you
                    can easily edit them. You can also add custom courses if
                    there are none that meet your needs. You can switch between
                    concentrations in the drop-down menu at the top to make the
                    list of courses more relevant to your concentration needs.
                    Have fun!
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
