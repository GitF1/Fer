import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function VideoModal({video_link}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="info" onClick={handleShow}>
                View
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>View video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe width="100%" height="250"
                        src={video_link}
                        title="HIGHLIGHTS CHUNG KẾT EURO 2024 | TÂY BAN NHA - ANH: RƯỢT ĐUỔI NGHẸT THỞ, NHÀ VUA LỘ DIỆN"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        // referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default VideoModal;