import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./creatpost.css";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useNavigate,useParams } from "react-router-dom";
import { modules, formats } from "../utils/editor-modules";

const EditPage = () => {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://cheap-blog-site.onrender.com/post/${id}`).then((res) => {
      res.json().then((info) => {
        settitle(info.title);
        setsummary(info.summary);
        setcontent(info.content);
        setImageSrc(info.imageUrl);
        setLoading(false);
      });
    });
  }, []);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      // setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    setLoading(true);
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "images");

    let data=null;
    if(fileInput.files.length > 0){
        data = await fetch(
          "https://api.cloudinary.com/v1_1/dahusry4n/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
    }

    if(!data){
        data = {secure_url:imageSrc};
    }

    const response = await fetch(`https://cheap-blog-site.onrender.com/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        summary: summary,
        content: content,
        imageUrl: data.secure_url,
      }),
      credentials: "include",
    });
    setTimeout(() => {
      setLoading(false);
    }, 10000);
    setLoading(false);

    navigate(`/post/${id}`);
  }

  return (
    <>
      {loading && (
        <div className="backdrop">
          <HashLoader color="#1a1a1a" className="loader" />
        </div>
      )}
      <form onSubmit={handleOnSubmit}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setsummary(e.target.value)}
        />
        <input type="file" name="file" onChange={handleOnChange} />
        {imageSrc && (
          <div className="dashed">
            <img src={imageSrc} className="image" />
          </div>
        )}
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newVal) => setcontent(newVal)}
        />
        <button className="button-28b" role="button">
          Update
        </button>
      </form>
    </>
  );
};

export default EditPage;
