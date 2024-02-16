import { useRoutes } from "react-router-dom"
import routes from "./router"
import { useState } from "react";

export default function App() {
    return (
        <>
            {useRoutes(routes)}
        </>
    )


}
