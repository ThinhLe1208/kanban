import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function ProjectCreate() {
    const initialEditorValue = "<p>This is the initial content of the editor.</p>";
    const [valueEditor, setValueEditor] = useState(initialEditorValue);

    return (
        <div className="container">
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item">CyberLearn</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Create Project
                        </li>
                    </ol>
                </nav>
            </div>

            <h3 className='ms-3 mb-3'>Create Project</h3>
            <form className='container'>
                <div className="form-group">
                    <p>Name</p>
                    <input name='projectName' type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        apiKey='64iv1bamj3ly5fr482iq34ud6xb2ebvhmf30hyzbx11eauzq'
                        initialValue={initialEditorValue}
                        value={valueEditor}
                        onEditorChange={(newValue) => setValueEditor(newValue)}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div className="form-group">
                    <p>Project Category</p>
                    <select name="categoryId" className="form-select">
                        <option>Software</option>
                        <option>Web</option>
                        <option>App</option>
                    </select>
                </div>
                <button className="btn btn-primary">Create project</button>
            </form>
        </div>
    );
}
