import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import common from "../../styles/common.module.scss";

const Testimonial = ({ name, user, serviceTitle }) => {
  return (
    <section className={`${common.section} bg-light`}>
      <div className={`container ${common.container}`}>
        <div className="row">
          <div className={`col-12 ${common.sectionTitle}`}>
            <div className={`${common.textCenter} text-center mb-5`}>
              <h2
                className={common.title}
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(name ? name : serviceTitle),
                }}
              ></h2>
            </div>
          </div>
        </div>
        <div className="row">
          {user.map((user, i) => (
            <div className="col-lg-4 col-md-6" key={`user-${i}`}>
              <div className={`card border-0 ${common.feedbackItem}`}>
                <div className="card-body p-0 mb-2">
                  <p className={common.feedbackText}>{user.feedback}</p>
                </div>
                <div className="card-footer d-flex align-items-center p-0 border-0 bg-transparent">
                  <Image
                    className="rounded-circle"
                    width="59"
                    height="60"
                    src={user.image}
                    alt=""
                    placeholder="blur"
                    blurDataURL={user.image}
                  />
                  <div className="ms-3">
                    <h6 className="mb-1">{user.name}</h6>
                    <p className="mb-0">{user.types}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-4 col-md-6">
            <div className={`card border-0 ${common.feedbackItem} `}>
              <div className="card-body p-0 text-center">
                <div className="d-flex flex-column align-items-center justify-content-center py-4 h-100">
                  <h5 className="font-weight-bold mb-4">Add your feedback</h5>
                  <span className={common.addFeedbackBtn}>
                    <span></span>
                  </span>
                  <Link href="#!">
                    <a className={common.stretchedLink}></a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
