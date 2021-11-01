import React, { Component } from 'react'
import { FormInput } from './UtilCmps/FormInput'
import {gameService} from '../services/game.service'

export class GameFilter extends Component {
    state = {
        filterBy: {
            txt: '',
            tag: '',
            sortBy: 'title'
        },
    }

    // componentDidMount() {
    //     const tagOptions = gameService.getDefaultTags()
    //     const { filterBy } = this.state
    //     console.log(tagOptions);
    //     this.setState({filterBy:{...filterBy, tag:tagOptions}}) 

    // }

    handleChange = ({ target }) => {
        let { value, name: field } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { txt } = this.state.filterBy
        const tagsOptions = gameService.getDefaultTags()
        const sortByOptions = ['title','rating','minPrice','maxPrice']
        if(!tagsOptions) return <h1>'Loading,,,'</h1>
        console.log({tagsOptions});
        return (
            <section className="game-filter mb-20">
                <div className="filter-container container flex">
                    <FormInput  label="search a game"
                        type="text" name="txt" value={txt} handleChange={this.handleChange}/>
                        <FormInput  label="tags"
                        type="select" name="tag" options={tagsOptions} handleChange={this.handleChange}/>
                        <FormInput  label="sort by"
                        type="select" name="sortBy" options={sortByOptions} handleChange={this.handleChange}/>
                </div>
            </section>
        )
    }
}