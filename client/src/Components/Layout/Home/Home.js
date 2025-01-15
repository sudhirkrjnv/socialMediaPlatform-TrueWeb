import Feed from "./Feed/Feed";
import RightSidebar from "./RightSidebar/RightSidebar";

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