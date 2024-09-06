import React, { useEffect, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CircularProgress } from '@mui/material';
import MusicItem from './MusicItem';

const History = ({url, roomId}) => {
    const [history, setHistory] = useState();

    const fetchData = async () => {
        console.log("fetching_history");
        const response = await fetch(url + "/api/history?room_id=" + roomId);
        const data = await response.json();
        setHistory(data);
    }

    useEffect(() => {
      fetchData();
    }, []);


    const wapper = css`
        display: flex;
        flex-direction: column; 
        /* flex-shrink: 0;  高さ固定 */
        /* flex: 1; */
        overflow-y: auto;
        overflow-x: hidden;
    `;
    const resultWapper = css`
          display: flex;
         flex-direction: column; 
         /* flex-shrink: 0;  高さ固定 */
         flex: 1;
         overflow-y: auto;
         overflow-x: hidden;
   `;
       const formatDate = (isoDateString) => {
        // ISO 8601形式の日付をJavaScriptのDateオブジェクトに変換
        const date = new Date(isoDateString);
    
        // 日本時間に変換（UTC +9時間）
        const jstDate = new Date(date.getTime());
    
        // 日付と時刻のフォーマットを作成
        const formattedDate = `${String(jstDate.getMonth() + 1).padStart(2, '0')}/${String(jstDate.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(jstDate.getHours()).padStart(2, '0')}:${String(jstDate.getMinutes()).padStart(2, '0')}`;
    
        // 現在時刻と比較して経過時間を計算
        const now = new Date();
        const elapsedMilliseconds = now - date;
        const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const remainingMinutes = elapsedMinutes % 60;
    
        let elapsedTimeString;
        if (elapsedMinutes < 60) {
            elapsedTimeString = `${elapsedMinutes}分前`;
        } else if (elapsedMinutes < 1440) { // 24 * 60 = 1440 分
            elapsedTimeString = `${elapsedHours}時間${remainingMinutes}分前`;
        } else {
            elapsedTimeString = '';
        }
    
        return `${formattedDate} ${formattedTime} (${elapsedTimeString})`;
        };
        

  return (
    <div css={wapper}>
         <div css={resultWapper}>
            {history ? 
                    history.items.map((item, i) => {
                        // return <p>item={item.track.name}</p>
                        return <div>
                            <p style={{color: '#eee'}}>{formatDate(item.played_at)}</p>
                            <MusicItem key={i} item={item.track} />
                        </div>
                    }) 
                :  
                    <div className="load">
                        <CircularProgress size="3rem"/>
                    </div>
                    // <Skeleton variant="rectangular" width="100%" height={60} className="album-art-skeleton" />
                }
        </div>
    </div>
  )
}

export default History