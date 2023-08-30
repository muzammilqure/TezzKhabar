import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=308f40ca3e7d4e619866c706eed4ff5d&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);

    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-Tezz Khabar`;

    updateNews();
  }, []);

  const fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=308f40ca3e7d4e619866c706eed4ff5d&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h2
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Tezz Khabar - Top
        {" " + capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {
              // !this.state.loading &&
              articles.map((el) => {
                return (
                  <div className="col-md-4" key={el.url}>
                    <NewsItem
                      title={el.title ? el.title.slice(0, 45) : ""}
                      description={
                        el.description ? el.description.slice(0, 88) : ""
                      }
                      imageUrl={el.urlToImage}
                      newsUrl={el.url}
                      author={el.author}
                      date={el.publishedAt}
                      source={el.source.name}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
