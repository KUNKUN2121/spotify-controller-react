import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import { ImagesContext } from "../../ImageContext";

const wapper = css`
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    position: relative;
    z-index: -1;
`;

const pixel = css`
    min-width: 30px;
    position: relative;
    z-index: 0;
    `;

    const blur = css`
        position: absolute;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    /* background: rgba(0, 0, 0, 0.5); */
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(90px);
    -webkit-backdrop-filter: blur(90.5px);
    display: flex;
    align-items: center;
    justify-content: center;`;

function GenBackImg({ color, img }) {
//   const data = useContext(ImagesContext);
  var position = [];
  //The set of colors that are going to be used in the background
  const colors = color;

  //Creating a 2d array with a specific size, the size implies the resolution of the background
  const SIZE = 6;
  for (var i = 0; i < SIZE; i++) {
    position[i] = [];
  }

  //Setting the colors to a random position in the array
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
        position[i][j] = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    {
  }
  return (
    <div className="BackGroundImg" style={{
        position: 'absolute',
        zIndex: "-100",
    }}>
      <div css={blur}>
      </div>
      <div css={wapper}>
        {position.map((row) => {
          return row.map((col) => {
            return (
              <div
                css={pixel}
                style={{ background: col }}
                key={uuidv4()}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default GenBackImg;