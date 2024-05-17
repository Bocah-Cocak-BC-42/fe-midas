
function Download(props) {
    const {link, name} = props;
  return (
    <>
      <div className="flex items-center gap-2">
      <label htmlFor={name} className="w-[150px]">
        {name}
      </label>
      <a id={name} target='_blank' className='bg-green-700 p-2 rounded-md text-white w-fit' href={link}>Download</a>
    </div>
    </>
  )
}

export default Download
