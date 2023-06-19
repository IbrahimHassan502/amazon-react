import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data";
import "./productpage.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegEnvelope,
  FaTwitter,
  FaFacebookF,
  FaPinterest,
  FaLock,
} from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { BiChevronDown, BiMap } from "react-icons/bi";
export default function ProductPage() {
  // *** GETTING PRODCUT BY ID &  IT
  const { prodId } = useParams(),
    product = products.find((product) => product.id === parseFloat(prodId)),
    {
      srcs,
      title,
      stars,
      ratings,
      about,
      points,
      storeName,
      patch1,
      patch2,
      category,
      price,
    } = product;

  // *** HANDLE STAR FRACTION NUMBERS
  let rest = stars % 1;
  // *** SIDE ICONS STATE
  const [sideSrcs, setSideSrcs] = useState(srcs);
  // *** FIRST VIEW BOX SRC STATE
  const [viewSrc, setViewSrc] = useState(srcs[0]);
  // *** TEMPORARY IMAGE WHEN HOVER ON TAG OR SUBIMG
  const [tempViewSrc, setTempViewSrc] = useState();
  // *** SHOWING THE ZOOMING DIV STATE
  const [isZooming, setIsZooming] = useState(false);
  // *** REDIRECT ID STATE
  const [redirectId, setRedirectId] = useState();
  // *** FILTER COLORS BASED ON PRODUCT
  const [colorFilter, setColorFilter] = useState(false);
  // *** FILTER PRODUCTS BASED ON COLORS
  const [filterProducts, setFilterProducts] = useState(false);
  //*** FOCUS ON THE VIEWED IMAGE
  useEffect(() => {
    let viewedImg = document.querySelector(`img[src="${viewSrc.icon}"]`);
    viewedImg.parentElement.focus();
  }, [viewSrc]);
  //*** MAGINFING THE VIEWED IMAGE
  const handleMagnifier = (e) => {
    setIsZooming(true);
    if (isZooming) {
      // GETTING THE DIMENTIONS OF THE VIEWED IMG
      const { right, bottom, width, height, x, y } = document
        .querySelector(".view-box img")
        .getBoundingClientRect();
      // GETTING THE MAGNIFIER
      const magnifier = document.querySelector(".magnifier");
      // GETTING THE DIEMTIONS OF THE MAGNIFIER
      const magBound = magnifier.getBoundingClientRect();
      // HANDLING THE MOVING POINT OF THE MAGNIFER
      const magnifierCenterX = magBound.width / 2;
      const magnifierCenterY = magBound.height / 2;
      const leftCoor = `${e.clientX - magnifierCenterX}`;
      const topCoor = `${e.clientY - magnifierCenterY}`;
      // STOPPING THE MAGNIFIER FROM LEAVING THE VIEW BOX BOUNDRIES
      if (leftCoor - x <= 0) {
        magnifier.style.left = 0;
      }
      if (leftCoor - x > 0) {
        magnifier.style.left = `${leftCoor - x}px`;
      }
      if (e.clientX + magnifierCenterX >= right) {
        magnifier.style.left = `${width - magBound.width}px`;
      }
      if (topCoor - y <= 0) {
        magnifier.style.top = 0;
      }
      if (topCoor - y > 0) {
        magnifier.style.top = `${topCoor - y}px`;
      }
      if (e.clientY + magnifierCenterY >= bottom) {
        magnifier.style.top = `${height - magBound.height}px`;
      }
      // GETTING THE ZOOMING DIV
      const bigMag = document.querySelector(".big-magnifier");
      // SETTING THE BACKGROUND TO THE DETAILED IMG OF THE HOVERD IMG
      bigMag.style.backgroundImage = `url(${viewSrc.detail})`;
      // ZOOMING THE BACKGROUND
      const widthRatio = width / magBound.width;
      const heightRatio = height / magBound.height;
      bigMag.style.backgroundSize = `${widthRatio * 100}% ${
        heightRatio * 100
      }%`;
      // SHOWING WHAT THE PART THE SMALL MAGNIFIER SHOULD ZOOM IN
      const magLeft = (magBound.x - x) / (width - magBound.width);
      const magTop = (magBound.y - y) / (height - magBound.height);
      bigMag.style.backgroundPosition = `${magLeft * 100}% ${magTop * 100}%`;
    }
  };
  // *** dliver date
  const dayInMilliseconds = 86400000;
  const arrivalSt = new Date(new Date().getTime() + 10 * dayInMilliseconds);
  const arrivalNd = new Date(new Date().getTime() + 37 * dayInMilliseconds);
  // *** GET PRODUCT IMAGE ON HOVER
  const getProdImg = (e) => {
    const tagText = e.target.innerText;
    const temporaryProd = products.find((product) => product.style === tagText);
    setTempViewSrc(temporaryProd.srcs[0]);
    setRedirectId(temporaryProd.id);
    return temporaryProd;
  };
  // *** REMOVE PRODCUT IMG WHEN MOUSE OUT
  const removeProdImg = () => {
    setTempViewSrc();
    setRedirectId(0);
  };
  // *** GET PRODUCT COLOR
  const getProdColor = (colorName) => {
    const productColor = points
      .find((point) => point.name === "colors")
      .srcs.find((src) => src.name === colorName);
    return productColor;
    // setTempViewSrc(productColor.srcs[0]);
  };
  const productColors = points
    .find((point) => point.name === "colors")
    .srcs.map((src) => src.name);
  // *** FILTERING VIEWED COLORS
  const filterProdColor = (subImg, color, index) => {
    console.log("filtering");
    if (true) {
      return (
        <li key={index} onMouseLeave={() => setTempViewSrc()}>
          <img
            src={subImg.iconSrc}
            alt="color-icon"
            onMouseOver={() =>
              setTempViewSrc(getProdColor(subImg.name).srcs[0])
            }
            onClick={() => setSideSrcs(getProdColor(subImg.name).srcs)}
          />
        </li>
      );
    } else {
      return (
        <li key={index} className="not-available">
          <img src={subImg.iconSrc} alt="color-icon" />
        </li>
      );
    }
  };

  const viewSubs = (availableSubImgs, value) => {
    availableSubImgs.map((subImg, index) => {
      if (subImg.name === value) {
        return (
          <li
            key={index}
            className="active"
            onMouseLeave={() => setTempViewSrc()}
          >
            <img
              src={subImg.iconSrc}
              alt="color-icon"
              onMouseOver={() =>
                setTempViewSrc(getProdColor(subImg.name).srcs[0])
              }
              onClick={() => setSideSrcs(getProdColor(subImg.name).srcs)}
            />
          </li>
        );
      } else {
        productColors.map((color) => {
          console.log("kosom hyatak");
        });
      }
    });
  };
  // *** MAIN RETURN
  return (
    <article className="product-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <section className="gallery">
              <div className="row">
                <div className="col-md-3">
                  <aside>
                    {sideSrcs.map((src, index) => {
                      return (
                        <div
                          key={index}
                          className="icon-container"
                          tabIndex="-1"
                          onMouseEnter={() => setViewSrc(() => src)}
                        >
                          <img
                            src={src.icon}
                            alt="icon"
                            className="icon"
                            onMouseEnter={() => setViewSrc(() => src)}
                          />
                        </div>
                      );
                    })}
                  </aside>
                </div>
                <div className="col-md-9 view-container">
                  <div className="view-box">
                    <img
                      src={tempViewSrc ? tempViewSrc.view : viewSrc.view}
                      className="viewed-img"
                      alt=""
                      onMouseMove={handleMagnifier}
                      onMouseLeave={() => setIsZooming(false)}
                    />
                    <div
                      className="magnifier"
                      onMouseMove={handleMagnifier}
                      onMouseLeave={() => setIsZooming(false)}
                    >
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/G/01/apparel/rcxgs/tile._CB483369110_.gif"
                        alt=""
                      />
                    </div>
                  </div>
                  <p className="zoom-text">
                    {isZooming
                      ? "click the image to open expanded view"
                      : "roll over the image to zoom in"}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="col-md-5">
            <section className="body">
              <header>
                <h4 className="title">{title}</h4>
                <Link to="#">visit {storeName} store</Link>
                <div>
                  <b>platform :</b>{" "}
                  <span className="text-capitalize">{category}</span>
                </div>
                <div>
                  <span className="stars">
                    {Array(Math.floor(stars))
                      .fill()
                      .map((star, index) => (
                        <FaStar key={index} />
                      ))}
                    {rest > 0.3 && <FaStarHalfAlt />}
                    <BiChevronDown className="chevron" />
                  </span>
                  <span className="ratings">
                    <a href="#">{ratings} ratings</a>
                  </span>
                </div>
                {patch1 && (
                  <div className="patch-container">
                    <span className="patch">
                      <span className="white">{patch1}</span>
                      <span className="orange"> {patch2}</span>
                    </span>
                    <span>
                      {" "}
                      in{" "}
                      <Link className="text-capitalize" to="#">
                        {category}
                      </Link>
                    </span>
                  </div>
                )}
              </header>
              <div className="product-body">
                <div className="points">
                  <p>
                    price: <span className="price">&#36;{price}</span> +
                    &#36;243.53 Shipping & Import Fees Deposit to Egypt{" "}
                    <Link to="#">details</Link>
                  </p>
                  {points.map((point, index) => {
                    const { name, value, type } = point;
                    if (type === "tags") {
                      const { tags } = point;
                      return (
                        <div key={index}>
                          <span className="point-name">{name} : </span>
                          <span className="point-value">{value}</span>
                          <ul className="tag-ul">
                            {tags.map((tag, index) => {
                              if (tag.name === value) {
                                return (
                                  <li
                                    key={index}
                                    className="tag active"
                                    onMouseOver={getProdImg}
                                    onMouseLeave={removeProdImg}
                                  >
                                    <Link
                                      to={`/product/${redirectId}`}
                                      onClick={(e) => {
                                        setSideSrcs(() => getProdImg(e).srcs);
                                        setViewSrc(() => getProdImg(e).srcs[0]);
                                        setColorFilter(true);
                                      }}
                                    >
                                      {tag.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return (
                                <li
                                  key={index}
                                  className="tag"
                                  onMouseOver={getProdImg}
                                  onMouseLeave={removeProdImg}
                                >
                                  <Link
                                    to={`/product/${redirectId}`}
                                    onClick={(e) => {
                                      setSideSrcs(() => getProdImg(e).srcs);
                                      setViewSrc(() => getProdImg(e).srcs[0]);
                                      setColorFilter(true);
                                    }}
                                  >
                                    {tag.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    } else if (type === "subImgs") {
                      const { availableSubImgs } = point;
                      return (
                        <div>
                          <span className="point-name">{name} :</span>
                          <span className="point-value">{value} :</span>
                          <ul className="img-ul">
                            {() => viewSubs(availableSubImgs, value)}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <div>
                        <span className="point-name">{name} : </span>
                        <span className="point-value">{value}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="about">
                  <ul className="about-ul">
                    {about.map((aboutPoint, index) => {
                      return <li key={index}>{aboutPoint}</li>;
                    })}
                  </ul>
                </div>
              </div>
              {isZooming && (
                <div className="big-magnifier-container">
                  <div className="big-magnifier"></div>
                </div>
              )}
            </section>
          </div>
          <div className="col-md-3">
            <section className="buy-info">
              <div className="share-buttons">
                <ul>
                  <li>share</li>
                  <li>
                    <FaRegEnvelope />
                  </li>
                  <li>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                    >
                      <FaFacebookF className="social-share" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${title} ${window.location.href} via @amazon-clone`}
                    >
                      <FaTwitter className="social-share" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.pinterest.com/pin/create/button/?url=${viewSrc.view}`}
                      target="_blank"
                    >
                      <FaPinterest className="social-share" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dilver">
                <div className="dilver-period">
                  <p>
                    arrives:{" "}
                    {arrivalSt.toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                    })}
                    -
                    {arrivalNd.toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p>
                  <BiMap /> Deliver to{`Egypt`}
                </p>
              </div>
              <div className="quantity">
                <input type="datalist-input" placeholder="1" />
              </div>
              <div className="CTO-btns">
                <button>add to cart</button>
                <button>buy now</button>
              </div>
              <div className="info">
                <div className="secure">
                  <FaLock className="icon" />
                  <p>secure transaction</p>
                </div>

                <div className="shipping">
                  <span>ships from :</span>
                  <span className="shipper">amazon</span>
                </div>

                <div className="selling">
                  <span>sold by :</span>
                  <Link className="seller" to="#">
                    amazon
                  </Link>
                </div>
                <div className="return">
                  <span>return policy :</span>
                  <Link to="#">this item is returnable</Link>
                  <BiChevronDown />
                </div>

                <div className="support">
                  <span>support :</span>
                  <Link to="#">free amazon tech support included</Link>
                  <BiChevronDown />
                </div>

                <div className="accessories">
                  <span>add an accessoriy:</span>
                  <form action="">
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          name="microsof 365 family"
                          id="microsoft 365"
                        />
                        <label htmlFor="microsoft 365">
                          microsof 365 family | premium office apps
                        </label>
                        <span>$ 89.99</span>
                      </li>
                      <li>
                        <input type="checkbox" name="" id="adobe" />
                        <label htmlFor="adobe">
                          save %20 at checkout | Adobe Acrobat Aro
                        </label>
                        <span>$189.88</span>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
