import React from "react";
import fetch from 'isomorphic-fetch';

class PostList extends React.Component {

	componentDidMount() {
		// fetch WP AP
		this.props.onFetchMore()
	}

	render(){
		const {items, onItemClick, onFetchMore, isLoading } = this.props;
		return (
			<div>

				{items.map((el) =>
					<p key={el.title.rendered}>
						<a href="#" onClick={(ev) => {onItemClick(el.id)} }>
							{el.title.rendered}
						</a>
					</p>
				)}

				<div>
					{isLoading ?
						<span>...</span>
					 : <button className="mdl-button mdl-js-button mdl-button--raised"
											onClick={() => {onFetchMore() }}>
							  Load More
							</button>
 					}
				</div>

			</div>
		);
	}
}

export default class PostListWithData extends React.Component {
	state = {
		items: [],
		page: 1,
		currentItem: null,
		isLoading: true
	};

	onFetchMore() {
		const {page, items} = this.state
		console.log('click '+page)
		this.setState({isLoading: true})
		fetch(`http://demo.wp-api.org/wp-json/wp/v2/posts?page=${page}`)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				this.setState({page: page+1, items: [...items,...data]})
				this.setState({isLoading: false})
			}).catch((err) => {
				this.setState({isLoading: false})
				console.error(err)
			})
	}

	onItemClick(id){
		const items = this.state.items
		items.forEach((el) => {
			if (el.id === id) {
				this.setState({currentItem: el })
			}
		})
		console.log('item click '+id)
	}

	onPostClose() {
		this.setState({currentItem: null })
	}

	rawMarkup() {
    return { __html: this.state.currentItem.content.rendered }
  }

	render(){
		const {items, isLoading, currentItem} = this.state;
		return (
			<div>
				<h3>JS + React + WP REST API</h3>

				
					{currentItem ?
						<div className='overlay'>
							<span className='overlay-post-close' onClick={(ev) => {this.onPostClose() }}>×</span>
							<h2>{currentItem.title.rendered}</h2>

							<div
			          className="content"
			          dangerouslySetInnerHTML={this.rawMarkup()}
			        />

						</div>
						: ''}


				<PostList
					items={items}
					isLoading={isLoading}
					onItemClick={(ev) => {this.onItemClick(ev) }}
					onFetchMore={(ev) => {this.onFetchMore(ev) }}
					/>

			</div>
		);
	}
}
