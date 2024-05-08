function LayoutAuth({ children }) {
  return (
    <div className="flex h-auto w-100% bg-[#FFD95A] items-center justify-center text-center">
        <div className="w-3/4 h-auto my-5 bg-white rounded-tl-lg rounded-br-lg">
            <div className="flex items-center flex-col m-5 ">
                <img srcSet="/Logo-Midas.png" className="w-1/6"></img>
            </div>
            <div className="mb-5 mx-10 text-left">
                {children}
            </div>
        </div>
    </div>
  )
}

export default LayoutAuth