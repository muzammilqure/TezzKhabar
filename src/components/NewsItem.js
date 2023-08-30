import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className=" badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "unknown"} on
              {" " + new Date(date).toGMTString()}
            </small>
          </p>
          {/* // eslint-disable-next-line */}
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
