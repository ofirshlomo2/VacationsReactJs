import React from 'react'


function Footer() {

    const mystyle = {
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "#1abc9c",
        fontSize: 10,
        textAlign: "center"
    };


    return (
        <div>
            <footer style={mystyle}>
                <h3>Ofir shlomo Project vacations</h3>
            </footer>
        </div >
    )
}

export default Footer;