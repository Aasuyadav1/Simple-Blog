import React from 'react'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Category() {
    const theme = createTheme({
        palette: {
          ochre: {
            main: 'white',
            light: 'white',
            dark: 'white',
            contrastText: '#242105',
          },
        },
      });

      const Category = [
        {
            text:'Travles',
            imageUrl:'https://static.wixstatic.com/media/5bfb6f_9f2519d5fc2d41f990a10dd92eb8658d.jpg/v1/fill/w_432,h_358,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5bfb6f_9f2519d5fc2d41f990a10dd92eb8658d.jpg',
            path:'travles'
        },
        {
            text:'Eat',
            imageUrl:'https://static.wixstatic.com/media/5bfb6f_ea37f67cad544b348df9f3d0ff40f282.jpg/v1/fill/w_432,h_358,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5bfb6f_ea37f67cad544b348df9f3d0ff40f282.jpg',
            path:'Eat'
        },
        {
            text:'Relax',
            imageUrl:'https://static.wixstatic.com/media/5bfb6f_c667d0c9bd634b1aa2b29311795f3c51.jpg/v1/fill/w_560,h_464,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5bfb6f_c667d0c9bd634b1aa2b29311795f3c51.jpg',
            path:'Relax'
        },
      ]
      
  return (
    <div className='mt-10'>
        <p className='text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
        <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel accusamus laboriosam officiis nihil eveniet temporibus!</p>
        <div className='flex justify-center items-center w-full mt-10 gap-8'>
            {
                Category.map((cur,ind)=>
                <div key={ind} className={`h-[250px] aspect-[1.3/1] object-cover bg-no-repeat bg-center grayscale-[30%] cursor-pointer hover:grayscale-0 duration-700 transition-all ease-in-out flex justify-center items-center`}
                style={{ backgroundImage: `url(${cur.imageUrl})` }}>
                <ThemeProvider theme={theme}>
                <Button variant="contained" color='ochre' size='large'>{cur.text}</Button>
                </ThemeProvider>
                </div>
                )
            }
        </div>
    </div>
  )
}

export default Category