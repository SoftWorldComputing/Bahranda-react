import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export class StickyElement extends Component {
    render() {
        return (
            <div className="sticky-footer reach-us bg-color1">
     <p>Are you a manufacturer in need of commodities? <span><Link to="/contact" className="decorate">Contact Us</Link>
</span></p>
   </div>
        )
    }
}

export default StickyElement;
