import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
const screenWidth=window.innerWidth;

function Slider() {
    const [movieList, setMovieList] = useState([]);
    const [cachedMovieList, setCachedMovieList] = useState([]);
    const elementRef = useRef();

    useEffect(() => {
        getTrendingMovies();
    }, [])

    const getTrendingMovies = () => {
        if (cachedMovieList.length > 0) {
            setMovieList(cachedMovieList);
        } else {
            GlobalApi.getTrendingVideos.then(resp => {
                console.log(resp.data.results);
                setMovieList(resp.data.results);
                setCachedMovieList(resp.data.results);
            }).catch(error => {
                console.error("Error fetching data:", error);
                setMovieList(cachedMovieList);
            });
        }
    }

    const sliderRight=(element)=>{
        element.scrollLeft+=screenWidth-110
    }
    const sliderLeft=(element)=>{
        element.scrollLeft-=screenWidth-110
    }

    return (
        <div>
            <HiChevronLeft className="hidden md:block text-white text-[30px] absolute
            mx-8 mt-[150px] cursor-pointer " 
            onClick={()=>sliderLeft(elementRef.current)}/>
            <HiChevronRight className='hidden md:block text-white text-[30px] absolute
            mx-8 mt-[150px] cursor-pointer right-0' 
            onClick={()=>sliderRight(elementRef.current)}/>

       
            <div className='flex overflow-x-auto w-full px-16 py-4 gap-2 scrollbar-none scroll-smooth' ref={elementRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}> 
                {movieList.map((item, index)=>(
                    <img key={index} src={IMAGE_BASE_URL+item.backdrop_path} 
                    className='min-w-full  md:h-[310px] object-cover
                    object-left-top mr-5 rounded-md hover:border-[4px]
                    border-gray-400 transition-all duration-100 ease-in'
                    alt={`Movie ${index + 1}`}/>
                ))}
            </div>
        </div>
    )
}

export default Slider