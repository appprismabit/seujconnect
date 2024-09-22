import SingleArticleContent from "./singleArticleContent";

const SingleArticleArea = ({ style }: any) => {
  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <div className="row">
          <SingleArticleContent />
        </div>
      </div>
    </section>
  );
};
export default SingleArticleArea;