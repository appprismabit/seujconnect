// "use client"; // Ensure this is the first line of your file

<<<<<<< HEAD
// import { toast } from 'react-toastify';
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import BtnArrow from "@/svg/BtnArrow";
// import Link from "next/link";
// import { useState } from 'react';
// import { useRouter } from 'next/router';

// inerface FormData{
//   articleTitle: string;
//   articleSubtitle: string;
//   articleCatg: string;
// }

// const schema = yup.object({
// articleTitle: yup.string().required('Article title is required').label('title'),
// articleSubtitle: yup.string().required('Article sub-title is required').label('sub-title');
// });

// const ArticleForm = () => {
//   const [articleTitle, setTitle] = useState("");
//   const [articleSubtitle, setSubtitle] = useState("");
//   const [articleCatg, setCategory] = useState("");
//   //const [thumbnail, setThumbnail] = useState<File | null>(null);

//   const router = useRouter(); // Correct hook usage from next/navigation

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });


//     // if (!thumbnail) {
//     //   toast.error("Please add a thumbnail image.", { position: "top-center" });
//     //   return;
//     // }
=======
import category_data from "@/data/ArticleData/CategoryData";
import BtnArrow from "@/svg/BtnArrow";
import { useState } from "react";
import { toast } from "react-toastify";

interface ArticleItem {
  type: "text" | "image";
  value: string;
}
>>>>>>> 21561507af556ab6ea444304677c17e80025ca6a

//     const articleData = {
//       title,
//       subtitle,
//       category,
//       thumbnail,
//     };

//     console.log(articleData); // Simulate form submission
//     toast.success("Article submitted successfully!", { position: "top-center" });

//     // Redirect to another page after submission
//     router.push("/articles");

//     // Reset form fields
//     setTitle("");
//     setSubtitle("");
//     setCategory("");
//     setThumbnail(null);
//   };

<<<<<<< HEAD
//   // Handle thumbnail change
//   const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setThumbnail(e.target.files[0]);
//     }
//   };
=======
    console.log(articleData);
    toast("Article submitted successfully!", { position: "top-center" });
>>>>>>> 21561507af556ab6ea444304677c17e80025ca6a

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="container mt-5 p-4 border rounded shadow-sm bg-white">
//       <h3 className="mb-4 text-center">Add New Article</h3>

<<<<<<< HEAD
//       {/* Title */}
//       <div className="mb-3">
//         <label htmlFor="title" className="form-label fw-bold">Title</label>
//         <input
//           type="text"
//           id="articleTitle"
//           className="form-control"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter article title"
//           required
//         />
//       </div>

//       {/* Subtitle */}
//       <div className="mb-3">
//         <label htmlFor="subtitle" className="form-label fw-bold">Subtitle</label>
//         <input
//           type="text"
//           id="articleSubtitle"
//           className="form-control"
//           value={subtitle}
//           onChange={(e) => setSubtitle(e.target.value)}
//           placeholder="Enter article subtitle"
//           required
//         />
//       </div>

//       {/* Category */}
//       <div className="mb-3">
//         <label htmlFor="category" className="form-label fw-bold">Category</label>
//         <select
//           id="articleCatg"
//           className="form-select"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         >
//           <option value="" disabled>Select category</option>
//           {menu_data.map((cat) => (
//             <option key={cat.id} value={cat.title}>
//               {cat.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Thumbnail Image */}
//       {/* <div className="mb-4">
//         <label htmlFor="thumbnail" className="form-label fw-bold">Thumbnail Image</label>
//         <input
//           type="file"
//           id="thumbnail"
//           className="form-control"
//           accept="image/*"
//           onChange={handleThumbnailChange}
//           required
//         />
//       </div> */}

//       {/* Submit Button */}
//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary btn-lg">Submit Article</button>
//       </div>
//     </form>
//   );
// };

// export default ArticleForm;
=======
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
>>>>>>> 21561507af556ab6ea444304677c17e80025ca6a
