import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
function MainLayout(){
    return(
        <>
        <div style={{display:'flex', backgroundColor:'#F2F4F7', height:'100vh'}}>
            <Sidebar/>
            <div style={{marginLeft:'1em'}}>
                <Outlet/>
            </div>
        </div>
        </>
    );
}
export default MainLayout;