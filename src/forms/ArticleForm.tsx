"use client";

import menu_data from "@/data/home-data/MenuData";
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

    console.log(articleData); // Simulate submitting to an API
    toast("Article submitted successfully!", { position: "top-center" });

    // Reset form after submission
    setTitle("");
    setSubtitle("");
    setCategory("");
    setItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className="article-form space-y-6">
      {/* Title */}
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="form-group">
        <label htmlFor="subtitle" className="form-label">Subtitle</label>
        <input
          type="text"
          id="subtitle"
          className="form-control"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Enter article subtitle"
          required
        />
      </div>

      {/* Category */}
      <div className="form-group">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select category</option>
          {menu_data.map((cat) => (
            <option key={cat.id} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Dynamic Items */}
      <div className="form-group">
        <label className="form-label">Article Content</label>
        {/* Flexbox or button group to align buttons in one line */}
        <div className="d-flex gap-2 mb-3">  {/* Flex container for proper alignment */}
          <button type="button" className="btn btn-secondary" onClick={() => addItem("text")}>
            Add Text
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => addItem("image")}>
            Add Image
          </button>
        </div>
      </div>

      {/* Render Dynamic Items */}
      {items.map((item, index) => (
        <div key={index} className="form-group">
          {item.type === "text" ? (
            <>
              <label htmlFor={`text-${index}`} className="form-label">Text Content {index + 1}</label>
              <textarea
                id={`text-${index}`}
                className="form-control"
                value={item.value}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder="Enter text content"
              />
            </>
          ) : (
            <>
              <label htmlFor={`image-${index}`} className="form-label">Image URL {index + 1}</label>
              <input
                type="text"
                id={`image-${index}`}
                className="form-control"
                value={item.value}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder="Enter image URL"
              />
            </>
          )}
        </div>
      ))}

      {/* Submit Button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Submit Article</button>
      </div>
    </form>
  );
};

export default AddArticleForm;
