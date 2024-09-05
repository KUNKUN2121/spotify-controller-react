import React, { memo } from 'react'
import {Color, Palette} from "color-thief-react";
import GenBackImg from './GenBackImg';
// import '.back.jpeg';


const areEqual = (prevProps, nextProps) => {
    return prevProps.now.links['song-id'] === nextProps.now.links['song-id'];
}

const BackImg = memo(({now, setBackGroundColor, setIsLight}) => {
    var imgSrc = now['links']['album-art'];

    return (
        <Palette src={imgSrc} crossOrigin="anonymous" format="rgbString" colorCount={9}>
        {({ data, loading }) => {
          if (loading) return null;
          result = data;
          setBackGroundColor(data);
          setIsLight(isLight(data));
          return <GenBackImg color={data} img={imgSrc}/>
        // return null;
          return (
            <div>
              Palette:
              <ul>
                {data.map((color, index) => (
                  <li key={index} style={{ color: color }}>
                    <strong>{color}</strong>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Palette>
      );
}, areEqual);


export default BackImg

var result;
const isLight = (array) =>{
    let trueCount = 0;
    let falseCount = 0;
    array.map((data, index) => {
        const [r, g, b] = data.match(/\d+/g).map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000 >= 130;
        if (brightness) {
            trueCount++;
        } else {
            falseCount++;
        }
    });
    return trueCount > falseCount;
}

     //明度が高い画像の背景色はgray
    //明度が低い画像の背景色はwhite