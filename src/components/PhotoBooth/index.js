import {useState, useRef, useEffect} from 'react'
import Slider from 'react-slick'
import Moveable from 'react-moveable'
import {html2canvas} from 'html2canvas'
import {useScreenshot} from 'use-react-screenshot'
import Webcam from 'react-webcam'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import Sticker from '../Sticker'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const framesList = [
  {
    id: 1,
    name: 'None',
    imageUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693389315/Picture1_x1bnyb.png',
  },
  {
    id: 2,
    name: 'gaming',
    imageUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693370804/images-removebg-preview_1_nqmkrk.png',
  },
  {
    id: 3,
    name: 'Gold Lines',
    imageUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693370549/360_F_483393731_Xxifql7zdhDQGCmTytBnddX5PZEcRSXn-removebg-preview_olbjqh.png',
  },
  {
    id: 4,
    name: 'Gold Design',
    imageUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693370456/pngtree-border-golden-rectangle-png-image_5329483-removebg-preview_npcyqx.png',
  },
  {
    id: 5,
    name: 'Rainbow',
    imageUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693370026/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3YxMTYxLWYtMDAxLnBuZw-removebg-preview_tb279a.png',
  },
  {
    id: 6,
    name: 'Colors',
    imageUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693370025/v959-aum-14-removebg-preview_afukhu.png',
  },
]

const filtersList = [
  {
    id: 1,
    name: 'None',
    opacity: 1,
    filterColor: 'transparent',
  },
  {
    id: 2,
    name: 'Vivid',
    opacity: 0.2,
    filterColor: 'white',
  },
  {
    id: 3,
    name: 'Vivid warm',
    opacity: 0.3,
    filterColor: 'orange',
  },
  {
    id: 4,
    name: 'Vivid Cool',
    opacity: 0.5,
    filterColor: 'white',
  },
  {
    id: 5,
    name: 'Late Autumn',
    opacity: 0.2,
    filterColor: 'blue',
  },
]

const stickersList = [
  {
    id: 1,
    name: 'party',
    stickerUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693506778/IMG-20230831-WA0052-removebg-preview_vyn9if.png',
  },
  {
    id: 2,
    name: 'stop',
    stickerUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693506778/IMG-20230831-WA0049-removebg-preview_b9fw3f.png',
  },
  {
    id: 3,
    name: 'goggles',
    stickerUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693506778/IMG-20230831-WA0051-removebg-preview_glomwr.png',
  },
  {
    id: 4,
    name: 'heart',
    stickerUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693506777/IMG-20230831-WA0054-removebg-preview_dccl7a.png',
  },
  {
    id: 5,
    name: 'man',
    stickerUrl:
      'https://res.cloudinary.com/dyglzqdrl/image/upload/v1693506778/IMG-20230831-WA0047-removebg-preview_xshjna.png',
  },
]

const PhotoBooth = () => {
  const webRef = useRef(null)

  const [capturedImage, setImage] = useState(null)
  const [hideCam, setCamStatus] = useState(false)
  const [frameIndex, setFrame] = useState(0)
  const [showVerifyButtons, setVerifyBtn] = useState(true)
  const [showFilters, setFiltersView] = useState(false)
  const [filterIndex, setFilter] = useState(0)
  const [showStickers, setStickersView] = useState(false)
  const [stickerIndex, setSticker] = useState(0)

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  const captureClicked = () => {
    setImage(webRef.current.getScreenshot({width: 1920, height: 1500}))
    setCamStatus(true)
  }

  const openCamera = () => {
    setImage(null)
    setCamStatus(false)
    setFrame(0)
  }

  const changeFrame = id => {
    setFrame(id - 1)
  }

  const nextClicked = () => {
    setVerifyBtn(false)
    setFiltersView(true)
  }

  const filterBtnClicked = id => {
    setFilter(id - 1)
  }

  const goToStickers = () => {
    setFiltersView(false)
    setStickersView(true)
  }

  const stickerSelected = id => {
    const imgContainer = document.getElementById('image-container')

    const sticker = document.createElement('img')
    sticker.setAttribute('src', stickersList[id - 1].stickerUrl)
    sticker.classList.add('sticker')

    imgContainer.appendChild(sticker)
  }

  return (
    <>
      {hideCam ? (
        <div className="main-container">
          <div className="cam-div-con" id="image-container">
            <img
              className="cam-container"
              id="updateImg"
              src={capturedImage}
              alt="cap"
            />
            <img
              src={framesList[frameIndex].imageUrl}
              alt="frame"
              className="frame-class"
            />

            {showFilters && (
              <div
                className="fil"
                style={{
                  opacity: filtersList[filterIndex].opacity,
                  backgroundColor: filtersList[filterIndex].filterColor,
                }}
              >
                {' '}
              </div>
            )}
          </div>

          {showVerifyButtons && (
            <>
              <h3>Looking Good?</h3>
              <div>
                <button
                  type="button"
                  className="verify-button"
                  onClick={openCamera}
                >
                  <AiFillDislike />
                  <br />
                  Try Again
                </button>
                <button
                  type="button"
                  className="verify-button"
                  onClick={nextClicked}
                >
                  <AiFillLike />
                  <br />
                  Next
                </button>
              </div>
            </>
          )}

          {showFilters && (
            <>
              <h3>Apply Filter</h3>
              <div className="frames-container">
                <Slider {...settings}>
                  {filtersList.map(each => (
                    <button
                      key={each.id}
                      type="button"
                      onClick={() => filterBtnClicked(each.id)}
                      className="filter-option-btn"
                    >
                      <div className="filter-option-container">
                        <img
                          className="filter-option-img"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4NA9SJS5Vd-k7dFhIV5u3xOhEZAwjl63Hw"
                          alt="filter-btn"
                        />
                        <div
                          className="filter-option"
                          style={{
                            opacity: each.opacity,
                            backgroundColor: each.filterColor,
                          }}
                        >
                          {' '}
                        </div>
                      </div>
                      <p style={{color: 'white'}}>{each.name}</p>
                    </button>
                  ))}
                </Slider>
              </div>

              <button
                className="capture-image"
                type="button"
                onClick={goToStickers}
              >
                Next
              </button>
            </>
          )}

          {showStickers && (
            <>
              <h3>Apply Stickers</h3>
              <div className="frames-container">
                <Slider {...settings}>
                  {stickersList.map(each => (
                    <button
                      key={each.id}
                      type="button"
                      className="filter-option-btn"
                      onClick={() => stickerSelected(each.id)}
                    >
                      <div className="filter-option-container">
                        <img
                          className="filter-option-img"
                          src={each.stickerUrl}
                          alt={each.name}
                        />
                      </div>
                    </button>
                  ))}
                </Slider>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="main-container">
          <Webcam className="cam-container" ref={webRef} />
          <img
            src={framesList[frameIndex].imageUrl}
            alt="frame"
            className="frame-class"
          />
          <h3>Choose a Frame</h3>
          <div className="frames-container">
            <Slider {...settings}>
              {framesList.map(each => (
                <button
                  key={each.id}
                  type="button"
                  onClick={() => changeFrame(each.id)}
                  className="frame-button"
                >
                  {each.id === 1 ? (
                    <img
                      src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1693391960/515127-removebg-preview_mznjpv.png"
                      alt={each.name}
                      className="frame-button-image"
                    />
                  ) : (
                    <img
                      src={each.imageUrl}
                      alt={each.name}
                      className="frame-button-image"
                    />
                  )}
                </button>
              ))}
            </Slider>
          </div>
          <button
            className="capture-image"
            type="button"
            onClick={() => captureClicked()}
          >
            Capture
          </button>
        </div>
      )}
    </>
  )
}

export default PhotoBooth

/* <div className={` ${displayCam} camera-container`}>
        <Webcam ref={webRef} className="cam-container" />
        <br />
        <button type="button" onClick={() => showImage()}>
          Capture
        </button>
        <br />
        <br />
      </div>
      <div>
        {capturedImage && <img src={capturedImage} alt="cap" />}
        <br />
        <button type="button">Like</button>
        <button type="button" onClick={() => openCamera()}>
          Dislike
        </button>
      </div> */
