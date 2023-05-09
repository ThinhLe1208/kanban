import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
import { Editor } from "@tinymce/tinymce-react";

const cx = classNames.bind(styles);

export default function EditorField({ label, name, height = 200, value, onEditorChange }) {
  return (
    <div className={cx("wrapper")}>
      <label className={cx("label")} htmlFor={name}>
        {label}
      </label>
      <Editor
        name={name}
        id={name}
        apiKey="64iv1bamj3ly5fr482iq34ud6xb2ebvhmf30hyzbx11eauzq"
        value={value}
        onEditorChange={(value) => {
          onEditorChange(name, value);
        }}
        init={{
          height: height,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "autoresize",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family: Inter,Helvetica,Arial,sans-serif ; font-size:14px }",
        }}
      />
    </div>
  );
}
