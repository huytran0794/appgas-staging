import clsx from "clsx";
import React from "react";
import Container from "../Container/Container";

const SectionWrapper = ({
  containerClass,
  sectionClass,
  subTitle,
  subTitleClass,
  title,
  titleClass,
  content,
  contentClass,
  sectionTitleClass,
}) => {
  return (
    <section
      className={clsx(
        "overflow-auto max-h-[calc(100vh-90px-104px-10px)]",
        sectionClass
      )}
    >
      <Container className={containerClass}>
        {title && (
          <div className={clsx("section-title", "mb-5", sectionTitleClass)}>
            <h3
              className={clsx(
                "title",
                "uppercase text-2xl font-extrabold tracking-wide relative",
                subTitle && "mb-3",
                titleClass
              )}
            >
              <div className="relative z-[2]">{title}</div>
            </h3>
            {subTitle && (
              <h6
                className={clsx(
                  "section-sub-title text-base tracking-wider text-[#172B4D]/70 font-medium",
                  subTitleClass
                )}
              >
                {subTitle}
              </h6>
            )}
          </div>
        )}
        {content && (
          <div className={clsx("section-content", contentClass)}>{content}</div>
        )}
      </Container>
    </section>
  );
};

export default SectionWrapper;
