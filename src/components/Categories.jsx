import React from 'react'

function Categories(props) {
    const{categories,setCurrCategory}=props;
  return (
    <div>
      {categories ==null? "" :
                <div className='flex justify-center item-center'>
                    <button 
                    className='border-1 rounded-lg mx-3 px-1 my-2 '
                    onClick={()=>{
                        setCurrCategory("All categories")
                    }}>All Categories</button>
                    {categories.map((category)=>{
                        return <div>
                            <button className='border-1 rounded-lg mx-3 px-1 my-1'
                            onClick={()=>{
                                setCurrCategory(category)
                            }}
                            >{category}</button>
                        </div>

                    })}
                </div>
            }
    </div>
  )
}

export default Categories