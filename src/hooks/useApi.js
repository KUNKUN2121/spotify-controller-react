import { useEffect, useState, useRef } from "react";
import useSWR from 'swr';

export const useApi = (url, roomId, noticeSnackbar, setOpen) => {
  const [progress_ms, setProgress_ms] = useState(0);
  const progressRef = useRef(progress_ms);


  // SWR関数
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    roomId ? `${url}/api/now?room_id=${roomId}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  // 遅延時間計算
  const getDelay = (data) => {
    const getSpotifyTime = new Date(data.get_spotify_timestamp);
    const currentDate = new Date();
    return currentDate.getTime() - getSpotifyTime.getTime();
  };

  // Progressを入れる
  useEffect(() => {
    if (data && data.progress_ms !== undefined && data.is_playing) {
      setProgress_ms(data.progress_ms + getDelay(data));
    }
  }, [data]);

  // progressRef
  useEffect(() => {
    progressRef.current = progress_ms;
  }, [progress_ms]);

  // Progress更新
  useEffect(() => {
    const interval = setInterval(() => {
      if (data && data.progress_ms !== undefined && data.is_playing) {
        setProgress_ms((prevProgress) => {
          const updatedProgress = prevProgress + 500;
          if (updatedProgress >= data.duration_ms) {
            return data.duration_ms;
          }else{
            // mutate(); // SWRの更新
          }
          return updatedProgress;
        });
      } else {
      }
    }, 500);

    return () => clearInterval(interval);
  }, [data]);

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
        .then(data => data.token);

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
            const data = await response.json();
            noticeSnackbar("success", "追加しました。", 3000);
            setOpen(true);
        } catch (error) {
            noticeSnackbar("error", "エラー : 追加できませんでした。", 3000);
        }
    };


  return { data, error, isLoading, progress_ms, fetchSkip, addMusic};
};
