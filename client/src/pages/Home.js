import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// Not using hooks here which would require functional "dumb" components; using extends Component from React, which requires a render() and return() and declaring state/using this.state all the time. Don't need componentDidMount because it's all wrapped between the Switch statements under Nav? And, handleInput Change sets new state?
class Home extends Component {
    state = {
        books: [],
        q: "",
        message: "Search For A Book To Begin!"
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    getBooks = () => {
      API.getBooks(this.state.q)
        .then(res =>
          this.setState({
            books: res.data
          })
        )
        .catch(() =>
          this.setState({
            books: [],
            message: "No New Books Found, Try a Different Query"
          })
        );
    };

    handleFormSubmit = event => {
      event.preventDefault();
      this.getBooks();
    };

    handleBookSave = id => {
      const book = this.state.books.find(book => book.id === id);
  
      API.saveBook({
        googleId: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        link: book.volumeInfo.infoLink,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks.thumbnail
      }).then(() => this.getBooks());
    };

    render () {
        return (
          // These components come from the Grid component that esports several functions that only set classNames for css purposes
            <Container>
              {/* These components come from the Grid component that esports several functions that only set classNames for css purposes */}
              <Row>
                {/* These components come from the Grid component that esports several functions that only set classNames for css purposes */}
                <Col size="md-12">
                  {/* This is just text in a Jumbotron styling format like a bootstrap shortcut! */}
                  <Jumbotron>
                    <h1 className="text-center">
                      <strong>(React) Google Books Search</strong>
                    </h1>
                    <h2 className="text-center">Search for and Save Books of Interest.</h2>
                  </Jumbotron>
                </Col>
                <Col size="md-12">
                  {/* This is a component with props (icon, title, and "children" being the Form component) being passed into the Form to be used in the input fields*/}
                  <Card title="Book Search" icon="far fa-book">
                    {/* This is a component with props (handleInputChange, handleFormSubmit, and q) being passed into the Form to be used in the input fields*/}
                    <Form
                      handleInputChange={this.handleInputChange}
                      handleFormSubmit={this.handleFormSubmit}
                      q={this.state.q}
                    />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  {/* This is a component with props (icon, title, and "children" being the List and Book component) with their own props being passes in!*/}
                  <Card title="Results">
                    {this.state.books.length ? (
                    // {/* This is a component with props ("children" being Book component) with their own props being passes in! It maps through it's cbild component, Book, redner one Book component for each index held in the book array in state!*/}
                      <List>
                        {this.state.books.map(book => (
                        // {/* This is a component with props (details held in the book array in state for each book) being passed into the Form to be used to render the ListItem child component within Book*/}
                          <Book
                            key={book.id}
                            title={book.volumeInfo.title}
                            subtitle={book.volumeInfo.subtitle}
                            link={book.volumeInfo.infoLink}
                            authors={book.volumeInfo.authors.join(", ")}
                            description={book.volumeInfo.description}
                            image={book.volumeInfo.imageLinks.thumbnail}
                            Button={() => (
                              <button
                                onClick={() => this.handleBookSave(book.id)}
                                className="btn btn-primary ml-2"
                              >
                                Save
                              </button>
                            )}
                          />
                        ))}
                      </List>
                    ) : (
                      <h2 className="text-center">{this.state.message}</h2>
                    )}
                  </Card>
                </Col>
              </Row>
              {/* This is just a component for styling format like a bootstrap shortcut! */}
              <Footer />
            </Container>
          );
        }
}

export default Home;