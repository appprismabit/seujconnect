"use client";

import category_data from "@/data/ArticleData/CategoryData";
import BtnArrow from "@/svg/BtnArrow";
import { useState } from "react";
import { toast } from "react-toastify";

interface ArticleItem {
  type: "text" | "image";
  value: string;
}

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<ArticleItem[]>([]);

  // Add a new content item (either text or image)
  const addItem = (type: "text" | "image") => {
    setItems([...items, { type, value: "" }]);
  };

  // Handle item change
  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index].value = value;
    setItems(updatedItems);
  };

  // Submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = {
      title,
      subtitle,
      category,
      items,
    };

    console.log(articleData);
    toast("Article submitted successfully!", { position: "top-center" });

    // Reset form after submission
    setTitle("");
    setSubtitle("");
    setCategory("");
    setItems([]);
  };

  return (
    <>
      <div className="dashboard__content-wrap">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="instructor__profile-form"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="form-grp">
                <label htmlFor="arttitle">Ttile of Your Article</label>
                <input id="firstname" type="text" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-grp">
                <label htmlFor="artdesc"></label>
                <textarea id="subtitle"></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-grp select-grp">
                <label htmlFor="category">Select Category</label>
                <select id="category" name="category">
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
                <label htmlFor="Thumb Photograph">Thumbnail Photograph</label>
                <input id="thumbphoto" type="file" />
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
    </>
  );
};

export default AddArticleForm;
