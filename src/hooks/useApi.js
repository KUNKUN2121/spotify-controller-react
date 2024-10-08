import { useEffect, useState, useRef } from "react";
import useSWR from 'swr';

export const useApi = (url, roomId, noticeSnackbar, setOpen) => {
    const [progress_ms, setProgress_ms] = useState(0);
    const progressRef = useRef(progress_ms);
    const [delaySetting, setDelaySetting] = useState(0);
    const [syncTimeSetting, setSyncTimeSetting] = useState(2500);


    // localStorageから設定を取得し、stateを更新
    useEffect(() => {
        const handleStorageChange = () => {
            const delay = localStorage.getItem('delay');
            const syncTime = localStorage.getItem('syncTime');
            console.log("handle" + delay);
            if (delay) {
                setDelaySetting(Math.trunc((delay)));
            }
            if (syncTime) {
                switch (syncTime) {
                    case 'normal':
                        setSyncTimeSetting(2500);
                        break;
                    case 'low':
                        setSyncTimeSetting(5000);
                        break;
                    case 'high':
                        setSyncTimeSetting(1000);
                        break;
                    default:
                        setSyncTimeSetting(2500); // デフォルト値
                }
            }
        };

        console.log("設定情報を読み込みました。" + delaySetting);

        handleStorageChange(); // 初期読み込み
        window.addEventListener("storage", handleStorageChange);

        // クリーンアップ
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    
const fetcher = async (...args) => {
    const startTime = performance.now(); // 開始時間を記録
    const res = await fetch(...args);
    
    if (!res.ok) {
        const error = new Error('ERROR');
        error.status = res.status;  // ステータスコードをエラーに格納
        throw error;  // エラーを投げる
    }
    
    const endTime = performance.now(); // 終了時間を記録
    const delayTime = endTime - startTime; // 遅延時間の計算
    // console.log(`遅延時間: ${delayTime}ms`);

    return {
        data: await res.json(),
        delayTime, // `遅延時間`を返す
    };
};


  const { data, error, isLoading, mutate } = useSWR(
    roomId ? `${url}/api/now?room_id=${roomId}` : null,
    fetcher,
    { refreshInterval: syncTimeSetting }
  );

  var now;
  var delayTime;
  if (data) {
    now = data.data;  // データ
    delayTime = data.delayTime;  // 遅延時間
  }

  // 遅延時間計算
  const getDelay = (now) => {
    if(delaySetting === 0){
        // 端末時間からの計算
        const getSpotifyTime = new Date(now.get_spotify_timestamp);
        const currentDate = new Date();
        console.log(currentDate.getTime() - getSpotifyTime.getTime());
        console.log("here1 ")
        return currentDate.getTime() - getSpotifyTime.getTime();
       
    }
    if(delaySetting === 1){
        // アクセス時間からの計算
        return delayTime;
        
    }
    if(delaySetting === 2){
        // 遅延計算なし
        console.log("2 : " + 0);
        return 0;
    }

  };

  // Progressを入れる
  useEffect(() => {
    if (now && now.progress_ms !== undefined && now.is_playing) {
      setProgress_ms(now.progress_ms + getDelay(now));
    //   setProgress_ms(now.progress_ms);
    }
  }, [now]);

  // progressRef
  useEffect(() => {
    progressRef.current = progress_ms;
  }, [progress_ms]);

  // Progress更新
  useEffect(() => {
    const interval = setInterval(() => {
      if (now && now.progress_ms !== undefined && now.is_playing) {
        setProgress_ms((prevProgress) => {
          const updatedProgress = prevProgress + 500;
          if (updatedProgress >= now.duration_ms) {
            return now.duration_ms;
          }else{
            // mutate(); // SWRの更新
          }
          return updatedProgress;
        });
      } else {
      }
    }, 500);

    return () => clearInterval(interval);
  }, [now]);

  // スキップ処理
  const fetchSkip = async (value) => {
    const response = await fetch(`${url}/api/${value}?room_id=${roomId}`);
    if (value === "next") {
      noticeSnackbar("success", "スキップしました。", 3000);
    } else if (value === "previous") {
      noticeSnackbar("success", "前の曲に戻りました。", 3000);
    }
    mutate(); // SWRの更新
    return true;
  };

      // AddMusic関数
    const addMusic = async (track) => {
        const csrf = await fetch(`${url}/api/csrf-token`, {
            credentials: 'include', // セッション情報をいれる
        })
        .then(response => response.json())
        .then(now => now.token);

        const posturl = `${url}/api/add`;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
            },
            credentials: 'include', // セッション情報をいれる
            body: JSON.stringify({
                room_id: roomId,
                uri: track.uri,
            })
        };

        try {
            const response = await fetch(posturl, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const now = await response.json();
            noticeSnackbar("success", "追加しました。", 3000);
            setOpen(true);
        } catch (error) {
            noticeSnackbar("error", "エラー : 追加できませんでした。", 3000);
        }
    };


  return { data, error, isLoading, progress_ms, fetchSkip, addMusic};
};
