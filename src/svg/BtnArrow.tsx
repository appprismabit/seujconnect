const BtnArrow = () => {
   return (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-inject-url="http://127.0.0.1:5500/skillgro-html/assets/img/icons/right_arrow.svg" className="injectable">
         <path d="M1 7L15 7M15 7L9 1M15 7L9 13" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
         <path d="M1 7L15 7M15 7L9 1M15 7L9 13" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
   )
}


const BtnPlus = () => {
   return (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="injectable">
      <path d="M8 1v12 M1 7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 1v12M1 7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
   </svg>
   )
}
export { BtnArrow, BtnPlus };
