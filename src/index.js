//import React, { useState, useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss'

function GridItem(props){

    if( props.doFetchImage && props.imageURL==='' && !props.isLoading){
        //console.log(props.doFetchImage);
        props.fetchImage(props.id);
    }

    return(
        <div key={props.id} className={props.size} style={props.style}>
            {props.children}
        </div>
    )

}


function Grid(props){

    return(
        <div className='grid'>
            {props.children}
        </div>
    )
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.fetchImage = this.fetchImage.bind(this);
        this.addMore = this.addMore.bind(this);
        //this.handleScroll = this.handleScroll(this);
        this.state = {
            items: Array(30).fill(null).map(()=>(
                {
                    doFetchImage: Math.floor(Math.random() * 6) === 0 ? true : false,
                    url: '',
                    isLoading: false,
                    gradient: getGradient(),
                    size: Math.floor(Math.random() * 4) === 0 ?  'grid-item-double' : 'grid-item',
                }
            )),
        }
    }

    createGridItem(){
        return(
            <GridItem>test</GridItem>
        )
    }

    addMore(amount){
        let moreItems = this.state.items.concat(Array(amount).fill(null).map(()=>(
            {
                doFetchImage: Math.floor(Math.random() * 6) === 0 ? true : false,
                url: '',
                isLoading: false,
                gradient: getGradient(),
                size: Math.floor(Math.random() * 4) === 0 ?  'grid-item-double' : 'grid-item',
            })));
        this.setState({
            items: moreItems,
        })
    }

    hello(st){
        console.log(st);
    }

    fetchImage(i){
        this.state.items[i].isLoading = true;
        //fetch url + a signature using the index so the browser doesnt use the same cached image on multiple items
        let furl = 'https://source.unsplash.com/random?sig=' + i
        fetch(furl).then(
            (response) => {
                let imageURL = response.url;
                let items = this.state.items.slice();
                items[i].url = imageURL;
                this.setState({
                    items: items,
                });
            }
        )
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll');
    };

    handleScroll = (e) => {
        //console.log(window.pageYOffset + window.innerHeight + 600 + ':' + document.body.clientHeight);
        if(window.pageYOffset + window.innerHeight + 600 > document.body.clientHeight){
            //console.log('Add More');
            let moreItems = this.state.items.concat(Array(10).fill(null).map(()=>(
                {
                    doFetchImage: Math.floor(Math.random() * 6) === 0 ? true : false,
                    url: '',
                    isLoading: false,
                    gradient: getGradient(),
                    size: Math.floor(Math.random() * 4) === 0 ?  'grid-item-double' : 'grid-item',
                })));
            this.setState({
                items: moreItems,
            })
        }
    }

    render(){
        return(
            <div className='container'>
                <Grid>
                    {
                        this.state.items.map((item, i) => {;
                            let style = (item.url==='')? item.gradient : {backgroundImage:'url(' + item.url + ')'};
                            return(
                                <GridItem
                                    key={i}
                                    id={i}
                                    doFetchImage={item.doFetchImage}
                                    fetchImage={this.fetchImage}
                                    imageURL={item.url}
                                    style={style}
                                    size={item.size}
                                    isLoading={item.isLoading}
                                >
                                    
                                </GridItem>
                            )
                        })
                    }
                </Grid>
                <button onClick={(i) => this.addMore(10)}>more</button>
            </div>
        )
    }
}

//TODO: have some sort of method for choosing colors so the gradients look better instead of being completely random
function getGradient(){
    let color1 = Math.floor(Math.random()*16777215).toString(16);
    let color2 = Math.floor(Math.random()*16777215).toString(16);
    return {
        //background: 'linear-gradient(-45deg, rgba(131,58,180,1) 0%, rgba(252,176,69,1) 100%)'
        background: 'linear-gradient(-45deg, #' + color1 + ' 0%, #' + color2 + ' 100%)'
    }
}

const colors = [
    '#',
]

ReactDOM.render(
    <App />,
    document.getElementById('root')
);