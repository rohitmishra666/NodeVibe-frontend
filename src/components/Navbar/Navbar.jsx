import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

function Navbar() {

    const heightWidth = {
        height: "40px",
        width: "40px",
    }

    return (
        <div className="flex flex-col">
            <button className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white">
                <lord-icon
                    src="https://cdn.lordicon.com/cnpvyndp.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={heightWidth}>
                </lord-icon>
            </button>
            <button className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white">
                <lord-icon
                    src="https://cdn.lordicon.com/xyboiuok.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={heightWidth}>
                </lord-icon>
            </button>
            <button className="flex items-center justify-center w-16 h-16  text-white">
                <lord-icon
                    src="https://cdn.lordicon.com/vuiggmtc.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={heightWidth}>
                </lord-icon>
            </button>
            <button className="flex items-center justify-center w-16 h-16  text-white">
                <lord-icon
                    src="https://cdn.lordicon.com/tdxypxgp.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={heightWidth}>
                </lord-icon>
            </button>



        </div>
    )
}


export default Navbar