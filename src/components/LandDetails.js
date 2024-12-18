import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faShareAlt } from "@fortawesome/free-solid-svg-icons";

const LandDetails = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchLandData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await axios.get(
          `https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`
        );

        console.log("Response of Land details ::", response);
        const newData = response.data.results;

        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandData();
  }, []);

  return (
    <div className="container mt-4">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchLandData}
        hasMore={hasMore}
        loader={
          <div className="text-center mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading more data...</p>
          </div>
        }
        endMessage={
          <p className="text-center text-muted">
            <b>No more data available</b>
          </p>
        }
      >
        <div className="row">
          {data.map((item, index) => {
            const {
              land_media,
              total_land_size_in_acres,
              price_per_acre,
              // location,
              division_info,
            } = item;

            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="position-relative">
                    {land_media && land_media.length > 0 ? (
                      <img
                        src={land_media[0].image}
                        alt={`Land ${index}`}
                        className="card-img-top img-fluid"
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                    ) : (
                      <div className="text-center p-3">No Image Available</div>
                    )}

                    <div className="icon-overlay-container icon-main">
                      <div className="icon-circle heart-icon">
                        <FontAwesomeIcon icon={faRegHeart} className="icon" />
                      </div>

                      <div className="icon-circle share-icon">
                        <FontAwesomeIcon icon={faShareAlt} className="icon" />
                      </div>
                    </div>
                  </div>
                  {/* Bootstrap Card */}
                  <div className="card-body">
                    <h5 className="card-title cardtitle">
                      ₹ {price_per_acre} lakhs/acre •{" "}
                      {total_land_size_in_acres.acres} Acres{" "}
                      {total_land_size_in_acres.guntas &&
                        `${total_land_size_in_acres.guntas} Guntas`}
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="CheckCircle"
                      />
                    </h5>
                    <p className="card-text cardtext">
                      {division_info && division_info.length > 0
                        ? `ST: ${
                            division_info.find(
                              (info) => info.division_type === "state"
                            )?.name || "N/A"
                          }, DT: ${
                            division_info.find(
                              (info) => info.division_type === "district"
                            )?.name || "N/A"
                          }, MD: ${
                            division_info.find(
                              (info) => info.division_type === "mandal"
                            )?.name || "N/A"
                          }`
                        : "Location not available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default LandDetails;
