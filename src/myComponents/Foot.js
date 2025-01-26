import React from "react"
import './foot.css'


export default function Foot() {
    return (
        <nav className="navbar fixed-bottom position-sticky-bottom bg-body-tertiary pt-4 margin" data-bs-theme="dark">
            <div className="container-fluid justify-content-center flex-column">
                <p className="lead mx-3 text-white">
                    <em>" Rome was not built in a day. You need Good Habits to build an empire."</em>
                </p>
                <p className="text-white">Copyright ©<em>Heinabi</em>. All rights reserved.</p>
            </div>
        </nav>
    )
}