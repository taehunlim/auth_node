import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Card, Row, Col} from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import Dropzone from 'react-dropzone';
import {EditorState} from 'draft-js';


const Posting = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: ""
    })

    const {title, content, image} = formData

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})

        console.log(formData)
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)

        console.log(editorState)
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleAcceptedFiles = files => {
        files.map(file => {
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size)
            })
        });

        setSelectedFiles(files)
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    return (
        <div className="space-mt--r130 write">
            <Container>
                <form method="post">
                    <Card.Header>
                        <Card.Title>
                            News & Updates
                        </Card.Title>
                    </Card.Header>

                    <Card.Body >
                        <Card.Title>
                            Title
                        </Card.Title>

                        <input
                            className="w-100 title"
                            placeholder="Tittle feild"
                            type="text"
                            onChange={handleChange('title')}
                            value={title}
                        />
                    </Card.Body>

                    <Card.Body>
                        <Card.Title>
                            Content
                        </Card.Title>

                        <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            localization={{
                                local: "ko"
                            }}
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}

                        />
                    </Card.Body>

                    <Card.Body>
                        <Card.Title>
                            Attach a file or URL
                        </Card.Title>

                        <form
                            onSubmit={handleSubmit}
                        >
                            <Dropzone
                                onDrop={acceptedFiles =>
                                    handleAcceptedFiles(acceptedFiles)
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div className="dropzone">
                                        <div
                                            className="dz-message needsclick mt-2"
                                            {...getRootProps()}
                                        >
                                            <input {...getInputProps()} />
                                            <div className="mb-3">
                                                <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                            </div>
                                            <h4>Drop files here or click to upload.</h4>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                            <div
                                className="dropzone-previews mt-3"
                                id="file-previews"
                            >
                                {selectedFiles.map((f, i) => {
                                    return (
                                        <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                            key={i + "-file"}
                                        >
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            data-dz-thumbnail=""
                                                            height="80"
                                                            className="rounded bg-light"
                                                            alt={f.name}
                                                            src={f.preview}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            to="#"
                                                            className="text-muted font-weight-bold"
                                                        >
                                                            {f.name}
                                                        </Link>
                                                        <p className="mb-0">
                                                            <strong>{f.formattedSize}</strong>
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <button type="button" className="btn btn-primary m-2">Post</button>

                            <button type="button" className="btn btn-primary m-2">Save as Draft</button>
                        </div>
                    </Card.Body>
                </form>
            </Container>
        </div>
    );
};

export default Posting;
