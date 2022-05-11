import common from "styles/common.module.scss";

const BundleFaq = ({ faq: { questions, title } }) => {
  return (
    <div className={common.section}>
      <div className={`container ${common.container}`}>
        <div className="row">
          <div className="col-md-12 mb-5">
            <h2>{title}</h2>
          </div>
          {questions.map((question, i) => (
            <div className="col-md-6 mb-4" key={`question-${i}`}>
              <h4>{question.question}</h4>
              <p>{question.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundleFaq;
