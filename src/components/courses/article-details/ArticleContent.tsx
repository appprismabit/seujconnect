"use client";
import category_data from "@/data/ArticleData/CategoryData";
import { BtnArrow } from "@/svg/BtnArrow";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddArticleContent = ({ article, fetchArticles }: { article: any[], fetchArticles: (id: string | undefined) => void }) => {
  const [formData, setFormData] = useState({
    type: "",
    image: "",
    articleText: "",
    category: "",
    articleId: "",

  });

  const [file, setFile] = useState<File | null>(null);
  const [formType, setFormType] = useState<"image" | "heading">("heading");

  useEffect(() => {
    // const token = localStorage.getItem("token");
    setFormData((prevData) => ({
      ...prevData,
      articleId: article[0]?._id || "",
    }));

  }, [article]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    

    if (formType === "image" && !file) {
      toast.error("Please upload an image file", {
        position: "top-center",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("content[type]", formType);
    if (formType === "image" && file) {
      formDataToSend.append("content[src]", file);
      formDataToSend.append('content[alt]', file);

    } else {
      if (!formData.articleText || !formData.category) {
        toast.error("Please fill out all fields", {
          position: "top-center",
        });
        return;
      }

      formDataToSend.append("content[text]", formData.articleText);
      formDataToSend.append("content[level]", formData.category);
    }
    formDataToSend.append("articleId", formData.articleId);


    try {
      const response = await fetch("/api/article/addArticleContent", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast.success("Article added successfully!", {
          position: "top-center",
        });
        fetchArticles(article[0]?._id);
        setFormData({ ...formData, articleText: "", category: "" });
        setFile(null);
      } else {
        const errorText = await response.text();
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
    <div className="dashboard__content-wrap" >
      <form onSubmit={handleSubmit} className="instructor__profile-form">
        <div className="row">
          <div className="col-md-12">
            <label>Select Form Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="heading"
                  checked={formType === "heading"}
                  onChange={() => setFormType("heading")}
                />
                Text
              </label>
              <label>
                <input
                  type="radio"
                  value="image"
                  checked={formType === "image"}
                  onChange={() => setFormType("image")}
                />
                Image
              </label>
            </div>
          </div>

          {formType === "heading" && (
            <>
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

              <div className="col-md-12">
                <div className="form-grp">
                  <label htmlFor="articleText">Article Text</label>
                  <textarea
                    id="articleText"
                    value={formData.articleText}
                    onChange={handleInputChange}
                    placeholder="Enter article description"
                    required
                  ></textarea>
                </div>
              </div>
            </>
          )}

          {formType === "image" && (
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="contentphoto">Thumbnail Photograph</label>
                <input
                  id="contentphoto"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
          )}
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

export default AddArticleContent;
