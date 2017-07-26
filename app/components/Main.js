// the functions below can be called out from anywhere

var axios = require('axios');
var React = require('react');

var Form = require('./Children/Form');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

var helpers = require('./utils/helper.js');

var Main = React.createClass({

	getInitialState: function() {
		return {
			topic: '',
			startYear: '',
			endYear: '',
			results: [],
			savedArticles: []
		}
	},

	// this code allows the child to update the parent with
	// the searches
	setTerm: function(top, stYear, enYear) {
		this.setState({
			topic: top,
			startYear: stYear,
			endYear: enYear
		})
	},

	// Save the Article
	saveArticle: function (title, date, url) {
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	// delete the articles you don't want
	deleteArticle: function (article) {
		axios.delete('/api/saved/' + article._id)
			.then(function (response) {
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));
		this.getArticle();	
	},
	// get the article
	getArticle: function() {
		axios.get('/api/saved')
			.then(function (response) {
				this.setState({
					savedArticles: response.data
				})
		}.bind(this));
	},

    // updates the component
    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.topic != this.state.topic) {
            // console.log("UPDATED");
            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
                .then(function (data) {
                    console.log(data);
                    if (data != this.state.results) {
                        this.setState({
                            results: data
                        })
                    }
                }.bind(this))
        }
    },
    // saves the component
    componentDidMount: function () {
        axios.get('/api/saved')
            .then(function (response) {
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },

    // render the html
    render: function() {
    	return (

    	<div class="container">
				<div class="jumbotron">
				   <h1><img id = "icon-header" src="assets/images/news-icon.png"/> New York Times Search</h1>
				    
				</div>
				<div class="row">
				   <div class="col-lg-12">
				   		<div class="panel panel-default">
				   			<div class= "panel-heading"><img class = "news-icon" src="assets/images/news-icon.png"/> Search through NY Times</div>
							  <div class="panel-body">
							   	<div class="form-group">
								  <label for="searchTerms">Search Term:</label>
								  <input type="text" class="form-control" id="initialSearch">
								</div>
								<div class="form-group">
								  <label for="records">Number of Records to Retrieve: </label>
								  <input type="number" class="form-control" id="records">
								</div>
								<div class="form-group">
								  <label for="startYear">Start Year (Optional): </label>
								  <input type="number" class="form-control" id="startYear">
								</div>
								<div class="form-group">
								  <label for="endYear">End Year (Optional): </label>
								  <input type="number" class="form-control" id="endYear">
								</div>
								<input class="searchNews btn btn-default col-sm-1" type="search" value="Search"> 
								<input class="clearNews btn btn-default col-sm-1" type="search" value="Clear"> 
								</div>
							</div>
							<br>
							<div class="panel panel-default">
				   			<div class="panel-heading">Search Results</div>
							  <div class="panel-body">
							  	<div class="row">
									  <div class="col-sm-6 col-md-4">
									    <div class="thumbnail">
									      <img src="..." alt="...">
									      <div class="caption">
									        <h3>Article Title</h3>
									        <p>...</p>
									        <p><a href="#" class="btn btn-primary" role="button">Read</a></p>
									      </div>
									    </div>
									  </div>
									</div>							
							</div>

				   </div>
				</div>
			</div>
		</div>
		)
    }
})