"use client";

import category_data from "@/data/ArticleData/CategoryData";
import BtnArrow from "@/svg/BtnArrow";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = ({ style }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    token: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Safely access localStorage only on the client side
    const token = localStorage.getItem("token");
    setFormData((prevData) => ({
      ...prevData,
      token: token || "",
    }));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !file
    ) {
      toast.error("Please fill out all fields and upload a file", {
        position: "top-center",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("token", formData.token);
    if (file) {
      formDataToSend.append("file", file); // Make sure this key matches what the back-end expects
    }

    try {
      const response = await fetch("/api/article/addArticle", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast.success("Article added successfully!", {
          position: "top-center",
        });

        // Optionally reset the form
        setFormData({
          title: "",
          description: "",
          category: "",
          token: formData.token, // Keep the token
        });
        setFile(null);
      } else {
        const errorText = await response.text(); // Read the response body for error details
        console.error("Error adding article:", errorText);
        toast.error("Error adding article: " + errorText, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred", { position: "top-center" });
    }
  };

  return (
    <div className="dashboard__content-wrap" style={style}>
      <form onSubmit={handleSubmit} className="instructor__profile-form">
        <div className="row">
          <div className="col-md-12">
            <div className="form-grp">
              <label htmlFor="title">Title of Your Article</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter article title"
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-grp">
              <label htmlFor="description">Article Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter article description"
                required
              ></textarea>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-grp select-grp">
              <label htmlFor="category">Select Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {category_data.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-grp">
              <label htmlFor="thumbphoto">Thumbnail Photograph</label>
              <input
                id="thumbphoto"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="submit-btn mt-25">
          <button type="submit" className="btn arrow-btn bg-success">
            Proceed
            <BtnArrow />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleForm;
