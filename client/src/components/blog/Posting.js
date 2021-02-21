import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Card, Row, Col} from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import Dropzone from 'react-dropzone';
import {EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'


const Posting = ({history}) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: ""
    })

    const {title, content, image} = formData;

    const token = localStorage.getItem('jwtToken');

    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //Strip HTML
    // const contentForSubmit = editorToHtml.replace(/<[^>]+>/g, '')

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
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

    const handleSubmit = e => {
        e.preventDefault();

        if(title) {
            axios
                .post("http://localhost:5000/blog/write", {
                    title, content: editorToHtml, image:selectedFiles[0].preview
                }, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                .then(res => {
                    setFormData({...formData})
                    toast.success('success')
                    setTimeout(() => {
                        history.push(`/post/${res.data.blog._id}`)
                    }, 5500)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            toast.error("title or content field is empty")
        }
    }

    return (
        <div className="space-mt--r130 write">
            <ToastContainer/>
            <Container>
                <Card.Header>
                    <Card.Title className="mt-2 mb-2">
                        News & Updates
                    </Card.Title>
                </Card.Header>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        border: "1px outset rgba(0, 0, 0, 0.125)",
                        borderTop: "none"
                    }}
                >
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

                        <div dangerouslySetInnerHTML={{__html: editorToHtml}} />
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
                                multiple
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
                            <button type="submit" className="btn btn-primary m-2">Post</button>

                            <button type="submit" className="btn btn-primary m-2">Save as Draft</button>
                        </div>
                    </Card.Body>
                </form>
            </Container>
        </div>
    );
};

export default withRouter(Posting);
