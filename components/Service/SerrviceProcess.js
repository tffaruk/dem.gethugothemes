import styles from "styles/service.module.scss";
import common from "styles/common.module.scss";
import { marked } from "marked";

const SerrviceProcess = ({ process: { title, proceses } }) => {
  return (
    <section className={styles.ghtProcess}>
      <div className={`${common.container} container`}>
        <div className={`row justify-content-center ${styles.row}`}>
          <div className="col-xl-6 col-md-8">
            <div className={`${common.sectionTitle} `}>
              <div className={`${common.textCenter} text-center`}>
                <h2 className={common.title}>{title}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.row} ${styles.processItemsBlock} row`}>
          {proceses.map((process, i) => (
            <div className="col-lg-3 col-md-6" key={`process-${i}`}>
              <div className={` text-center ${styles.processItem} `}>
                <div
                  className={`${styles.count} d-flex align-items-center justify-content-center flex-column`}
                >
                  {process.step} <span>STEP</span>
                </div>
                <div className={styles.block}>
                  <h4
                    className={`mb-3 ${common.title}`}
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(process.name),
                    }}
                  ></h4>
                  <p className="mb-0">{process.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SerrviceProcess;
