import axios from 'axios';
import {useState, useEffect, useRef} from 'react'
function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState(1);
  const itemRef= useRef(null);

  const loadPicture= ()=>{
    setLoading(true);
      axios.get(
      `https://jsonplaceholder.typicode.com/photos?_page=${item}&_limit=1`
    )
    .then(
      response=>{
        const newArr = data.concat(response.data);
        setData(newArr);
        setItem(item=>item+1);
        setLoading(false);

      }
    )
  }


const onIntersect = ([entry],observer)=>{
  if(entry.isIntersecting&&!loading){
    observer.unobserve(entry.target);
    loadPicture();
    observer.observe(itemRef.current);
  }
};

  useEffect(()=>{
    if(!loading){
      const observer = new IntersectionObserver(onIntersect, {threshold:1, rootMargin:'0px 0px 50% 0px'});
      if(itemRef.current)
      observer.observe(itemRef.current);
      return()=> observer&&observer.disconnect();
    }
  },[loading])
  
  return (
    <div className="App">
  
      {data.map((item)=>{
    return <div key={item.id}><img src={item.url} width="500px"/></div>
  })}
      <div ref={itemRef}>{loading&&'Loading'}</div>
    </div>
  );
}

export default App;
