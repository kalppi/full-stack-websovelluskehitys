import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap'


const menuStyle = {
	background: '#ccc',
	padding: '10px 5px'
};

const notificationStyle = {
	border: '1px solid green',
	color: 'green',
	margin: '10px 0',
	padding: '5px'
};

const aboutStyle = {
	marginTop: '20px'
};

const Menu = () => (
  <div style={menuStyle}>
    <Link to='/'>anecdotes</Link>&nbsp;
    <Link to='/new'>create new</Link>&nbsp;
    <Link to='/about'>about</Link>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>  
  </div>
)

const About = () => (
  <div className='row' style={aboutStyle}>
  	<div className='col-md-9'>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
    <div className='col-md-3'>
    	<img
    		style={{
    			float: 'right'
    		}}
    		src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/220px-Edsger_Wybe_Dijkstra.jpg' alt='' />
    </div>
  </div>
)

const ViewOne = ({anecdote}) => (
	<div>
		<h2>{anecdote.content} by {anecdote.author}</h2>
		<div>has {anecdote.votes}</div>
		<div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
	</div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Notification = ({message}) => {
	if(message.length === 0) return <div />
	else return <div className='alert alert-success' style={notificationStyle}>{message}</div>
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/');
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit} className=''>
          <div className='form-group row'>
            <label for="content" className='col-sm-2 col-form-label'>content</label> 
            <div className='col-sm-10'>
            	<input className='form-control' id='content' name='content' value={this.state.content} onChange={this.handleChange} />
            </div>
          </div>
          <div className='form-group row'>
            <label for="author" className='col-sm-2 col-form-label'>author</label> 
            <div className='col-sm-10'>
            	<input className='form-control' id='author' name='author' value={this.state.author} onChange={this.handleChange} />
            </div>
          </div>
          <div className='form-group row'>
            <label for="url" className='col-sm-2 col-form-label'>url for more info</label> 
            <div className='col-sm-10'>
            	<input className='form-control' id='url' name='info' value={this.state.info} onChange={this.handleChange} />
            </div>
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
    	anecdotes: this.state.anecdotes.concat(anecdote),
    	notification: `a new anecdote '${anecdote.content}' created!`
    });

    setTimeout(() => {
    	this.setState({
    		notification: ''
    	})
    }, 10 * 1000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className='container'>
        <h1>Software anecdotes</h1>
          <Router>
          	<div>
	          <Menu />

	          <Notification message={this.state.notification} />
	         
	     	  <Route exact path="/" render={() =>  <AnecdoteList anecdotes={this.state.anecdotes} />} />
			  <Route exact path="/new" render={({history}) => <CreateNew addNew={this.addNew} history={history} />} />
			  <Route exact path="/about" render={() => <About />} />
			  <Route exact path="/anecdote/:id" render={({match}) =>
        			<ViewOne anecdote={this.anecdoteById(match.params.id)} />}
      			/>
			</div>
          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
