import React, { Component } from 'react';

class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="footer">
                <div className="footer__copyright">
                    &copy; 2021 Yeguada Arabians &#124; Todos los derechos reservados
                </div>
            </div>
        );
    }
}

export default Footer;