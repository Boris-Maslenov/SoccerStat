import React from "react";
import Error from "../error/Error";

const Page404 = () => {

return (

    <>
            <Error text={'Error 404 - Page not found'} />
            <a className="go-home" href="/">go to home</a>
    </>
)

}

export default Page404;