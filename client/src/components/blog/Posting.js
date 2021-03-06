import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Container, Card, Row, Col} from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import Dropzone from 'react-dropzone';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Posting = ({post}) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: ""
    })

    const {title} = formData;

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

        const token = localStorage.getItem('jwtToken');
        const selectedImg = selectedFiles[0] ? selectedFiles[0].preview : ""

        if(title) {
            if(post) {
                axios
                    .patch(`/blog/edit/${post._id}`, {
                        title, content: editorToHtml, image: selectedImg
                    }, {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    })
                    .then(res => {
                        setFormData({...formData})
                        toast.success('success')
                        setTimeout(() => {
                            window.location.replace(`/post/${post._id}`)
                        }, 5500)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                axios
                    .post("http://localhost:5000/blog/write", {
                            title, content: editorToHtml, image: selectedImg},
                        {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    })
                    .then(res => {
                        setFormData({...formData})
                        toast.success('success')
                        setTimeout(() => {
                            window.location.replace(`/post/${res.data._id}`)
                        }, 5500)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
        else {
            toast.error("title or content field is empty")
        }
    }

    useEffect(() => {
        if (post && post.content) {
            const blocksFromHtml = htmlToDraft(post.content);

            if(blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const editorState = EditorState.createWithContent(contentState);

                setEditorState(editorState)
                setFormData({...formData, title: post.title})
            }
        }
    }, [post])

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
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            toolbar={{
                                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                            }}
                            localization={{
                                locale: 'ko'
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

export default Posting;
