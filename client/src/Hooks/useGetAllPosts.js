import {useEffect} from 'react'
import axios from "axios"
import {useDispatch} from 'react-redux'
import { setPosts } from '../redux/postSlice';

const useGetAllPost = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllPost = async()=>{
            try {
                const res = await axios.get('http://localhost:8000/api/v1/post/posts', {withCredentials:true})
                if(res.data.success){
                    dispatch(setPosts(res.data.posts))
                    // console.log(res.data);
                }
            } catch (error) {
                console.log(error)
            }
        } 
        
        fetchAllPost();

    }, []);
}

export default useGetAllPost;
