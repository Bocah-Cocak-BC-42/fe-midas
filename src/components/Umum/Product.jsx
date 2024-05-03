import Button from "../Button"
function Product() {
  return (
    <div className="flex justify-between" id="tagline">
        <div className="flex flex-col gap-4 justify-center items-center p-5 ml-[400px]">
            <h3 className="text-3xl">
                Product
            </h3>
            <table>
                <tbody>
                    <tr>
                        <td>
                        <img srcSet="/bagcash.png" width={100} height={100} />
                        </td>
                        <td className="text-xl">
                            Pinjaman Perseorangan
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <img srcSet="/bagcash.png" width={100} height={100} />
                        </td>
                        <td className="text-xl">
                            Pinjaman Badan Usaha
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="text-center">
            <img srcSet="/Pict_3.jpg" width={700} height={350} />
        </div>
    </div>
  )
}

export default Product
