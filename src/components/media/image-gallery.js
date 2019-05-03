import React from 'react'
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { tail } from 'ramda'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selectedImage: props.images[0] || {},
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(selectedImage) {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      selectedImage: selectedImage || {},
    });
  }

  render() {
    const {
      images,
    } = this.props

    const {
      modalIsOpen,
      selectedImage,
    } = this.state

    const featuredImage = images[0]

    return (
      <div className="image-gallery-root">
        <Modal
          isOpen={modalIsOpen}
          fade={false}
          toggle={this.toggle}
          css={css`
            &.modal-dialog {
              max-width: 800px;
            }
            .modal-content {
              background: transparent;
              border: none;
            }
            .close {
              color: white;
            }
          `}
        >
          <ModalHeader toggle={this.toggle} className="p-0"/>
          <ModalBody className="p-0 text-center">
            <img
              className="img-fluid"
              alt={selectedImage.alt}
              src={selectedImage.src}
            />
          </ModalBody>
        </Modal>
        <div className="main-image mb-3">
          <ImageThumbnail image={featuredImage} onClick={this.toggle} />
        </div>
        {
          images.length > 1 &&
          <Row>
            {
              tail(images).map((image, i) => (
                <Col key={i} xs="3">
                  <ImageThumbnail image={image} onClick={this.toggle} />
                </Col>
              ))
            }
          </Row>
        }
      </div>
    );
  }
}

const ImageThumbnail = ({
  onClick,
  image,
}) => (
  <div
    onClick={() => onClick(image)}
    css={css`
      position: relative;
      &:hover {
        cursor: pointer;
      }

      &:hover .overlay {
        opacity: 1;
      }
    `}
  >
    <div
      className='overlay'
      css={css`
        transition: opacity 0.5s;
        background: rgba(0, 0, 0, 0.2);
        opacity: 0;
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        `}
    >
      <div
        className="open-preview"
        css={css`
          display: inline-block;
          width: 3.7em;
          color: white;
          border: 1px solid white;
          border-radius: 100%;
          padding: 1em;
          &:hover {
            background-color: white;
            color: gray;
          }
        `}
      >
        <FontAwesomeIcon
          icon="plus"
          css={css`
            font-size: 1.5em;
          `}
        />
      </div>

    </div>
    <img
      className="img-fluid"
      alt={image.alt}
      src={image.src}
    />
  </div>
)

export default ImageGallery
