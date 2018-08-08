import React from 'react';

export class WordSlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pos: 0,
            animate: false
        }
    }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     return (nextProps.children.props.children !== this.props.children.props.children || this.state.pos !== nextState.pos);
    // }

    componentWillUpdate(nextProps){
        if(nextProps.children.props.children !== this.props.children.props.children){
            this.setState({
                // animate: this.container.clientWidth !== this.container.scrollWidth,
                pos: 0
            });
            clearInterval(this.timer);
        }
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.children.props.children !== this.props.children.props.children) this.triggerMove();
        
    }
    
    componentDidMount(){
       this.triggerMove();
    }

    triggerMove(){
        setTimeout(() => {
            const width = this.container.clientWidth; 
            const scrollWidth = this.container.scrollWidth; 
            if(scrollWidth !== width) this.timer = setInterval(() =>{
                let pos = this.state.pos-1;
                if(Math.abs(this.state.pos) > scrollWidth) pos = width;

                this.setState({pos})
            }, 20);
        }, 500)
       
    }

    render(){
        return(
            <div ref={ (container) => this.container = container} className="word-container">
                <div style={{"transform": `translateX(${this.state.pos}px)`}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}