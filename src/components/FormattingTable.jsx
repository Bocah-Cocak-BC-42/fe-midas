import React from 'react';

function FormattingTable(props) {
	const{
		data,
		messageErrorEmptyData
	} = props;

  return (
		<table className='w-full'>
			<tbody id="tableformat">
				{data.length == 0 ? (
					<tr className='bg-[#F3F3F3]'>
						<td colSpan={Object.keys(data[0]).length} className='text-center'>
							{messageErrorEmptyData}
						</td>
					</tr>
				) : (
          data.map((row, index) => (
            <tr key={index} className='bg-[#F3F3F3]'>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className='text-left'>
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default FormattingTable

