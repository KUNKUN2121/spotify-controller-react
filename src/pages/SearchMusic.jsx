/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react'
import MusicItem from './MusicItem';
import { SearchOutlined } from '@mui/icons-material';

const SearchMusic = ({url,roomId}) => {
    const inputChanged = (e) => {
        if(e.target.value !== "") setLoading(true);
        setSearchName(e.target.value);
      };
      const [loading, setLoading] = useState(false);
      const inputElement = useRef(null);
      const [searchName, setSearchName] = useState("");
      const [searchResultList, setSearchResultList] = useState([]);


      useEffect(() => {
        // setLoading(true);
        const timer = setTimeout(() => {
          if (searchName) {
            getSearchResult({
              roomId: roomId,
              q: searchName,
              setSearchResultList: setSearchResultList,
              url: url,
              setLoading: setLoading
            });
            setSearchResultList([]);
          }
        }, 500);
    
        return () => clearTimeout(timer);
      }, [searchName, roomId, url]);


      const getSearchResult = async ({ roomId, q, setSearchResultList, url, setLoading}) => {
        const getUrl = `${url}/api/search/`;
        const params = { room_id: roomId, q: q };
        const query = new URLSearchParams(params);
        console.log(`${getUrl}?${query}`);
        return await fetch(`${getUrl}?${query}`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            if (data.result) {
              setSearchResultList(data.result.tracks.items);
              console.log(data.result.tracks.items);
            } else {
              console.log("検索結果がありません");
            }
      
          });
      };
      
      // 読み込み時に検索にフォーカス
      useEffect(() => { inputElement.current.focus(); }, []);

      const wapper = css`
            display: flex;
            flex-direction: column; 
            /* flex-shrink: 0;  高さ固定 */
            /* flex: 1; */
            overflow-y: auto;
            overflow-x: hidden;
      `;

      const inputer = css`
            width: 100%;
            font-size: 16px;
      `;

      const resultWapper = css`
             display: flex;
            flex-direction: column; 
            /* flex-shrink: 0;  高さ固定 */
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
      `;

      const searchBox = css`
        display: flex;
        font-size: 16px;
        height: 32px;
        justify-content: center;
      `;

    return (
        <div css={wapper}>
            <div css={searchBox}>
                <input 
                        css={inputer}
                        type="text"
                        placeholder="キーワードを入力"
                        onChange={inputChanged}
                        value={searchName}
                        id="input"
                        ref={inputElement}
                />
                <SearchOutlined style={{fontSize: "32px", color: "white"}}/>
            </div>

            <div css={resultWapper}>
                {searchResultList.map((item) => (
                    <div>
                        <MusicItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchMusic