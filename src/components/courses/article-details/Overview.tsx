import { Key, useState } from "react";
import { BtnArrow, BtnPlus } from "@/svg/BtnArrow"; // Ensure this path is correct
import Link from "next/link";
import ArticleContent from "./ArticleContent";
import Image from "next/image";
import { toast } from "react-toastify";

const Overview = ({ article, fetchArticles }: { article: any[], fetchArticles: (id: string | undefined) => void }) => {
   // State to manage the visibility of ArticleContent
   const [showContent, setShowContent] = useState(false);
   const [editableText, setEditableText] = useState<{ [key: number]: string }>({});

   const [showImageEditableField, setImageEditableField] = useState(false);

   const toggleImageField = (_id: any, text: string) => {
      setImageEditableField((prev) => !prev);
   };

   // Function to toggle the visibility
   const toggleContent = () => {
      setShowContent((prev) => !prev);
   };

   const handleEditChange = (index: number, value: string) => {
      setEditableText((prev) => ({
         ...prev,
         [index]: value,
      }));
   };

   const handleSave = async (
      contentId: string,
      articleId: string,
      text?: string,
      type?: string,
      level?: string,
      src?: File,
      alt?: any
   ) => {
      console.log(`src: ${src}, alt: ${alt}, type: ${type}`);

      const formData = new FormData();

      // Append common identifiers
      formData.append('articleId', articleId);
      formData.append('contentId', contentId);

      if (type === 'heading') {
         // Append specific data for heading type
         formData.append('content[type]', type);
         if (level) {
            formData.append('content[level]', level);
         }
         if (text) {
            formData.append('content[text]', text);
         }
      } else if (type === 'image') {

         if (src) {
            formData.append('content[src]', src);
         }
         if (alt) {
            formData.append('content[alt]', alt);
         }
      }

      try {
         const response = await fetch('api/article/updateArticleContent', {
            method: 'POST',
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         const data = await response.json();
         if (data) {
            toast.success('Updated successfully', { position: 'top-center' });
            fetchArticles(article[0]?._id);
         } else {
            toast.error('Failed to update', { position: 'top-center' });
         }

      } catch (error: any) {
         console.error('Error:', error);
      }

   }

   return (
      <div className="courses__overview-wrap">
         {article[0]?.content.map((item: {
            alt(_id: any, arg1: string, _id1: any, type: string, level: string, src: any, alt: any): void; type: string; level: string; text: string; src: any; _id: any
         }, index: Key | null | undefined) => {
            if (item.type === 'heading') {
               if (item.level === 'heading') {
                  return <h3 key={index} className="title">{item.text}</h3>;
               } else if (item.level === 'bullet') {
                  return (
                     <div key={index}>
                        {editableText[item._id] !== undefined ? (
                           <div>
                              <textarea
                                 style={{ width: '100%', height: 'auto', resize: 'vertical' }}
                                 value={editableText[item._id]}
                                 onChange={(e) => handleEditChange(item._id, e.target.value)}
                                 rows={3} // Initial rows can be adjusted based on your needs
                              />

                              <button onClick={() => handleSave(item._id, article[0]?._id, editableText[item._id], item.type, item.level)} className="btn bg-success text-white">
                                 Save
                              </button>
                           </div>
                        ) : (
                           <><div className="submit-btn">
                              <div className="tg-button-wrap" style={{
                                 justifyContent: 'right',
                              }}>
                                 <div onClick={() => handleEditChange(item._id, item.text)} >
                                    <i className="fas fa-pencil-alt"></i>
                                 </div>
                              </div>

                           </div><li key={index} className="about__info-list-item" style={{
                              marginBottom: '20px'
                           }}>
                                 <i className="flaticon-angle-right"></i>
                                 <p className="content">{item.text}</p>
                              </li></>
                        )
                        }
                     </div>

                  );
               } else if (item.level === 'paragraph') {
                  return (
                     <div key={index}>
                        {editableText[item._id] !== undefined ? (
                           <div>
                              <textarea
                                 style={{ width: '100%', height: 'auto', resize: 'vertical' }}
                                 value={editableText[item._id]}
                                 onChange={(e) => handleEditChange(item._id, e.target.value)}
                                 rows={3} // Initial rows can be adjusted based on your needs
                              />

                              <button onClick={() => handleSave(item._id, article[0]?._id, editableText[item._id], item.type, item.level)} className="btn bg-success text-white">
                                 Save
                              </button>
                           </div>
                        ) : (
                           <>
                              <div className="submit-btn">
                                 <div className="tg-button-wrap" style={{
                                    justifyContent: 'right',

                                 }}>
                                    <div onClick={() => handleEditChange(item._id, item.text)}>
                                       <i className="fas fa-pencil-alt"></i>
                                    </div>
                                 </div>

                              </div>
                              <p className="last-info">{item.text}</p>

                           </>
                        )}
                     </div>
                  );

               }
            } else if (item.type === 'image') {
               return (

                  <><div className="submit-btn">
                     <div className="tg-button-wrap" style={{
                        justifyContent: 'right',
                     }}>
                        <div onClick={() => toggleImageField(item._id, item.src)}>
                           <i className="fas fa-pencil-alt"></i>
                        </div>
                     </div>

                     {showImageEditableField && (
                        <div className="col-md-6">

                           <label htmlFor="contentphoto">Thumbnail Photograph</label>
                           <input
                              id={`contentphoto-${item._id}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleEditChange(item._id, e.target.value)}

                              required
                           />

                           <button onClick={() => handleSave(item._id, article[0]?._id, editableText[item._id], item.type, item.level, item.src, item.alt)} className="btn bg-success text-white">
                              Save
                           </button>
                        </div>
                     )}

                  </div>
                     <div className="row justify-content-center" key={index}>
                        <div className="col-lg-6 col-md-6">
                           <div className="features__item-two">
                              <div className="features__content-two">
                                 <Image
                                    style={{
                                       borderRadius: '10px',
                                       objectFit: 'cover'
                                    }}
                                    src={`/uploads/artclecontent/${item.src}`}
                                    width={300} // Set desired width
                                    height={250} // Set desired height
                                    layout="responsive"
                                    loading="eager"
                                    alt="img" />
                              </div>
                           </div>
                           <span style={{
                              padding: '200px',
                              fontSize: '12px',
                              color: 'black',
                              zIndex: '1',
                           }}>Fig</span>
                        </div>
                     </div></>
               );
            }
            return null; // Fallback for any unmatched conditions
         })}

         <div className="submit-btn mt-25">
            <div className="tg-button-wrap">
               <div onClick={toggleContent} className="btn btn-two arrow-btn bg-success text-white">
                  Add more <BtnPlus />
               </div>
            </div>
         </div>

         {showContent && <ArticleContent article={article} fetchArticles={fetchArticles} />}
      </div>
   );
};

export default Overview;

// 66f2df44260609405ac72fed
//66f2d793260609405ac72e74