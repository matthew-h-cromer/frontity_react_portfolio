import React, { useState, useEffect } from "react";
// Styled Components
import { connect, styled } from "frontity";
// DOM Parser
import { parse } from "node-html-parser";

/*
class SidebarButtonsTest extends React.Component {
  render() {
    console.log(document.getElementById("main"));
    return <div>sidebar</div>;
  }
}
*/

const SidebarButtons = ({ state }) => {
  const colors = ["#aed9e0", "#FFA69E", "#B8F2E6", "#5E6472", "#FAF3DD"];
  const [currentlyViewing, setCurrentlyViewing] = useState(0);
  const [anchors, setAnchors] = useState([]);
  const [buttons, setButtons] = useState([]);

  // On new page loads, parse the anchors on the page into buttons
  useEffect(() => {
    console.log(state);
    const data = state.source.get(state.router.link);
    if (data.isPage || data.isPostType) {
      const content = state.source[data.type][data.id].content.rendered;
      const contentAsDOM = parse(content);
      registerAnchors(contentAsDOM);
    } else {
      setButtons([]);
    }
  }, [state.router.link]);

  // React to main page scroll
  useEffect(() => {
    console.log(state.mainScrollPosition);
    const scrollPosition = state.mainScrollPosition;
    for (let i = 0; i < anchors.length; i++) {
      const offset = 50;
      const anchorTop = anchors[i].offsetTop;
      console.log(anchors[i]);
      const nextAnchorTop = anchors[i + 1] ? anchors[i + 1].offsetTop : 500000;
      if (
        scrollPosition > anchorTop - offset &&
        scrollPosition < nextAnchorTop
      ) {
        console.log("Currently viewing: " + i);
        setCurrentlyViewing(i);
        break;
      }
    }
  }, [state.mainScrollPosition]);

  const registerAnchors = (contentAsDOM) => {
    let anchors = contentAsDOM.querySelectorAll("h2");
    let buttons = [];
    for (let i = 0; i < anchors.length; i++) {
      buttons.push({
        label: anchors[i].innerText,
        href: "#" + anchors[i].innerText.replace(/ /g, "-"),
      });
    }
    setButtons(buttons);
    setAnchors(anchors);
  };

  if (buttons.length > 0) {
    return (
      <div style={{ marginTop: "50px" }}>
        <Title>Index:</Title>
        <Container>
          {buttons.map((button, index) => (
            <StyledButton
              key={"StyledButton_" + index}
              href={button.href}
              className="nav-link"
              themeColor={colors[index % colors.length]}
              selected={currentlyViewing === index}
            >
              {button.label}
            </StyledButton>
          ))}
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

const Title = styled.div`
  width: auto;
  padding: 0 0 10px 0;
  font-size: 18px;
`;

const Container = styled.div`
  position: relative;
  float: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 275px;
  overflow-y: auto;
  padding-left: 15px;

  &::-webkit-scrollbar {
    width: 6px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: none; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: white; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

const StyledButton = styled.a`
  position: relative;
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 4px 0px;
  text-decoration: none;
  margin-bottom: 10px;
  width: calc(100% - 15px - 24px);

  &::before {
    border-bottom: ${(props) => (props.selected ? "1px solid white" : "none")};
    content: "";
    position: absolute;
    height: 33px;
    width: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover::before {
    border-bottom: 1px solid white;
    width: 100%;
    visibility: visible;
  }

  @media (max-width: 768px) {
    &::before {
      width: 100%;
      visibility: visible;
    }
  }
`;
//width: ${(props) => (props.selected ? "100%" : 0)};

export default connect(SidebarButtons);

/*

state = {
    colors: ["#aed9e0", "#FFA69E", "#B8F2E6", "#5E6472", "#FAF3DD"],
    currentlyViewing: 0,
    anchors: [],
    buttons: [],
  };

  componentDidMount() {
    // Register the anchors on the page so we can generate buttons from them
    this.setState({ anchors: this.registerAnchors() });

    // On scroll, determine which element we are currently looking at
    const handleScroll = (e) => {
      const scrollPosition = e.target.scrollTop;
      for (let i = 0; i < anchors.length; i++) {
        const offset = 50;
        const anchorTop = anchors[i].offsetTop;
        const nextAnchorTop = anchors[i + 1]
          ? anchors[i + 1].offsetTop
          : 500000;
        if (
          scrollPosition > anchorTop - offset &&
          scrollPosition < nextAnchorTop
        ) {
          this.setState({ currentlyViewing: i });
          break;
        }
      }
    };
    document.getElementById("main").addEventListener("scroll", handleScroll);
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {
    console.log("---- updating ----");
    if (this.props.state) {
      console.log(this.props.state.router.link);
    }
    
    if (this.props.state) {
      const newRoute =
        prevProps === undefined ||
        this.props.state.router.link !== prevProps.state.router.link;
      console.log("New route: " + newRoute);
      if (newRoute) {
        console.log("New route! Resetting anchors");
        setTimeout(() => {
          console.log(location);
          // Scroll to top on page change
          if (location.hash === "") {
            console.log("Scrolling to top");
            setTimeout(() => {
              document.getElementById("main").scrollTo({ top: 0 });
              window.scrollTo({ top: 0 });
            }, 0);
          }
          // Re-register anchors on page change
          let anchors = this.registerAnchors();
          this.setState({ anchors, currentlyViewing: 0 });
        }, 0);
      }
    }

    // Listen for changes to history
    
    this.unlisten = history.listen((location, action) => {
      setTimeout(() => {
        console.log(location);
        // Scroll to top on page change
        if (location.hash === "") {
          console.log("Scrolling to top");
          setTimeout(() => {
            document.getElementById("content").scrollTo({ top: 0 });
            window.scrollTo({ top: 0 });
          }, 0);
        }
        // Re-register anchors on page change
        let anchors = this.registerAnchors();
        this.setState({ anchors, currentlyViewing: 0 });
      }, 0);
    });
    
  }

  registerAnchors = () => {
    let anchors = document.querySelectorAll("h2");
    let buttons = [];
    for (let i = 0; i < anchors.length; i++) {
      buttons.push({
        label: anchors[i].innerText,
        href: "#" + anchors[i].innerText.replace(/ /g, "-"),
      });
    }
    this.setState({ buttons });
    return anchors;
  };


  */
