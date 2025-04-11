import Feed from "./Feed/Feed.jsx";
import RightSidebar from "./RightSidebar/RightSidebar.jsx";

function Home(){
    return(
        <>
            <div className='homecontainer'style={{display:'flex'}}>
                <Feed/>
                <RightSidebar/>
            </div>
        </>
    );
}
export default Home;