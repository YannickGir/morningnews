import React, { useState } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  var noArticles;
  if (props.myArticles == 0) {
    noArticles = <div style={{ marginTop: "30px" }}>No Articles</div>;
  }

  return (
    <div>
      <Nav />

      <div className="Banner" />

      {noArticles}

      <div className="Card">
        {props.myArticles.map((article, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[
                <Icon
                  type="read"
                  key="ellipsis2"
                  onClick={() => showModal(article.title, article.content)}
                />,
                <Icon
                  type="delete"
                  key="ellipsis"
                  onClick={() => props.deleteToWishList(article.title)}
                />,
              ]}
            >
              <Meta title={article.title} description={article.description} />
            </Card>
            <Modal
              title={title}
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>{content}</p>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { myArticles: state.wishList };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (articleTitle) {
      dispatch({ type: "deleteArticle", title: articleTitle }); // efface l'article cliqué par le reducer dans le store
      // <Link to="/account" />; // + activation de la route pour DELETE l'article dans la BDD
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
