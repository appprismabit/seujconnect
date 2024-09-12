// "use client"; // Ensure this is the first line of your file

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

//   // Handle thumbnail change
//   const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setThumbnail(e.target.files[0]);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="container mt-5 p-4 border rounded shadow-sm bg-white">
//       <h3 className="mb-4 text-center">Add New Article</h3>

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