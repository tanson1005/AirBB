import React, { useEffect } from 'react';
import { IComment } from '../../constant/constant';
import { checkIfImageExists } from '../Detail/commentComponent';
import './cardslider.scss';

interface IProps { 
    comment: IComment[];
    sliceMax: number;
    limit: boolean;
}

export function CardSlider({ comment, sliceMax, limit }: IProps) { 
    useEffect(() => {
        const items = document.querySelectorAll('.calslider .calitem') as NodeListOf<HTMLElement>;
        const next = document.getElementById('next');
        const prev = document.getElementById('prev');
        let active = 0;

        function loadShow() {
            let stt = 0;
            if (items?.[active]) {
                items[active].style.transform = `none`;
                items[active].style.zIndex = '1';
                items[active].style.filter = 'none';
                items[active].style.opacity = '1';
            }
            for (let i = active + 1; i < items.length; i++) {
                stt++;
                if (items?.[i]) {
                    items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
                    items[i].style.zIndex = `-${stt}`;
                    items[i].style.filter = 'blur(5px)';
                    items[i].style.opacity = stt > 2 ? '0' : '0.6';
                }
            }
            stt = 0;
            for (let i = active - 1; i >= 0; i--) {
                stt++;
                if (items?.[i]) {
                    items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
                    items[i].style.zIndex = `-${stt}`;
                    items[i].style.filter = 'blur(5px)';
                    items[i].style.opacity = stt > 2 ? '0' : '0.6';
                }
            }
        }

        try {
            loadShow();
            next?.addEventListener('click', () => {
                active = active + 1 < items.length ? active + 1 : active;
                loadShow();
            });
            prev?.addEventListener('click', () => {
                active = active - 1 >= 0 ? active - 1 : active;
                loadShow();
            });
        } catch (error) {
            console.log(error);
        }

        return () => {
            next?.removeEventListener('click', () => {});
            prev?.removeEventListener('click', () => {});
        };
    }, []);

    return (
        <div className="calslider">
            {comment?.slice(0, sliceMax).map((currentComment: IComment, index: number) => (
                <div className="calitem" key={index}>
                    <div className="calSection">
                        <p>{limit ? `${currentComment?.noiDung?.slice(0, 300)}${currentComment?.noiDung?.length > 50 ? "..." : ""}` : currentComment?.noiDung}</p>
                        <div className="cal-item-ava">
                            <img src={checkIfImageExists(currentComment?.avatar)} alt="" />
                            <div>
                                <h3>{currentComment?.tenNguoiBinhLuan}</h3>
                                <p>{currentComment?.ngayBinhLuan}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {comment?.length > 1 && (
                <div>
                    <button id="next">{`>`}</button>
                    <button id="prev">{`<`}</button>
                </div>
            )}
        </div>
    );
}
