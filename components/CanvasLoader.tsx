import { Html, useProgress } from '@react-three/drei'
import React from 'react'

const CanvasLoader = () => {
	const {progress} = useProgress();
	
  return (
	<Html
		as='div'
		center
		style={
			{
				display: 'flex',
				justifyContent: 'center',
				alignItems:'center',
				flexDirection: 'column'
			}
		}>
		<span className='canvas-loader'>
			<p style={{fontSize:40, color: '#F1F1F1', marginTop:40}}>
				{ 'Loading...'}
			</p>
		</span>
	</Html>
  )
}

export default CanvasLoader