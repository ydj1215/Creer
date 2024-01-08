import { useEffect, useState } from "react";

export const AuctionTime = ({ time }) => {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const auctionTime = new Date(time);
            const remaining = auctionTime - now;
            setRemainingTime(remaining > 0 ? remaining : 0);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const remainingSeconds = remainingTime / 1000;

    const barStyle = {
        width: '100%',
        height: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        overflow: 'hidden',
    };

    const fillStyle = {
        height: '100%',
        backgroundColor: '#7fc6a4',
        width: `${((remainingSeconds % 60) / 60) * 100}%`,
        transition: 'width 1s linear',
    };

    return (
        <>
            {remainingTime > 0 && (
                <div>
                    <p>
                        경매 종료 까지 남은 시간: {formatTime(Math.floor(remainingSeconds / 3600))}시간{' '}
                        {formatTime(Math.floor((remainingSeconds % 3600) / 60))}분{' '}
                        {formatTime(Math.floor(remainingSeconds % 60))}초
                    </p>
                    <div style={barStyle}>
                        <div style={fillStyle}></div>
                    </div>
                </div>
            )}


        </>
    );
};
